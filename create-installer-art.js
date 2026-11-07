const fs = require('fs');
const path = require('path');

const RES_DIR = path.join(__dirname, 'build-resources');
if (!fs.existsSync(RES_DIR)) fs.mkdirSync(RES_DIR, { recursive: true });

function create24BitBMP(width, height, pixelFn) {
  const rowSize = Math.floor((24 * width + 31) / 32) * 4;
  const pixelArraySize = rowSize * height;
  const fileSize = 54 + pixelArraySize;

  const buf = Buffer.alloc(fileSize);

  // File Header (14 bytes)
  buf.write('BM', 0);
  buf.writeInt32LE(fileSize, 2);
  buf.writeInt32LE(0, 6); // Reserved
  buf.writeInt32LE(54, 10); // Offset

  // Info Header (40 bytes)
  buf.writeInt32LE(40, 14); // Header size
  buf.writeInt32LE(width, 18);
  buf.writeInt32LE(height, 22); // Positive = bottom-up
  buf.writeInt16LE(1, 26); // Planes
  buf.writeInt16LE(24, 28); // 24 bpp
  buf.writeInt32LE(0, 30); // Compression (none)
  buf.writeInt32LE(pixelArraySize, 34);
  buf.writeInt32LE(2835, 38); // 72 DPI
  buf.writeInt32LE(2835, 42);
  buf.writeInt32LE(0, 46);
  buf.writeInt32LE(0, 50);

  // Pixel data (bottom-up: row 0 is bottom, row height-1 is top)
  for (let y = 0; y < height; y++) {
    // Invert y for user-friendly top-to-bottom pixelFn
    const actualY = height - 1 - y;
    const rowOffset = 54 + y * rowSize;
    for (let x = 0; x < width; x++) {
      const { r, g, b } = pixelFn(x, actualY, width, height);
      const pixelOffset = rowOffset + x * 3;
      buf[pixelOffset] = b;     // Blue
      buf[pixelOffset + 1] = g; // Green
      buf[pixelOffset + 2] = r; // Red
    }
  }

  return buf;
}

// 1. Sidebar (164 x 314 px) - Modern Navy/Teal Gradient with Accent Lines and Geometric Shapes
function generateSidebar(isUninstall = false) {
  const width = 164;
  const height = 314;

  const bmp = create24BitBMP(width, height, (x, y) => {
    // Normalized coordinates (0 to 1)
    const ny = y / height;
    const nx = x / width;

    // Base vertical gradient: Deep Navy/Slate (#0F172A) to Rich Dark Teal (#042F2E)
    let r = Math.round(15 * (1 - ny) + 4 * ny);
    let g = Math.round(23 * (1 - ny) + 47 * ny);
    let b = Math.round(42 * (1 - ny) + 46 * ny);

    if (isUninstall) {
      // Uninstaller theme: Deep Slate to Subtle Wine (#1E1B2E)
      r = Math.round(20 * (1 - ny) + 35 * ny);
      g = Math.round(24 * (1 - ny) + 20 * ny);
      b = Math.round(38 * (1 - ny) + 45 * ny);
    }

    // Top diagonal wave / banner accent
    const wave = Math.sin((x / 30) + (y / 50)) * 6;
    if (y < 90 + wave && y > 82 + wave) {
      // Accent glowing line
      r = Math.round(r * 0.4 + 13 * 0.6);
      g = Math.round(g * 0.4 + 148 * 0.6);
      b = Math.round(b * 0.4 + 136 * 0.6);
    }

    // Modern card icon area in top center (x: 42 to 122, y: 24 to 74)
    const cx = width / 2;
    const cy = 48;
    const dx = x - cx;
    const dy = y - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Subtle radial glow around logo
    if (dist < 42) {
      const glow = (1 - dist / 42) * 0.45;
      r = Math.min(255, Math.round(r + (isUninstall ? 220 : 13) * glow));
      g = Math.min(255, Math.round(g + (isUninstall ? 80 : 148) * glow));
      b = Math.min(255, Math.round(b + (isUninstall ? 100 : 136) * glow));
    }

    // Logo Icon Box (32 x 38 px rounded rectangle)
    if (Math.abs(dx) <= 18 && Math.abs(dy) <= 22) {
      // Inside icon badge
      if (Math.abs(dx) <= 16 && Math.abs(dy) <= 20) {
        // Red/Crimson PDF icon background
        r = 225;
        g = 29;
        b = 72;

        // Inner white document fold
        if (dx > 4 && dy < -8) {
          r = 254; g = 205; b = 211;
        }

        // Three document lines
        if (Math.abs(dy - 3) <= 1 && Math.abs(dx) <= 10) {
          r = 255; g = 255; b = 255;
        }
        if (Math.abs(dy + 3) <= 1 && Math.abs(dx) <= 10) {
          r = 255; g = 255; b = 255;
        }
        if (Math.abs(dy + 9) <= 1 && Math.abs(dx) <= 6) {
          r = 255; g = 255; b = 255;
        }
      } else {
        // Icon border
        r = 255; g = 255; b = 255;
      }
    }

    // Bottom subtle technical grid dots
    if (y > 220 && (x % 12 === 0) && (y % 12 === 0)) {
      r = Math.min(255, r + 45);
      g = Math.min(255, g + 65);
      b = Math.min(255, b + 65);
    }

    // Bottom accent pill
    if (y >= 280 && y <= 283 && x >= 24 && x <= 140) {
      r = isUninstall ? 239 : 45;
      g = isUninstall ? 68 : 212;
      b = isUninstall ? 68 : 191;
    }

    return { r, g, b };
  });

  return bmp;
}

