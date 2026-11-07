const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

function buildValidIco(images) {
    // images: array of { size, buffer }
    const count = images.length;
    const headerSize = 6;
    const dirEntrySize = 16;
    let offset = headerSize + count * dirEntrySize;

    const header = Buffer.alloc(headerSize);
    header.writeUInt16LE(0, 0);     // Reserved = 0
    header.writeUInt16LE(1, 2);     // Type = 1 (ICO)
    header.writeUInt16LE(count, 4); // Number of images

    const dirEntries = [];
    const dataBuffers = [];

    for (const img of images) {
        const entry = Buffer.alloc(dirEntrySize);
        entry.writeUInt8(img.size >= 256 ? 0 : img.size, 0); // Width (0 = 256)
        entry.writeUInt8(img.size >= 256 ? 0 : img.size, 1); // Height (0 = 256)
        entry.writeUInt8(0, 2);                              // Color palette
        entry.writeUInt8(0, 3);                              // Reserved
        entry.writeUInt16LE(1, 4);                           // Color planes
        entry.writeUInt16LE(32, 6);                          // Bits per pixel
        entry.writeUInt32LE(img.buffer.length, 8);           // Image byte size
        entry.writeUInt32LE(offset, 12);                     // Offset in file

        dirEntries.push(entry);
        dataBuffers.push(img.buffer);
        offset += img.buffer.length;
    }

    return Buffer.concat([header, ...dirEntries, ...dataBuffers]);
}

function buildValidIcns(png256Buffer, png512Buffer) {
    // ICNS container com chunks 'ic08' (256x256 PNG) e 'ic09' (512x512 PNG)
    const chunk256 = Buffer.alloc(8 + png256Buffer.length);
    chunk256.write('ic08', 0, 4, 'ascii');
    chunk256.writeUInt32BE(8 + png256Buffer.length, 4);
    png256Buffer.copy(chunk256, 8);

    const chunk512 = Buffer.alloc(8 + png512Buffer.length);
    chunk512.write('ic09', 0, 4, 'ascii');
    chunk512.writeUInt32BE(8 + png512Buffer.length, 4);
    png512Buffer.copy(chunk512, 8);

    const totalLen = 8 + chunk256.length + chunk512.length;
    const header = Buffer.alloc(8);
    header.write('icns', 0, 4, 'ascii');
    header.writeUInt32BE(totalLen, 4);

    return Buffer.concat([header, chunk256, chunk512]);
}

async function createIcons() {
    try {
        const svgBuffer = fs.readFileSync(path.join(__dirname, 'icon.svg'));

        const png512 = await sharp(svgBuffer).resize(512, 512).png().toBuffer();
        fs.writeFileSync(path.join(__dirname, 'icon.png'), png512);
        console.log('✓ icon.png criado (512x512)');

        const sizes = [16, 32, 48, 64, 128, 256];
        const icoImages = [];
        let png256 = null;

        for (const size of sizes) {
            const buffer = await sharp(svgBuffer).resize(size, size).png().toBuffer();
            if ([16, 32, 64, 128, 256].includes(size)) {
                fs.writeFileSync(path.join(__dirname, `icon${size}.png`), buffer);
            }
            if (size === 256) png256 = buffer;
            icoImages.push({ size, buffer });
        }

        const icoBuffer = buildValidIco(icoImages);
        fs.writeFileSync(path.join(__dirname, 'icon.ico'), icoBuffer);
        console.log(`✓ icon.ico válido criado (multi-resolução 16..256px, ${icoBuffer.length} bytes)`);

        const icnsBuffer = buildValidIcns(png256, png512);
        fs.writeFileSync(path.join(__dirname, 'icon.icns'), icnsBuffer);
        console.log(`✓ icon.icns válido criado (${icnsBuffer.length} bytes)`);

        console.log('\n✅ Todos os ícones oficiais foram gerados com cabeçalhos binários válidos!');
    } catch (error) {
        console.error('Erro ao criar ícones:', error);
        process.exit(1);
    }
}

createIcons();
