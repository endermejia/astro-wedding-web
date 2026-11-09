import fs from 'fs';
import zlib from 'zlib';

function createPng(width, height, rgbaBuffer) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const crcTable = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    crcTable[n] = c;
  }
  function crc32(buf) {
    let c = 0xffffffff;
    for (let i = 0; i < buf.length; i++) {
      c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
    }
    return (c ^ 0xffffffff) >>> 0;
  }

  function makeChunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type, 'ascii');
    const crcBuf = Buffer.alloc(4);
    const combined = Buffer.concat([typeBuf, data]);
    const crc = crc32(combined);
    crcBuf.writeUInt32BE(crc, 0);
    return Buffer.concat([len, combined, crcBuf]);
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const rawScanlines = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y++) {
    rawScanlines[y * (width * 4 + 1)] = 0;
    rgbaBuffer.copy(rawScanlines, y * (width * 4 + 1) + 1, y * width * 4, (y + 1) * width * 4);
  }

  const compressed = zlib.deflateSync(rawScanlines, { level: 9 });
  return Buffer.concat([
    signature,
    makeChunk('IHDR', ihdr),
    makeChunk('IDAT', compressed),
    makeChunk('IEND', Buffer.alloc(0))
  ]);
}

function mulberry32(a) {
  return function() {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

class PeriodicNoise {
  constructor(period, seed = 42) {
    this.period = period;
    const prng = mulberry32(seed);
    this.perm = new Float32Array(period * period * 2);
    for (let i = 0; i < period * period; i++) {
      const angle = prng() * Math.PI * 2;
      this.perm[i * 2] = Math.cos(angle);
      this.perm[i * 2 + 1] = Math.sin(angle);
    }
  }

  getGradient(gx, gy) {
    gx = ((gx % this.period) + this.period) % this.period;
    gy = ((gy % this.period) + this.period) % this.period;
    const idx = (gy * this.period + gx) * 2;
    return [this.perm[idx], this.perm[idx + 1]];
  }

  sample(x, y) {
    const x0 = Math.floor(x);
    const y0 = Math.floor(y);
    const x1 = x0 + 1;
    const y1 = y0 + 1;

    const dx = x - x0;
    const dy = y - y0;

    // Quintic smoothstep for smooth, non-polygonal transitions
    const sx = dx * dx * dx * (dx * (dx * 6 - 15) + 10);
    const sy = dy * dy * dy * (dy * (dy * 6 - 15) + 10);

    const g00 = this.getGradient(x0, y0);
    const g10 = this.getGradient(x1, y0);
    const g01 = this.getGradient(x0, y1);
    const g11 = this.getGradient(x1, y1);

    const dot00 = g00[0] * dx + g00[1] * dy;
    const dot10 = g10[0] * (dx - 1) + g10[1] * dy;
    const dot01 = g01[0] * dx + g01[1] * (dy - 1);
    const dot11 = g11[0] * (dx - 1) + g11[1] * (dy - 1);

    const nx0 = dot00 + sx * (dot10 - dot00);
    const nx1 = dot01 + sx * (dot11 - dot01);

    return nx0 + sy * (nx1 - nx0);
  }
}

const SIZE = 512;

// Layers for Cold-Pressed Cotton Watercolor Paper:
// Balanced to create the pillowy tooth and subtle pulp texture of fine art paper
const layers = [
  { p: new PeriodicNoise(4, 101), scale: 4, weight: 0.35 },    // soft organic pulp wash
  { p: new PeriodicNoise(8, 202), scale: 8, weight: 0.32 },    // paper fiber clouds
  { p: new PeriodicNoise(16, 303), scale: 16, weight: 0.36 },  // cold-press tooth depressions
  { p: new PeriodicNoise(32, 404), scale: 32, weight: 0.28 },  // medium grain bumps
  { p: new PeriodicNoise(64, 505), scale: 64, weight: 0.18 },  // fine grain tooth
  { p: new PeriodicNoise(128, 606), scale: 128, weight: 0.08 },// delicate surface roughness
];

const heightMap = new Float32Array(SIZE * SIZE);
let minH = Infinity;
let maxH = -Infinity;

for (let y = 0; y < SIZE; y++) {
  for (let x = 0; x < SIZE; x++) {
    let h = 0;
    for (const l of layers) {
      const u = (x / SIZE) * l.scale;
      const v = (y / SIZE) * l.scale;
      h += l.p.sample(u, v) * l.weight;
    }
    heightMap[y * SIZE + x] = h;
    if (h < minH) minH = h;
    if (h > maxH) maxH = h;
  }
}

// Subtle organic cotton fibers embedded in the sheet
const fiberRng = mulberry32(20270313);
const numFibers = 80;
for (let i = 0; i < numFibers; i++) {
  const cx = fiberRng() * SIZE;
  const cy = fiberRng() * SIZE;
  const len = 8 + fiberRng() * 14;
  const angle = fiberRng() * Math.PI * 2;
  const curve = (fiberRng() - 0.5) * 0.3;
  const depth = 0.05 + fiberRng() * 0.05;

  for (let s = 0; s < len; s++) {
    const t = s / len;
    const curAngle = angle + curve * s;
    const fx = Math.round((cx + Math.cos(curAngle) * s + SIZE * 2) % SIZE);
    const fy = Math.round((cy + Math.sin(curAngle) * s + SIZE * 2) % SIZE);
    const idx = fy * SIZE + fx;
    heightMap[idx] += (i % 2 === 0 ? depth : -depth) * (1 - Math.abs(t - 0.5) * 2);
  }
}

// Light coming from top-left (azimuth ~ 135 deg, elevation ~ 54 deg)
const lightAngle = (135 * Math.PI) / 180;
const elevAngle = (54 * Math.PI) / 180;
const lx = Math.cos(lightAngle) * Math.cos(elevAngle);
const ly = Math.sin(lightAngle) * Math.cos(elevAngle);
const lz = Math.sin(elevAngle);

const opaqueBuf = Buffer.alloc(SIZE * SIZE * 4);
const overlayBuf = Buffer.alloc(SIZE * SIZE * 4);

// Bump scale for natural, visible watercolor tooth (baked into single layer)
const bumpScale = 10.5;

for (let y = 0; y < SIZE; y++) {
  const yPrev = (y - 1 + SIZE) % SIZE;
  const yNext = (y + 1) % SIZE;

  for (let x = 0; x < SIZE; x++) {
    const xPrev = (x - 1 + SIZE) % SIZE;
    const xNext = (x + 1) % SIZE;

    const idx = y * SIZE + x;
    const h = heightMap[idx];

    // Gradients
    const dhdx = (heightMap[y * SIZE + xNext] - heightMap[y * SIZE + xPrev]) * 0.5;
    const dhdy = (heightMap[yNext * SIZE + x] - heightMap[yPrev * SIZE + x]) * 0.5;

    // Normal vector
    let nx = -dhdx * bumpScale;
    let ny = -dhdy * bumpScale;
    let nz = 1.0;
    const norm = Math.sqrt(nx * nx + ny * ny + nz * nz);
    nx /= norm;
    ny /= norm;
    nz /= norm;

    // Diffuse lighting
    const dot = nx * lx + ny * ly + nz * lz;
    const ambient = 0.70;
    const diffuse = Math.max(0, dot);
    const lit = ambient + (1 - ambient) * diffuse;

    // Neutral baseline lighting
    const neutral = ambient + (1 - ambient) * lz;
    const lightDelta = lit - neutral;

    // Soft paper density variation (cotton pulp)
    const pulpVariation = (h / (maxH - minH)) * 0.048;

    const paperEffect = lightDelta * 1.45 + pulpVariation;

    // Base ivory: #FCF8F0 -> R: 252, G: 248, B: 240
    let r, g, b;
    if (paperEffect >= 0) {
      // Highlights on paper ridges (soft warm ivory)
      const factor = Math.min(1.0, paperEffect * 1.3);
      r = Math.round(252 + factor * 3);  // up to 255
      g = Math.round(248 + factor * 5);  // up to 253
      b = Math.round(240 + factor * 7);  // up to 247
    } else {
      // Depressions in paper tooth (warm sand/linen shadows, matching the original 0.35 grain overlay baked in)
      const s = Math.min(1.0, -paperEffect * 1.35);
      r = Math.round(252 - s * 25); // down to ~227
      g = Math.round(248 - s * 27); // down to ~221
      b = Math.round(240 - s * 32); // down to ~208
    }

    r = Math.min(255, Math.max(222, r));
    g = Math.min(255, Math.max(215, g));
    b = Math.min(255, Math.max(202, b));

    const pIdx = idx * 4;
    opaqueBuf[pIdx] = r;
    opaqueBuf[pIdx + 1] = g;
    opaqueBuf[pIdx + 2] = b;
    opaqueBuf[pIdx + 3] = 255;

    // Transparent overlay tile
    if (paperEffect > 0.015) {
      const alpha = Math.min(255, Math.round(Math.min(1.0, paperEffect * 2.5) * 105));
      overlayBuf[pIdx] = 255;
      overlayBuf[pIdx + 1] = 254;
      overlayBuf[pIdx + 2] = 250;
      overlayBuf[pIdx + 3] = alpha;
    } else if (paperEffect < -0.015) {
      const alpha = Math.min(255, Math.round(Math.min(1.0, -paperEffect * 2.2) * 95));
      overlayBuf[pIdx] = 65;
      overlayBuf[pIdx + 1] = 58;
      overlayBuf[pIdx + 2] = 38;
      overlayBuf[pIdx + 3] = alpha;
    } else {
      overlayBuf[pIdx] = 0;
      overlayBuf[pIdx + 1] = 0;
      overlayBuf[pIdx + 2] = 0;
      overlayBuf[pIdx + 3] = 0;
    }
  }
}

fs.mkdirSync('public/images/textures', { recursive: true });

const opaquePng = createPng(SIZE, SIZE, opaqueBuf);
fs.writeFileSync('public/images/textures/watercolor-paper.png', opaquePng);
console.log('Regenerated public/images/textures/watercolor-paper.png (size:', opaquePng.length, 'bytes)');

const overlayPng = createPng(SIZE, SIZE, overlayBuf);
fs.writeFileSync('public/images/textures/paper-grain-overlay.png', overlayPng);
console.log('Regenerated public/images/textures/paper-grain-overlay.png (size:', overlayPng.length, 'bytes)');