// 2. Header Bitmap (150 x 57 px) - Sleek Top Header for Installer Pages
function generateHeader() {
  const width = 150;
  const height = 57;

  const bmp = create24BitBMP(width, height, (x, y) => {
    // Pure clean white to subtle slate gradient (matches standard Windows header)
    const ny = y / height;
    let r = Math.round(255 * (1 - ny) + 248 * ny);
    let g = Math.round(255 * (1 - ny) + 250 * ny);
    let b = Math.round(255 * (1 - ny) + 252 * ny);

    // Right-aligned PDF Converter Mini-Logo (x: 105 to 135, y: 12 to 44)
    const cx = 120;
    const cy = 28;
    const dx = x - cx;
    const dy = y - cy;

    if (Math.abs(dx) <= 15 && Math.abs(dy) <= 17) {
      if (Math.abs(dx) <= 13 && Math.abs(dy) <= 15) {
        r = 225; g = 29; b = 72; // PDF Red

        // Corner fold
        if (dx > 3 && dy < -5) {
          r = 254; g = 205; b = 211;
        }

        // Horizontal document lines
        if (Math.abs(dy - 1) <= 1 && Math.abs(dx) <= 8) {
          r = 255; g = 255; b = 255;
        }
        if (Math.abs(dy + 4) <= 1 && Math.abs(dx) <= 8) {
          r = 255; g = 255; b = 255;
        }
      } else {
        r = 13; g = 148; b = 136; // Teal border
      }
    }

    return { r, g, b };
  });

  return bmp;
}

console.log('Gerando artes visuais oficiais para o instalador NSIS...');
fs.writeFileSync(path.join(RES_DIR, 'installerSidebar.bmp'), generateSidebar(false));
fs.writeFileSync(path.join(RES_DIR, 'uninstallerSidebar.bmp'), generateSidebar(true));
fs.writeFileSync(path.join(RES_DIR, 'installerHeader.bmp'), generateHeader());
console.log('Artes visuais geradas com sucesso em build-resources/:');
console.log('  - installerSidebar.bmp (164x314 px)');
console.log('  - uninstallerSidebar.bmp (164x314 px)');
console.log('  - installerHeader.bmp (150x57 px)');
