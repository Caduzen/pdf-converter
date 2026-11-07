const fs = require('fs');
const path = require('path');

// SVG base do ícone PDF
const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#FF6B6B;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#FF8E8E;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect x="64" y="32" width="384" height="448" rx="32" fill="url(#grad1)"/>
  <rect x="96" y="96" width="320" height="16" rx="8" fill="white" opacity="0.9"/>
  <rect x="96" y="144" width="320" height="16" rx="8" fill="white" opacity="0.9"/>
  <rect x="96" y="192" width="240" height="16" rx="8" fill="white" opacity="0.9"/>
  <rect x="96" y="240" width="280" height="16" rx="8" fill="white" opacity="0.9"/>
  <rect x="96" y="288" width="200" height="16" rx="8" fill="white" opacity="0.9"/>
  <text x="256" y="420" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="white" text-anchor="middle">PDF</text>
</svg>`;

// Salvar SVG
fs.writeFileSync(path.join(__dirname, 'icon.svg'), svgIcon);
console.log('✓ icon.svg criado');

// Criar PNG usando Canvas (se disponível)
try {
    const { createCanvas } = require('canvas');
    const sizes = [16, 32, 48, 64, 128, 256, 512];
    
    sizes.forEach(size => {
        const canvas = createCanvas(size, size);
        const ctx = canvas.getContext('2d');
        
        // Carregar SVG e desenhar
        const img = new Image();
        img.src = Buffer.from(svgIcon);
        ctx.drawImage(img, 0, 0, size, size);
        
        const buffer = canvas.toBuffer('image/png');
        fs.writeFileSync(path.join(__dirname, `icon${size}x${size}.png`), buffer);
        console.log(`✓ icon${size}x${size}.png criado`);
    });
    
    // Criar icon.png principal (512x512)
    fs.copyFileSync(
        path.join(__dirname, 'icon512x512.png'),
        path.join(__dirname, 'icon.png')
    );
    console.log('✓ icon.png criado');
    
} catch (error) {
    console.log('⚠ Canvas não disponível. Usando método alternativo...');
    
    // Método alternativo: salvar SVG e instruir o usuário
    console.log('\nPara converter o SVG para PNG/ICO/ICNS, você pode usar:');
    console.log('1. Online: https://convertio.co/pt/svg-png/');
    console.log('2. CLI: npm install -g svg2png && svg2png icon.svg -o icon.png');
    console.log('3. Para ICO: https://convertio.co/pt/png-ico/');
    console.log('4. Para ICNS (macOS): sips -s format icns icon.png --out icon.icns');
}

console.log('\nÍcones gerados com sucesso!');
