const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');
const { PDFDocument } = require('pdf-lib');

process.env.ELECTRON_RUN_TESTS = '1';

const ROOT_DIR = path.resolve(__dirname, '..');
const FIXTURES_DIR = path.join(__dirname, 'arquivos-de-teste');
const OUTPUT_DIR = path.join(__dirname, 'saida-pdf');
const REPORT_JSON_PATH = path.join(__dirname, 'resultado-testes.json');

app.whenReady().then(async () => {
  console.log('===========================================================');
  console.log('INICIANDO BATERIA COMPLETA DE TESTES DE CONVERSÃO PARA PDF');
  console.log('===========================================================');

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Carrega o motor principal de conversão
  const mainModule = require(path.join(ROOT_DIR, 'main.js'));
  const { convertSingleFileToPdf } = mainModule;

  // Garante que as fixtures existam
  const fixtureFiles = fs.readdirSync(FIXTURES_DIR).filter(f => !f.startsWith('.'));
  console.log(`Encontrados ${fixtureFiles.length} arquivos de teste em ${FIXTURES_DIR}`);

  const results = [];
  let passedCount = 0;
  let failedCount = 0;

  for (const fileName of fixtureFiles) {
    const inputPath = path.join(FIXTURES_DIR, fileName);
    const ext = path.extname(fileName).toLowerCase();
    const baseName = path.basename(fileName, ext);
    const outputPath = path.join(OUTPUT_DIR, `${baseName}_de_${ext.replace('.', '')}.pdf`);

    const inputStat = fs.statSync(inputPath);
    const startTime = Date.now();
    let status = 'PASS';
    let errorMessage = null;
    let pageCount = 0;
    let dimensions = [];
    let pdfSize = 0;

    try {
      console.log(`[TESTANDO] Formato: ${ext.toUpperCase().padEnd(8)} Arquivo: ${fileName}`);
      
      const pdfBuffer = await convertSingleFileToPdf(inputPath, {
        pageSize: 'auto',
        orientation: 'auto',
        margin: 'default'
      });

      if (!pdfBuffer || pdfBuffer.length < 100) {
        throw new Error(`Buffer PDF gerado vazio ou muito pequeno (${pdfBuffer ? pdfBuffer.length : 0} bytes)`);
      }

      // Validação de cabeçalho mágico %PDF-
      const header = pdfBuffer.subarray(0, 5).toString('ascii');
      if (!header.startsWith('%PDF-')) {
        throw new Error(`Cabeçalho inválido no arquivo gerado: "${header}". Esperado: "%PDF-"`);
      }

      // Validação estrutural profunda com pdf-lib
      const pdfDoc = await PDFDocument.load(pdfBuffer, { ignoreEncryption: true });
      pageCount = pdfDoc.getPageCount();
      if (pageCount < 1) {
        throw new Error('PDF gerado não contém nenhuma página legível.');
      }

      const pages = pdfDoc.getPages();
      dimensions = pages.map(p => ({
        width: Math.round(p.getWidth()),
        height: Math.round(p.getHeight())
      }));

      // Salva o PDF no disco para inspeção
      fs.writeFileSync(outputPath, pdfBuffer);
      pdfSize = pdfBuffer.length;
      passedCount++;
      console.log(`  -> [PASS] Páginas: ${pageCount} | Tamanho: ${(pdfSize / 1024).toFixed(1)} KB | Tempo: ${Date.now() - startTime}ms`);
    } catch (err) {
      status = 'FAIL';
      errorMessage = err.message;
      failedCount++;
      console.error(`  -> [FAIL] Erro na conversão de ${fileName}:`, err.message);
    }

    results.push({
      testType: 'single',
      fileName,
      extension: ext,
      inputSizeBytes: inputStat.size,
      outputPdfPath: path.relative(ROOT_DIR, outputPath).replace(/\\/g, '/'),
      outputSizeBytes: pdfSize,
      status,
      pageCount,
      dimensions,
      durationMs: Date.now() - startTime,
      errorMessage
    });
  }

  // =========================================================================
  // TESTE DE MÚLTIPLOS ARQUIVOS (MODO MESCLAGEM / MERGE)
  // =========================================================================
  console.log('\n[TESTANDO] Múltiplos Arquivos - Modo Mesclagem Unificada (Merge in 1 PDF)...');
  const mergeStartTime = Date.now();
  const sampleMergeFiles = [
    path.join(FIXTURES_DIR, 'amostra.md'),
    path.join(FIXTURES_DIR, 'amostra.txt'),
    path.join(FIXTURES_DIR, 'amostra.html'),
    path.join(FIXTURES_DIR, 'amostra.svg')
  ];

  try {
    const mergeOutputPath = path.join(OUTPUT_DIR, 'multiplos_mesclados_unificado.pdf');
    
    // Simula a lógica de merge do main.js
    const mergedPdfDoc = await PDFDocument.create();
    for (const fPath of sampleMergeFiles) {
      const singleBuf = await convertSingleFileToPdf(fPath, { pageSize: 'auto' });
      const srcDoc = await PDFDocument.load(singleBuf, { ignoreEncryption: true });
      const copiedPages = await mergedPdfDoc.copyPages(srcDoc, srcDoc.getPageIndices());
      copiedPages.forEach(page => mergedPdfDoc.addPage(page));
    }

    const mergedBytes = await mergedPdfDoc.save();
    fs.writeFileSync(mergeOutputPath, mergedBytes);

    const mergedVerifyDoc = await PDFDocument.load(mergedBytes);
    const mergedPages = mergedVerifyDoc.getPageCount();

    if (mergedPages < 4) {
      throw new Error(`Número de páginas esperado >= 4, obtido: ${mergedPages}`);
    }

    passedCount++;
    console.log(`  -> [PASS] Merge bem-sucedido! Páginas totais: ${mergedPages} | Tamanho: ${(mergedBytes.length / 1024).toFixed(1)} KB | Tempo: ${Date.now() - mergeStartTime}ms`);

    results.push({
      testType: 'multi-merge',
      fileName: '4 Arquivos (MD + TXT + HTML + SVG)',
      extension: 'multi-merge',
      inputSizeBytes: sampleMergeFiles.reduce((acc, f) => acc + fs.statSync(f).size, 0),
      outputPdfPath: path.relative(ROOT_DIR, mergeOutputPath).replace(/\\/g, '/'),
      outputSizeBytes: mergedBytes.length,
      status: 'PASS',
      pageCount: mergedPages,
      durationMs: Date.now() - mergeStartTime,
      errorMessage: null
    });
  } catch (err) {
    failedCount++;
    console.error('  -> [FAIL] Erro no teste de merge:', err.message);
    results.push({
      testType: 'multi-merge',
      fileName: '4 Arquivos (MD + TXT + HTML + SVG)',
      extension: 'multi-merge',
      status: 'FAIL',
      errorMessage: err.message
    });
  }

  // =========================================================================
  // TESTE DE MÚLTIPLOS ARQUIVOS (MODO SEPARADO EM LOTE)
  // =========================================================================
  console.log('\n[TESTANDO] Múltiplos Arquivos - Modo Separado (Batch em Lote)...');
  const batchStartTime = Date.now();
  const batchDir = path.join(OUTPUT_DIR, 'lote-separado');
  if (!fs.existsSync(batchDir)) fs.mkdirSync(batchDir, { recursive: true });

  try {
    const sampleBatchFiles = [
      path.join(FIXTURES_DIR, 'amostra.json'),
      path.join(FIXTURES_DIR, 'amostra.sql'),
      path.join(FIXTURES_DIR, 'amostra.py')
    ];

    const batchGenerated = [];
    for (const fPath of sampleBatchFiles) {
      const base = path.basename(fPath, path.extname(fPath));
      const outP = path.join(batchDir, `${base}_${path.extname(fPath).replace('.', '')}.pdf`);
      const bBuf = await convertSingleFileToPdf(fPath, {});
      fs.writeFileSync(outP, bBuf);
      
      const doc = await PDFDocument.load(bBuf);
      batchGenerated.push({ path: outP, pages: doc.getPageCount() });
    }

    if (batchGenerated.length !== sampleBatchFiles.length) {
      throw new Error(`Esperado ${sampleBatchFiles.length} arquivos gerados, obtido ${batchGenerated.length}`);
    }

    passedCount++;
    console.log(`  -> [PASS] Batch de ${batchGenerated.length} arquivos gerado separadamente com sucesso! Tempo: ${Date.now() - batchStartTime}ms`);

    results.push({
      testType: 'multi-batch',
      fileName: '3 Arquivos (JSON + SQL + PY)',
      extension: 'multi-batch',
      status: 'PASS',
      pageCount: batchGenerated.reduce((a, b) => a + b.pages, 0),
      durationMs: Date.now() - batchStartTime,
      errorMessage: null
    });
  } catch (err) {
    failedCount++;
    console.error('  -> [FAIL] Erro no teste batch:', err.message);
    results.push({
      testType: 'multi-batch',
      fileName: '3 Arquivos (JSON + SQL + PY)',
      extension: 'multi-batch',
      status: 'FAIL',
      errorMessage: err.message
    });
  }

  // =========================================================================
  // RESUMO E GRAVAÇÃO DO RELATÓRIO
  // =========================================================================
  const totalTests = results.length;
  const successRate = ((passedCount / totalTests) * 100).toFixed(1);

  const report = {
    suiteTitle: 'Relatório Oficial de Testes de Conversão e Fidelidade PDF Converter',
    timestamp: new Date().toISOString(),
    platform: process.platform,
    arch: process.arch,
    summary: {
      total: totalTests,
      passed: passedCount,
      failed: failedCount,
      successRate: `${successRate}%`
    },
    results
  };

  fs.writeFileSync(REPORT_JSON_PATH, JSON.stringify(report, null, 2), 'utf8');
  console.log('\n===========================================================');
  console.log(`BATERIA FINALIZADA: ${passedCount}/${totalTests} APROVADOS (${successRate}%)`);
  console.log(`Relatório salvo em: ${REPORT_JSON_PATH}`);
  console.log('===========================================================');

  if (failedCount > 0) {
    app.exit(1);
  } else {
    app.exit(0);
  }
});
