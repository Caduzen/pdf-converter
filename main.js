const { app, BrowserWindow, dialog, ipcMain, shell } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');
const { spawn, execFileSync } = require('child_process');
const { pathToFileURL } = require('url');
const { PDFDocument } = require('pdf-lib');
const mammoth = require('mammoth');
const xlsx = require('xlsx');
const JSZip = require('jszip');

let sharp = null;
try {
  sharp = require('sharp');
} catch (sharpErr) {
  console.warn('Sharp nativo com ABI diferente do Electron, usando motor de imagem Chromium/Electron:', sharpErr.message);
}

let mainWindow;

// Categorias de extensões suportadas
const FORMAT_CATEGORIES = {
  word: ['.docx', '.doc', '.docm', '.dotx', '.dotm', '.rtf', '.odt'],
  excel: ['.xlsx', '.xls', '.xlsm', '.xlsb', '.ods', '.csv', '.tsv'],
  powerpoint: ['.pptx', '.ppt', '.ppsx', '.pps', '.pptm', '.odp'],
  markdown: ['.md', '.markdown', '.mdown', '.mkd'],
  text: ['.txt', '.note', '.notes', '.log', '.ini', '.cfg', '.conf', '.env', '.sub', '.srt', '.vtt', '.tex'],
  html: ['.html', '.htm', '.xhtml', '.mhtml'],
  code: [
    '.json', '.xml', '.yaml', '.yml', '.toml',
    '.js', '.mjs', '.cjs', '.ts', '.jsx', '.tsx',
    '.py', '.java', '.c', '.cpp', '.h', '.hpp', '.cs',
    '.go', '.rs', '.php', '.rb', '.sql', '.sh', '.ps1', '.bat', '.cmd',
    '.css', '.scss', '.less', '.vue', '.svelte'
  ],
  image: ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.tiff', '.tif', '.avif', '.ico'],
  vector: ['.svg'],
  pdf: ['.pdf']
};

function getFormatCategory(ext) {
  const cleanExt = (ext || '').toLowerCase();
  for (const [category, extensions] of Object.entries(FORMAT_CATEGORIES)) {
    if (extensions.includes(cleanExt)) {
      return category;
    }
  }
  return 'unknown';
}

function getFormatMetadata(ext) {
  const category = getFormatCategory(ext);
  const upperExt = (ext || '').replace('.', '').toUpperCase() || 'ARQUIVO';

  switch (category) {
    case 'word':
      return {
        category,
        badge: upperExt,
        typeLabel: 'Documento de Texto Rico / Word',
        engineLabel: 'Fidelidade 100% Original (Fontes, Tabelas, Cabeçalhos e Paginação)',
        recommendedOrientation: 'auto'
      };
    case 'excel':
      return {
        category,
        badge: upperExt,
        typeLabel: 'Planilha / Dados Tabulares',
        engineLabel: 'Preservação de Tabelas, Células Mescladas, Cores e Formatação',
        recommendedOrientation: 'landscape'
      };
    case 'powerpoint':
      return {
        category,
        badge: upperExt,
        typeLabel: 'Apresentação de Slides',
        engineLabel: 'Fidelidade de Slides 16:9 / 4:3 (Layout, Vetores e Imagens)',
        recommendedOrientation: 'landscape'
      };
    case 'markdown':
      return {
        category,
        badge: upperExt,
        typeLabel: 'Notas Estruturadas / Markdown',
        engineLabel: 'Renderização Rica (Títulos, Listas, Tabelas, Checklists e Código)',
        recommendedOrientation: 'portrait'
      };
    case 'text':
      return {
        category,
        badge: upperExt,
        typeLabel: 'Bloco de Notas / Texto',
        engineLabel: 'Preservação Exata de Quebras, Recuos, Acentos, Tabulações e Emojis',
        recommendedOrientation: 'portrait'
      };
    case 'html':
      return {
        category,
        badge: upperExt,
        typeLabel: 'Página Web / Documento HTML',
        engineLabel: 'Motor Chromium Nativo (CSS, Imagens e Layout Original)',
        recommendedOrientation: 'auto'
      };
    case 'code':
      return {
        category,
        badge: upperExt,
        typeLabel: 'Código-Fonte / Dados Estruturados',
        engineLabel: 'Tipografia Monoespaçada com Numeração de Linhas e Indentação',
        recommendedOrientation: 'portrait'
      };
    case 'image':
    case 'vector':
      return {
        category,
        badge: upperExt,
        typeLabel: 'Imagem / Gráfico Vetorial',
        engineLabel: 'Proporção e Nitidez Originais Preservadas (Auto-Orientação EXIF)',
        recommendedOrientation: 'auto'
      };
    case 'pdf':
      return {
        category,
        badge: 'PDF',
        typeLabel: 'Documento PDF',
        engineLabel: 'Otimização Estrutural sem Perda de Qualidade Visual',
        recommendedOrientation: 'auto'
      };
    default:
      return {
        category: 'text',
        badge: upperExt,
        typeLabel: 'Arquivo de Notas / Documento',
        engineLabel: 'Detecção Inteligente de Conteúdo e Codificação de Caracteres',
        recommendedOrientation: 'portrait'
      };
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 940,
    height: 760,
    minWidth: 380,
    minHeight: 540,
    frame: true,
    titleBarStyle: 'default',
    backgroundColor: '#141625',
    icon: path.join(__dirname, 'icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));
}

app.whenReady().then(() => {
  if (process.env.ELECTRON_RUN_TESTS === '1') {
    return;
  }
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.env.ELECTRON_RUN_TESTS === '1') {
    return;
  }
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// ============================================================================
// IPC HANDLERS
// ============================================================================

ipcMain.handle('select-file', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile', 'multiSelections'],
    filters: [
      {
        name: 'Todos os Documentos, Notas e Imagens Suportados',
        extensions: [
          'docx', 'doc', 'docm', 'dotx', 'rtf', 'odt',
          'txt', 'md', 'markdown', 'note', 'notes', 'log',
          'xlsx', 'xls', 'xlsm', 'xlsb', 'ods', 'csv', 'tsv',
          'pptx', 'ppt', 'ppsx', 'pps', 'odp',
          'html', 'htm', 'xhtml', 'mhtml',
          'jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'tiff', 'tif', 'avif', 'svg', 'ico',
          'json', 'xml', 'yaml', 'yml', 'sql', 'js', 'ts', 'py', 'css',
          'pdf'
        ]
      },
      { name: 'Word, Notas & Texto Rico', extensions: ['docx', 'doc', 'rtf', 'odt', 'txt', 'md', 'markdown', 'note'] },
      { name: 'Planilhas & Tabelas (Excel, CSV, ODS)', extensions: ['xlsx', 'xls', 'xlsm', 'xlsb', 'ods', 'csv', 'tsv'] },
      { name: 'Apresentações (PowerPoint, ODP)', extensions: ['pptx', 'ppt', 'ppsx', 'pps', 'odp'] },
      { name: 'Imagens & Vetores', extensions: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'tiff', 'tif', 'avif', 'svg', 'ico'] },
      { name: 'Web & Código', extensions: ['html', 'htm', 'xhtml', 'mhtml', 'json', 'xml', 'yaml', 'yml', 'js', 'ts', 'py', 'sql'] },
      { name: 'PDF', extensions: ['pdf'] },
      { name: 'Todos os Arquivos (*.*)', extensions: ['*'] }
    ]
  });

  if (!result.canceled && result.filePaths.length > 0) {
    return result.filePaths;
  }
  return [];
});

ipcMain.handle('select-directory', async (event, defaultPath) => {
  const result = await dialog.showOpenDialog(mainWindow, {
    defaultPath: defaultPath || undefined,
    properties: ['openDirectory', 'createDirectory']
  });

  if (!result.canceled && result.filePaths.length > 0) {
    return result.filePaths[0];
  }
  return null;
});

ipcMain.handle('save-pdf', async (event, defaultName) => {
  const result = await dialog.showSaveDialog(mainWindow, {
    defaultPath: defaultName,
    filters: [{ name: 'Documento PDF (*.pdf)', extensions: ['pdf'] }]
  });

  if (!result.canceled && result.filePath) {
    return result.filePath;
  }
  return null;
});

ipcMain.handle('get-file-info', async (event, filePath) => {
  try {
    const stats = fs.statSync(filePath);
    const name = path.basename(filePath);
    const ext = path.extname(filePath).toLowerCase();
    const size = stats.size;
    const meta = getFormatMetadata(ext);

    return {
      name,
      ext,
      size,
      ...meta
    };
  } catch (error) {
    console.error('Erro ao obter info do arquivo:', error);
    throw error;
  }
});

ipcMain.handle('save-pdf-file', async (event, savePath, pdfBuffer) => {
  try {
    fs.writeFileSync(savePath, Buffer.from(pdfBuffer));
    return true;
  } catch (error) {
    console.error('Erro ao salvar PDF:', error);
    throw error;
  }
});

ipcMain.handle('read-file-buffer', async (event, filePath) => {
  try {
    return fs.readFileSync(filePath);
  } catch (error) {
    console.error('Erro ao ler arquivo:', error);
    throw error;
  }
});

ipcMain.handle('open-path', async (event, filePath) => {
  if (!filePath || !fs.existsSync(filePath)) {
    throw new Error('Arquivo não encontrado.');
  }
  const err = await shell.openPath(filePath);
  if (err) {
    throw new Error(err);
  }
  return true;
});

ipcMain.handle('show-item-in-folder', async (event, filePath) => {
  if (!filePath || !fs.existsSync(filePath)) {
    throw new Error('Arquivo não encontrado.');
  }
  shell.showItemInFolder(filePath);
  return true;
});

ipcMain.handle('open-external', async (event, url) => {
  if (url && (url.startsWith('https://') || url.startsWith('http://') || url.startsWith('mailto:'))) {
    await shell.openExternal(url);
    return true;
  }
  return false;
});

ipcMain.handle('get-system-locale', () => {
  return app.getLocale();
});

ipcMain.handle('optimize-pdf', async (event, pdfBuffer) => {
  try {
    const pdfDoc = await PDFDocument.load(pdfBuffer, { ignoreEncryption: true });

    pdfDoc.setTitle('');
    pdfDoc.setAuthor('');
    pdfDoc.setSubject('');
    pdfDoc.setKeywords([]);
    pdfDoc.setProducer('PDF Converter');
    pdfDoc.setCreator('PDF Converter');

    const pdfBytes = await pdfDoc.save({
      useObjectStreams: true,
      addDefaultPage: false
    });

    return Buffer.from(pdfBytes);
  } catch (error) {
    console.error('Erro na otimização:', error);
    throw error;
  }
});

async function convertSingleFileToPdf(filePath, userOptions = {}) {
  if (!filePath || !fs.existsSync(filePath)) {
    throw new Error('O arquivo selecionado não foi encontrado no disco.');
  }

  const ext = path.extname(filePath).toLowerCase();
  const category = getFormatCategory(ext);
  const options = {
    pageSize: userOptions.pageSize || 'auto',       // 'auto' | 'A4' | 'Letter'
    orientation: userOptions.orientation || 'auto', // 'auto' | 'portrait' | 'landscape'
    margin: userOptions.margin || 'default'         // 'default' | 'compact' | 'none'
  };

  switch (category) {
    case 'image':
      return await convertImageToPDF(filePath, options);

    case 'vector':
      return await convertSvgToPDF(filePath, options);

    case 'word':
      return await convertWordOrRichTextToPDF(filePath, ext, options);

    case 'excel':
      return await convertSpreadsheetToPDF(filePath, ext, options);

    case 'powerpoint':
      return await convertPresentationToPDF(filePath, ext, options);

    case 'markdown':
      return await convertMarkdownToPDF(filePath, options);

    case 'text':
      return await convertNoteTextToPDF(filePath, options);

    case 'html':
      return await convertHtmlFileToPDF(filePath, options);

    case 'code':
      return await convertCodeOrStructuredToPDF(filePath, ext, options);

    case 'pdf':
      return fs.readFileSync(filePath);

    default:
      return await convertUnknownFileToPDF(filePath, ext, options);
  }
}

ipcMain.handle('convert-to-pdf', async (event, filePath, userOptions = {}) => {
  try {
    return await convertSingleFileToPdf(filePath, userOptions);
  } catch (error) {
    console.error('Erro na conversão individual:', error);
    throw error;
  }
});

ipcMain.handle('merge-to-single-pdf', async (event, filePaths, userOptions = {}) => {
  try {
    if (!Array.isArray(filePaths) || filePaths.length === 0) {
      throw new Error('Nenhum arquivo fornecido para unificar.');
    }

    const mergedDoc = await PDFDocument.create();

    for (let i = 0; i < filePaths.length; i++) {
      const fPath = filePaths[i];
      const pdfBuf = await convertSingleFileToPdf(fPath, userOptions);
      const subDoc = await PDFDocument.load(pdfBuf, { ignoreEncryption: true });
      const copiedPages = await mergedDoc.copyPages(subDoc, subDoc.getPageIndices());
      copiedPages.forEach(page => mergedDoc.addPage(page));
    }

    const mergedBytes = await mergedDoc.save({ useObjectStreams: true });
    return Buffer.from(mergedBytes);
  } catch (error) {
    console.error('Erro ao mesclar arquivos em PDF único:', error);
    throw error;
  }
});

ipcMain.handle('convert-batch-separate', async (event, filePaths, targetDir, userOptions = {}) => {
  try {
    if (!Array.isArray(filePaths) || filePaths.length === 0) {
      throw new Error('Nenhum arquivo fornecido para conversão em lote.');
    }
    if (!targetDir || !fs.existsSync(targetDir)) {
      throw new Error('Pasta de destino inválida ou não encontrada.');
    }

    const generatedFiles = [];
    const nameCounts = {};

    for (let i = 0; i < filePaths.length; i++) {
      const fPath = filePaths[i];
      const pdfBuf = await convertSingleFileToPdf(fPath, userOptions);
      const origBase = path.basename(fPath, path.extname(fPath));

      let candidateName = `${origBase}.pdf`;
      if (nameCounts[candidateName]) {
        nameCounts[candidateName]++;
        candidateName = `${origBase} (${nameCounts[candidateName]}).pdf`;
      } else {
        nameCounts[candidateName] = 1;
      }

      const outPath = path.join(targetDir, candidateName);
      fs.writeFileSync(outPath, Buffer.from(pdfBuf));
      generatedFiles.push(outPath);
    }

    return {
      targetDir,
      count: generatedFiles.length,
      files: generatedFiles
    };
  } catch (error) {
    console.error('Erro na conversão de múltiplos arquivos separados:', error);
    throw error;
  }
});

// ============================================================================
// UTILITÁRIOS DE TEMPORÁRIOS, CODIFICAÇÃO E CHROMIUM PRINT-TO-PDF
// ============================================================================

function createTempDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'pdfconv-'));
}

function cleanupTempDir(dirPath) {
  try {
    if (dirPath && fs.existsSync(dirPath)) {
      fs.rmSync(dirPath, { recursive: true, force: true });
    }
  } catch (e) {
    console.warn('Aviso ao limpar tempDir:', e.message);
  }
}

/**
 * Lê qualquer arquivo de texto/nota detectando automaticamente UTF-8, UTF-16LE/BE (comum no Bloco de Notas do Windows)
 * ou Windows-1252 / Latin-1, garantindo que acentos em português (ç, ã, é, ô) e emojis nunca fiquem corrompidos.
 */
function readTextSmartEncoding(filePath) {
  const buf = fs.readFileSync(filePath);
  if (buf.length === 0) return '';

  // BOM UTF-8
  if (buf.length >= 3 && buf[0] === 0xEF && buf[1] === 0xBB && buf[2] === 0xBF) {
    return buf.subarray(3).toString('utf8');
  }
  // BOM UTF-16 LE (padrão Windows Notepad Unicode)
  if (buf.length >= 2 && buf[0] === 0xFF && buf[1] === 0xFE) {
    return buf.subarray(2).toString('utf16le');
  }
  // BOM UTF-16 BE
  if (buf.length >= 2 && buf[0] === 0xFE && buf[1] === 0xFF) {
    const swapped = Buffer.alloc(buf.length - 2);
    for (let i = 2; i < buf.length - 1; i += 2) {
      swapped[i - 2] = buf[i + 1];
      swapped[i - 1] = buf[i];
    }
    return swapped.toString('utf16le');
  }

  // Verifica se é UTF-8 válido sem caracteres de substituição (\uFFFD)
  const utf8Text = buf.toString('utf8');
  if (!utf8Text.includes('\uFFFD')) {
    return utf8Text;
  }

  // Fallback para Windows-1252 / Latin-1 (muito comum em arquivos .txt/.csv/.rtf antigos no Brasil)
  try {
    const decoder = new TextDecoder('windows-1252');
    return decoder.decode(buf);
  } catch {
    return buf.toString('latin1');
  }
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getPrintMargins(marginOption) {
  if (marginOption === 'none') {
    return { top: 0, bottom: 0, left: 0, right: 0 };
  }
  if (marginOption === 'compact') {
    return { top: 0.4, bottom: 0.4, left: 0.4, right: 0.4 }; // ~10mm em polegadas
  }
  return { top: 0.65, bottom: 0.65, left: 0.65, right: 0.65 }; // ~16.5mm em polegadas
}

/**
 * Renderiza HTML completo para PDF usando o motor Chromium nativo do Electron (webContents.printToPDF).
 * Escreve em arquivo temporário para suportar documentos grandes, fontes locais, imagens base64/file:// e CSS @page.
 */
async function renderHtmlToPdfViaChromium(htmlContent, options = {}, baseDir = null) {
  const tempDir = createTempDir();
  const tempHtmlPath = path.join(tempDir, 'render.html');

  let finalHtml = htmlContent;
  if (baseDir) {
    const baseHref = pathToFileURL(baseDir + path.sep).href;
    if (finalHtml.includes('<head>')) {
      finalHtml = finalHtml.replace('<head>', `<head><base href="${baseHref}">`);
    }
  }

  fs.writeFileSync(tempHtmlPath, finalHtml, 'utf8');

  const printWin = new BrowserWindow({
    width: 1200,
    height: 900,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
      webSecurity: false // Permite carregar imagens locais referenciadas pelo documento do usuário
    }
  });

  try {
    await printWin.loadFile(tempHtmlPath);

    // Aguarda fontes e imagens carregarem completamente
    await printWin.webContents.executeJavaScript(`
      Promise.all([
        document.fonts ? document.fonts.ready : Promise.resolve(),
        ...Array.from(document.images).map(img => {
          if (img.complete) return Promise.resolve();
          return new Promise(res => { img.onload = res; img.onerror = res; });
        })
      ]).then(() => new Promise(r => setTimeout(r, 120)));
    `);

    const pageSize = (options.pageSize === 'Letter') ? 'Letter' : 'A4';
    const landscape = options.orientation === 'landscape';
    const margins = getPrintMargins(options.margin);

    const pdfBuffer = await printWin.webContents.printToPDF({
      pageSize,
      landscape,
      printBackground: true,
      preferCSSPageSize: options.preferCSSPageSize !== false,
      margins
    });

    return Buffer.from(pdfBuffer);
  } finally {
    if (!printWin.isDestroyed()) {
      printWin.close();
    }
    cleanupTempDir(tempDir);
  }
}

// ============================================================================
// TIER 1 & 2: MOTORES NATIVOS (MICROSOFT OFFICE COM & LIBREOFFICE HEADLESS)
// ============================================================================

/**
 * Converte documentos Office no Windows usando a automação COM oficial do Microsoft Office
 * (Word.Application, Excel.Application, PowerPoint.Application).
 * Garante 100% de fidelidade visual idêntica ao "Salvar como PDF" nativo do Office!
 */
async function convertViaMicrosoftOfficeCOM(filePath, appType, options = {}) {
  if (process.platform !== 'win32') {
    throw new Error('Microsoft Office COM disponível apenas no Windows.');
  }

  const tempDir = createTempDir();
  const outPdfPath = path.join(tempDir, 'output.pdf');
  const scriptPath = path.join(tempDir, 'convert.ps1');

  const orientationOverride = options.orientation === 'landscape' ? 1 : (options.orientation === 'portrait' ? 0 : -1);
  let psScript = '';

  if (appType === 'word') {
    // wdExportFormatPDF = 17, wdOrientationPortrait = 0, wdOrientationLandscape = 1
    psScript = `
$ErrorActionPreference = 'Stop'
$srcPath = ${JSON.stringify(path.resolve(filePath))}
$dstPath = ${JSON.stringify(path.resolve(outPdfPath))}
$orient = ${orientationOverride}
$word = $null
$doc = $null
try {
  $word = New-Object -ComObject Word.Application
  $word.Visible = $false
  $word.DisplayAlerts = 0
  $doc = $word.Documents.Open($srcPath, $false, $true, $false)
  if ($orient -eq 0 -or $orient -eq 1) {
    try { $doc.PageSetup.Orientation = $orient } catch {}
  }
  $doc.ExportAsFixedFormat($dstPath, 17, $false, 0, 0, 1, 1, 0, $true, $true, 1, $true, $true, $false)
} finally {
  if ($doc -ne $null) {
    try { $doc.Close(0) } catch {}
    [System.Runtime.InteropServices.Marshal]::ReleaseComObject($doc) | Out-Null
  }
  if ($word -ne $null) {
    try { $word.Quit(0) } catch {}
    [System.Runtime.InteropServices.Marshal]::ReleaseComObject($word) | Out-Null
  }
  [GC]::Collect()
  [GC]::WaitForPendingFinalizers()
}
`;
  } else if (appType === 'excel') {
    // xlTypePDF = 0, xlPortrait = 1, xlLandscape = 2
    // Nota: Só altera PageSetup se o usuário escolheu orientação manual (evita lentidão do spooler de impressão do Windows)
    const xlOrient = options.orientation === 'portrait' ? 1 : (options.orientation === 'landscape' ? 2 : 0);
    psScript = `
$ErrorActionPreference = 'Stop'
$srcPath = ${JSON.stringify(path.resolve(filePath))}
$dstPath = ${JSON.stringify(path.resolve(outPdfPath))}
$xlOrient = ${xlOrient}
$excel = $null
$wb = $null
try {
  $excel = New-Object -ComObject Excel.Application
  $excel.Visible = $false
  $excel.DisplayAlerts = $false
  $excel.ScreenUpdating = $false
  $excel.PrintCommunication = $false
  $wb = $excel.Workbooks.Open($srcPath, 0, $true)
  if ($xlOrient -eq 1 -or $xlOrient -eq 2) {
    foreach ($ws in $wb.Worksheets) {
      try { $ws.PageSetup.Orientation = $xlOrient } catch {}
    }
  }
  $excel.PrintCommunication = $true
  $wb.ExportAsFixedFormat(0, $dstPath, 0, $true, $false)
} finally {
  if ($wb -ne $null) {
    try { $wb.Close($false) } catch {}
    [System.Runtime.InteropServices.Marshal]::ReleaseComObject($wb) | Out-Null
  }
  if ($excel -ne $null) {
    try { $excel.Quit() } catch {}
    [System.Runtime.InteropServices.Marshal]::ReleaseComObject($excel) | Out-Null
  }
  [GC]::Collect()
  [GC]::WaitForPendingFinalizers()
}
`;
  } else if (appType === 'powerpoint') {
    // ppSaveAsPDF = 32, msoTrue = -1, msoFalse = 0
    psScript = `
$ErrorActionPreference = 'Stop'
$srcPath = ${JSON.stringify(path.resolve(filePath))}
$dstPath = ${JSON.stringify(path.resolve(outPdfPath))}
$ppt = $null
$pres = $null
try {
  $ppt = New-Object -ComObject PowerPoint.Application
  $pres = $ppt.Presentations.Open($srcPath, -1, 0, 0)
  $pres.SaveAs($dstPath, 32)
} finally {
  if ($pres -ne $null) {
    try { $pres.Close() } catch {}
    [System.Runtime.InteropServices.Marshal]::ReleaseComObject($pres) | Out-Null
  }
  if ($ppt -ne $null) {
    try { $ppt.Quit() } catch {}
    [System.Runtime.InteropServices.Marshal]::ReleaseComObject($ppt) | Out-Null
  }
  [GC]::Collect()
  [GC]::WaitForPendingFinalizers()
}
`;
  } else {
    cleanupTempDir(tempDir);
    throw new Error(`Tipo de aplicativo Office desconhecido: ${appType}`);
  }

  // Salva o script PowerShell com BOM UTF-8 para suportar caminhos com acentos no Windows
  fs.writeFileSync(scriptPath, '\uFEFF' + psScript, 'utf8');

  try {
    await new Promise((resolve, reject) => {
      const child = spawn('powershell.exe', [
        '-NoProfile',
        '-NonInteractive',
        '-ExecutionPolicy', 'Bypass',
        '-File', scriptPath
      ], { windowsHide: true });

      let stderr = '';
      let isSettled = false;

      const timer = setTimeout(() => {
        if (!isSettled) {
          isSettled = true;
          try { child.kill('SIGKILL'); } catch {}
          reject(new Error(`Timeout de 6s excedido no Microsoft Office COM (${appType})`));
        }
      }, 6000);

      child.stderr.on('data', (d) => { stderr += d.toString(); });
      child.on('error', (err) => {
        if (!isSettled) {
          isSettled = true;
          clearTimeout(timer);
          reject(err);
        }
      });
      child.on('close', (code) => {
        if (!isSettled) {
          isSettled = true;
          clearTimeout(timer);
          if (code === 0 && fs.existsSync(outPdfPath)) {
            resolve();
          } else {
            reject(new Error(`Office COM (${appType}) falhou (código ${code}): ${stderr.trim()}`));
          }
        }
      });
    });

    return fs.readFileSync(outPdfPath);
  } finally {
    cleanupTempDir(tempDir);
  }
}

/**
 * Localiza de forma real e verificada o executável do LibreOffice em Windows, macOS ou Linux.
 * Corrige o bug anterior onde 'libreoffice' === 'libreoffice' sempre retornava verdadeiro.
 */
function findLibreOfficeExecutable() {
  const candidates = [
    'C:\\Program Files\\LibreOffice\\program\\soffice.exe',
    'C:\\Program Files (x86)\\LibreOffice\\program\\soffice.exe',
    'C:\\Program Files\\LibreOffice 7\\program\\soffice.exe',
    'C:\\Program Files\\LibreOffice 24\\program\\soffice.exe',
    '/Applications/LibreOffice.app/Contents/MacOS/soffice',
    '/usr/bin/libreoffice',
    '/usr/bin/soffice',
    '/usr/local/bin/libreoffice',
    '/snap/bin/libreoffice'
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  // Tenta localizar no PATH do sistema operacional
  const lookupCmd = process.platform === 'win32' ? 'where.exe' : 'which';
  for (const binName of ['soffice', 'libreoffice']) {
    try {
      const out = execFileSync(lookupCmd, [binName], { stdio: ['ignore', 'pipe', 'ignore'], windowsHide: true })
        .toString()
        .split(/\r?\n/)[0]
        .trim();
      if (out && fs.existsSync(out)) {
        return out;
      }
    } catch {
      // Não está no PATH
    }
  }

  return null;
}

async function convertViaLibreOffice(filePath) {
  const sofficePath = findLibreOfficeExecutable();
  if (!sofficePath) {
    throw new Error('LibreOffice não encontrado no sistema.');
  }

  const tempDir = createTempDir();
  const baseName = path.basename(filePath, path.extname(filePath));
  const expectedPdfPath = path.join(tempDir, `${baseName}.pdf`);

  try {
    await new Promise((resolve, reject) => {
      const child = spawn(sofficePath, [
        '--headless',
        '--convert-to', 'pdf',
        '--outdir', tempDir,
        filePath
      ], { windowsHide: true });

      let stderr = '';
      child.stderr.on('data', (d) => { stderr += d.toString(); });
      child.on('error', reject);
      child.on('close', () => {
        if (fs.existsSync(expectedPdfPath)) {
          resolve();
        } else {
          // Procura qualquer .pdf gerado no diretório temporário
          const files = fs.readdirSync(tempDir).filter(f => f.toLowerCase().endsWith('.pdf'));
          if (files.length > 0) {
            fs.renameSync(path.join(tempDir, files[0]), expectedPdfPath);
            resolve();
          } else {
            reject(new Error(`LibreOffice não gerou o PDF. ${stderr}`));
          }
        }
      });
    });

    return fs.readFileSync(expectedPdfPath);
  } finally {
    cleanupTempDir(tempDir);
  }
}

// ============================================================================
// CONVERSORES ESPECÍFICOS POR CATEGORIA (COM FALLBACKS DE ALTA FIDELIDADE)
// ============================================================================

/**
 * 1. WORD & DOCUMENTOS DE TEXTO RICO (.docx, .doc, .rtf, .odt)
 */
async function convertWordOrRichTextToPDF(filePath, ext, options) {
  // Para RTF e ODT, utiliza direto os renderizadores integrados com alto desempenho
  if (ext === '.rtf') {
    return await convertRtfViaChromium(filePath, options);
  }
  if (ext === '.odt') {
    return await convertOdtViaChromium(filePath, options);
  }

  // Tier 1: Microsoft Word Nativo (Windows) para DOCX/DOC — 100% fidelidade
  if (process.platform === 'win32' && ['.docx', '.doc', '.docm', '.dotx'].includes(ext)) {
    try {
      return await convertViaMicrosoftOfficeCOM(filePath, 'word', options);
    } catch (wordErr) {
      console.warn('MS Word COM indisponível ou falhou, tentando próximo motor:', wordErr.message);
    }
  }

  // Tier 2: LibreOffice Headless
  try {
    return await convertViaLibreOffice(filePath);
  } catch (loErr) {
    console.warn('LibreOffice indisponível, usando motor Chromium + renderizador rico integrado:', loErr.message);
  }

  // Tier 3: Renderizadores Puros Integrados + Chromium printToPDF
  if (ext === '.docx' || ext === '.docm' || ext === '.dotx') {
    return await convertDocxViaChromiumPreview(filePath, options);
  }

  if (ext === '.rtf') {
    return await convertRtfViaChromium(filePath, options);
  }

  if (ext === '.odt') {
    return await convertOdtViaChromium(filePath, options);
  }

  throw new Error(`Para converter arquivos ${ext} antigos sem Microsoft Word ou LibreOffice, salve como .docx ou instale o Microsoft Word / LibreOffice.`);
}

/**
 * Renderiza .docx usando docx-preview dentro do Chromium (preserva páginas, cabeçalhos, rodapés,
 * tabelas, bordas, cores, fontes, alinhamentos e imagens) com fallback para Mammoth.
 */
async function convertDocxViaChromiumPreview(docxPath, options) {
  const jszipPath = path.join(__dirname, 'node_modules', 'jszip', 'dist', 'jszip.min.js');
  const docxPreviewPath = path.join(__dirname, 'node_modules', 'docx-preview', 'dist', 'docx-preview.min.js');

  if (fs.existsSync(jszipPath) && fs.existsSync(docxPreviewPath)) {
    try {
      const docxBase64 = fs.readFileSync(docxPath).toString('base64');
      const jszipCode = fs.readFileSync(jszipPath, 'utf8');
      const docxPreviewCode = fs.readFileSync(docxPreviewPath, 'utf8');

      const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <script>${jszipCode}</script>
  <script>${docxPreviewCode}</script>
  <style>
    * { box-sizing: border-box; }
    html, body {
      margin: 0;
      padding: 0;
      background: #ffffff;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .docx-wrapper {
      background: #ffffff !important;
      padding: 0 !important;
      display: block !important;
    }
    .docx-wrapper > section.docx {
      box-shadow: none !important;
      margin: 0 auto !important;
      page-break-after: always;
      break-after: page;
    }
    .docx-wrapper > section.docx:last-child {
      page-break-after: auto;
      break-after: auto;
    }
  </style>
</head>
<body>
  <div id="docx-container"></div>
  <script>
    window.__docxReady = (async () => {
      const b64 = ${JSON.stringify(docxBase64)};
      const binary = atob(b64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
      const container = document.getElementById('docx-container');
      await window.docx.renderAsync(bytes.buffer, container, null, {
        inWrapper: true,
        ignoreWidth: false,
        ignoreHeight: false,
        ignoreFonts: false,
        breakPages: true,
        renderHeaders: true,
        renderFooters: true,
        renderFootnotes: true,
        renderEndnotes: true,
        useBase64URL: true
      });
      return true;
    })();
  </script>
</body>
</html>`;

      const tempDir = createTempDir();
      const tempHtmlPath = path.join(tempDir, 'docx-render.html');
      fs.writeFileSync(tempHtmlPath, html, 'utf8');

      const printWin = new BrowserWindow({
        width: 1200,
        height: 900,
        show: false,
        webPreferences: {
          nodeIntegration: false,
          contextIsolation: true,
          webSecurity: false
        }
      });

      try {
        await printWin.loadFile(tempHtmlPath);
        await printWin.webContents.executeJavaScript(`window.__docxReady`);
        await printWin.webContents.executeJavaScript(`new Promise(r => setTimeout(r, 200))`);

        const pdfBuffer = await printWin.webContents.printToPDF({
          pageSize: options.pageSize === 'Letter' ? 'Letter' : 'A4',
          landscape: options.orientation === 'landscape',
          printBackground: true,
          preferCSSPageSize: true,
          margins: { top: 0, bottom: 0, left: 0, right: 0 }
        });
        return Buffer.from(pdfBuffer);
      } finally {
        if (!printWin.isDestroyed()) printWin.close();
        cleanupTempDir(tempDir);
      }
    } catch (previewErr) {
      console.warn('docx-preview falhou, usando Mammoth fallback:', previewErr.message);
    }
  }

  // Fallback Mammoth + Chromium printToPDF
  const result = await mammoth.convertToHtml({
    path: docxPath,
    convertImage: mammoth.images.imgElement((image) =>
      image.read('base64').then((imageBuffer) => ({
        src: `data:${image.contentType};base64,${imageBuffer}`
      }))
    )
  });

  const styledHtml = buildDocumentHtmlWrapper(result.value, {
    title: path.basename(docxPath),
    fontFamily: `'Calibri', 'Segoe UI', 'Arial', sans-serif`
  });

  return await renderHtmlToPdfViaChromium(styledHtml, options, path.dirname(docxPath));
}

/**
 * Fallback para arquivos .RTF (Rich Text Format / WordPad / Notes) quando Word/LibreOffice não estão instalados
 */
async function convertRtfViaChromium(rtfPath, options) {
  const raw = readTextSmartEncoding(rtfPath);

  // Converte controles RTF básicos (\par, \line, \tab, \b, \i, \ul, \'xx hex characters e Unicode \uN)
  let htmlBody = raw;
  // Remove grupos de cabeçalho RTF não-visíveis ({\fonttbl...}, {\colortbl...}, {\stylesheet...}, {\info...})
  let clean = htmlBody
    .replace(/\{\\fonttbl[\s\S]*?\}/gi, '')
    .replace(/\{\\colortbl[\s\S]*?\}/gi, '')
    .replace(/\{\\\*?\\stylesheet[\s\S]*?\}/gi, '')
    .replace(/\{\\info[\s\S]*?\}/gi, '')
    .replace(/\{\\\*\\[a-z0-9]+[\s\S]*?\}/gi, '');

  // Decodifica caracteres hexadecimais \'xx (Windows-1252)
  clean = clean.replace(/\\'([0-9a-fA-F]{2})/g, (_, hex) => {
    const code = parseInt(hex, 16);
    try {
      return new TextDecoder('windows-1252').decode(new Uint8Array([code]));
    } catch {
      return String.fromCharCode(code);
    }
  });

  // Decodifica Unicode \uN?
  clean = clean.replace(/\\u(-?\d+)\??/g, (_, num) => {
    let code = parseInt(num, 10);
    if (code < 0) code += 65536;
    return String.fromCodePoint(code);
  });

  clean = escapeHtml(clean)
    .replace(/\\par\b\s*/g, '\n')
    .replace(/\\line\b\s*/g, '\n')
    .replace(/\\tab\b\s*/g, '\t')
    .replace(/\\[a-zA-Z]+-?\d*\s?/g, '')
    .replace(/[{}]/g, '')
    .trim();

  const html = buildNoteTextHtml(clean, path.basename(rtfPath));
  return await renderHtmlToPdfViaChromium(html, options);
}

/**
 * Fallback para arquivos .ODT (OpenDocument Text) extraindo content.xml via JSZip
 */
async function convertOdtViaChromium(odtPath, options) {
  const data = fs.readFileSync(odtPath);
  const zip = await JSZip.loadAsync(data);
  const contentFile = zip.file('content.xml');
  if (!contentFile) {
    throw new Error('Arquivo ODT inválido (content.xml ausente).');
  }
  const xml = await contentFile.async('string');

  // Converte tags ODF principais para HTML semântico
  let htmlBody = xml
    .replace(/[\s\S]*?<office:text[^>]*>/i, '')
    .replace(/<\/office:text>[\s\S]*/i, '')
    .replace(/<text:h[^>]*text:outline-level="(\d)"[^>]*>([\s\S]*?)<\/text:h>/gi, '<h$1>$2</h$1>')
    .replace(/<text:p[^>]*>([\s\S]*?)<\/text:p>/gi, '<p>$1</p>')
    .replace(/<text:list[^>]*>([\s\S]*?)<\/text:list>/gi, '<ul>$1</ul>')
    .replace(/<text:list-item[^>]*>([\s\S]*?)<\/text:list-item>/gi, '<li>$1</li>')
    .replace(/<text:line-break\s*\/>/gi, '<br>')
    .replace(/<text:tab\s*\/>/gi, '&emsp;')
    .replace(/<table:table[^>]*>([\s\S]*?)<\/table:table>/gi, '<table>$1</table>')
    .replace(/<table:table-row[^>]*>([\s\S]*?)<\/table:table-row>/gi, '<tr>$1</tr>')
    .replace(/<table:table-cell[^>]*>([\s\S]*?)<\/table:table-cell>/gi, '<td>$1</td>')
    .replace(/<[^>]+>/g, '');

  const styledHtml = buildDocumentHtmlWrapper(htmlBody, {
    title: path.basename(odtPath),
    fontFamily: `'Segoe UI', 'Calibri', 'Arial', sans-serif`
  });

  return await renderHtmlToPdfViaChromium(styledHtml, options);
}

/**
 * 2. PLANILHAS E DADOS TABULARES (.xlsx, .xls, .xlsm, .xlsb, .ods, .csv, .tsv)
 */
async function convertSpreadsheetToPDF(filePath, ext, options) {
  // Para ODS e CSV, utiliza direto o motor SheetJS integrado para conversão instantânea
  if (ext === '.ods' || ext === '.csv' || ext === '.tsv') {
    // Segue para o Tier 3 SheetJS abaixo
  } else if (process.platform === 'win32' && ['.xlsx', '.xls', '.xlsm', '.xlsb'].includes(ext)) {
    // Para planilhas nativas do Excel no Windows, tenta Microsoft Excel COM primeiro
    try {
      return await convertViaMicrosoftOfficeCOM(filePath, 'excel', options);
    } catch (excelErr) {
      console.warn('MS Excel COM falhou ou indisponível, tentando próximo motor:', excelErr.message);
    }
  }

  // Tier 2: LibreOffice Headless
  if (['.xlsx', '.xls', '.xlsm', '.xlsb'].includes(ext)) {
    try {
      return await convertViaLibreOffice(filePath);
    } catch (loErr) {
      console.warn('LibreOffice indisponível para planilha, usando renderizador HTML/Chromium:', loErr.message);
    }
  }

  // Tier 3: Renderizador rico de tabelas via SheetJS (xlsx) + Chromium printToPDF
  let workbook;
  if (ext === '.csv' || ext === '.tsv') {
    const rawText = readTextSmartEncoding(filePath);
    workbook = xlsx.read(rawText, { type: 'string', raw: false });
  } else {
    workbook = xlsx.readFile(filePath, {
      cellStyles: true,
      cellNF: true,
      cellDates: true
    });
  }

  let sheetsHtml = '';
  let maxColumnsAcrossSheets = 0;

  workbook.SheetNames.forEach((sheetName, idx) => {
    const sheet = workbook.Sheets[sheetName];
    if (!sheet || !sheet['!ref']) return;

    const range = xlsx.utils.decode_range(sheet['!ref']);
    const colCount = range.e.c - range.s.c + 1;
    if (colCount > maxColumnsAcrossSheets) maxColumnsAcrossSheets = colCount;

    const tableHtml = xlsx.utils.sheet_to_html(sheet, { id: `sheet-${idx}`, editable: false });
    // Extrai apenas a tag <table>...</table> gerada pelo SheetJS
    const tableMatch = tableHtml.match(/<table[\s\S]*?<\/table>/i);
    if (tableMatch) {
      sheetsHtml += `
        <section class="sheet-section ${idx > 0 ? 'page-break' : ''}">
          ${workbook.SheetNames.length > 1 ? `<div class="sheet-header">${escapeHtml(sheetName)}</div>` : ''}
          <div class="table-wrap">${tableMatch[0]}</div>
        </section>
      `;
    }
  });

  if (!sheetsHtml) {
    sheetsHtml = `<p class="empty-notice">Planilha vazia.</p>`;
  }

  const effectiveOrientation =
    options.orientation !== 'auto'
      ? options.orientation
      : (maxColumnsAcrossSheets > 6 ? 'landscape' : 'portrait');

  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <style>
    @page {
      size: ${options.pageSize === 'Letter' ? 'Letter' : 'A4'} ${effectiveOrientation};
      margin: 12mm;
    }
    * { box-sizing: border-box; }
    body {
      font-family: 'Calibri', 'Segoe UI', Arial, sans-serif;
      font-size: 9.5pt;
      line-height: 1.35;
      color: #0f172a;
      background: #ffffff;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .sheet-section.page-break {
      page-break-before: always;
      break-before: page;
    }
    .sheet-header {
      font-size: 12pt;
      font-weight: 700;
      color: #1e293b;
      padding-bottom: 6pt;
      margin-bottom: 8pt;
      border-bottom: 2px solid #cbd5e1;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      table-layout: auto;
      font-size: ${maxColumnsAcrossSheets > 10 ? '7.5pt' : '9pt'};
    }
    th, td {
      border: 1px solid #cbd5e1;
      padding: 4pt 6pt;
      vertical-align: middle;
      overflow-wrap: break-word;
      word-break: break-word;
    }
    tr:first-child td, th {
      background-color: #f1f5f9;
      font-weight: 700;
      color: #0f172a;
    }
    tr:nth-child(even) td {
      background-color: #f8fafc;
    }
    tr {
      page-break-inside: avoid;
      break-inside: avoid;
    }
  </style>
</head>
<body>
  ${sheetsHtml}
</body>
</html>`;

  return await renderHtmlToPdfViaChromium(html, {
    ...options,
    orientation: effectiveOrientation,
    preferCSSPageSize: true
  });
}

/**
 * 3. APRESENTAÇÕES DE SLIDES (.pptx, .ppt, .ppsx, .pps, .odp)
 */
async function convertPresentationToPDF(filePath, ext, options) {
  // Tier 1: Microsoft PowerPoint COM no Windows — 100% fidelidade
  if (process.platform === 'win32') {
    try {
      return await convertViaMicrosoftOfficeCOM(filePath, 'powerpoint', options);
    } catch (pptErr) {
      console.warn('MS PowerPoint COM falhou ou indisponível, tentando próximo motor:', pptErr.message);
    }
  }

  // Tier 2: LibreOffice Headless
  try {
    return await convertViaLibreOffice(filePath);
  } catch (loErr) {
    console.warn('LibreOffice indisponível para slides, tentando extrator OOXML:', loErr.message);
  }

  // Tier 3: Extrator OOXML para .pptx / .ppsx via JSZip + Chromium printToPDF
  if (ext === '.pptx' || ext === '.ppsx' || ext === '.pptm') {
    return await convertPptxViaChromiumFallback(filePath);
  }

  throw new Error(`Para converter apresentações ${ext} sem Microsoft PowerPoint ou LibreOffice, salve como .pptx ou instale o PowerPoint / LibreOffice.`);
}

async function convertPptxViaChromiumFallback(pptxPath) {
  const data = fs.readFileSync(pptxPath);
  const zip = await JSZip.loadAsync(data);

  const slideFiles = Object.keys(zip.files)
    .filter(name => /^ppt\/slides\/slide\d+\.xml$/i.test(name))
    .sort((a, b) => {
      const na = parseInt(a.match(/slide(\d+)\.xml/i)[1], 10);
      const nb = parseInt(b.match(/slide(\d+)\.xml/i)[1], 10);
      return na - nb;
    });

  if (slideFiles.length === 0) {
    throw new Error('Nenhum slide encontrado no arquivo PPTX.');
  }

  let slidesHtml = '';
  for (let i = 0; i < slideFiles.length; i++) {
    const slideXml = await zip.file(slideFiles[i]).async('string');
    const paragraphs = [];
    const pMatches = slideXml.match(/<a:p\b[\s\S]*?<\/a:p>/gi) || [];
    for (const pXml of pMatches) {
      const texts = [];
      const tMatches = pXml.match(/<a:t>([\s\S]*?)<\/a:t>/gi) || [];
      for (const tXml of tMatches) {
        texts.push(tXml.replace(/<\/?a:t>/gi, ''));
      }
      const line = texts.join('').trim();
      if (line) paragraphs.push(line);
    }

    const title = paragraphs[0] || `Slide ${i + 1}`;
    const bodyItems = paragraphs.slice(1);

    slidesHtml += `
      <section class="slide">
        <div class="slide-inner">
          <h1 class="slide-title">${title}</h1>
          <div class="slide-body">
            ${bodyItems.map(item => `<p class="slide-p">${item}</p>`).join('')}
          </div>
          <div class="slide-footer">${i + 1} / ${slideFiles.length}</div>
        </div>
      </section>
    `;
  }

  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <style>
    @page { size: 297mm 167mm; margin: 0; }
    * { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; background: #fff; font-family: 'Segoe UI', 'Calibri', sans-serif; }
    .slide {
      width: 297mm;
      height: 167mm;
      padding: 18mm 22mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      page-break-after: always;
      break-after: page;
      background: #ffffff;
      color: #0f172a;
      position: relative;
    }
    .slide:last-child { page-break-after: auto; break-after: auto; }
    .slide-title { font-size: 26pt; font-weight: 700; color: #1e293b; margin: 0 0 12mm 0; }
    .slide-body { flex: 1; font-size: 15pt; line-height: 1.5; color: #334155; }
    .slide-p { margin: 0 0 5mm 0; }
    .slide-footer { font-size: 10pt; color: #64748b; text-align: right; }
  </style>
</head>
<body>${slidesHtml}</body>
</html>`;

  return await renderHtmlToPdfViaChromium(html, {
    orientation: 'landscape',
    margin: 'none',
    preferCSSPageSize: true
  });
}

/**
 * 4. NOTAS E ARQUIVOS DE TEXTO (.txt, .note, .notes, .log, etc.)
 * Preserva 100% das quebras de linha, múltiplos espaços, tabulações, acentuação, listas,
 * tabelas ASCII e emojis, sem nunca cortar linhas longas nem sobrepor páginas!
 */
async function convertNoteTextToPDF(filePath, options) {
  const text = readTextSmartEncoding(filePath);
  const html = buildNoteTextHtml(text, path.basename(filePath));
  return await renderHtmlToPdfViaChromium(html, options, path.dirname(filePath));
}

function buildNoteTextHtml(text, fileName) {
  // Normaliza quebras de linha CRLF -> LF mantendo todas as linhas em branco e espaços originais
  const normalized = String(text || '').replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  // Detecta se a nota usa fonte monoespaçada (ex: tabelas ASCII, recibos, logs) ou prosa/notas comuns
  const hasAsciiBoxOrColumns = /[┌┬┐├┼┤└┴┘│─╔╦╗╠╬╣╚╩╝║═]|\t.*\t/.test(normalized);
  const fontStack = hasAsciiBoxOrColumns
    ? `'Cascadia Mono', 'Consolas', 'Courier New', monospace`
    : `'Segoe UI', -apple-system, BlinkMacSystemFont, 'Calibri', Roboto, sans-serif`;

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>${escapeHtml(fileName)}</title>
  <style>
    * { box-sizing: border-box; }
    html, body {
      margin: 0;
      padding: 0;
      background: #ffffff;
      color: #111827;
      font-family: ${fontStack};
      font-size: 11pt;
      line-height: 1.55;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .note-content {
      white-space: pre-wrap;
      overflow-wrap: break-word;
      word-break: break-word;
      tab-size: 4;
      -moz-tab-size: 4;
      font-variant-ligatures: none;
      margin: 0;
    }
  </style>
</head>
<body>
  <div class="note-content">${escapeHtml(normalized)}</div>
</body>
</html>`;
}

/**
 * 5. MARKDOWN & NOTAS RICAS (.md, .markdown — Obsidian, Notion, Apple/Bear Notes, GitHub)
 */
async function convertMarkdownToPDF(filePath, options) {
  const { marked } = await import('marked');
  const rawMd = readTextSmartEncoding(filePath);

  // Remove frontmatter YAML se existir no topo da nota (ou transforma em metadados limpos)
  let bodyMd = rawMd;
  let frontmatterHtml = '';
  const fmMatch = rawMd.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (fmMatch) {
    bodyMd = rawMd.slice(fmMatch[0].length);
    const metaLines = fmMatch[1]
      .split(/\r?\n/)
      .filter(l => l.includes(':'))
      .map(l => {
        const idx = l.indexOf(':');
        const k = l.slice(0, idx).trim();
        const v = l.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
        return `<span class="fm-badge"><strong>${escapeHtml(k)}:</strong> ${escapeHtml(v)}</span>`;
      });
    if (metaLines.length > 0) {
      frontmatterHtml = `<div class="frontmatter-bar">${metaLines.join('')}</div>`;
    }
  }

  marked.setOptions({
    gfm: true,
    breaks: true
  });

  const renderedHtml = marked.parse(bodyMd);
  const fullHtml = buildDocumentHtmlWrapper(frontmatterHtml + renderedHtml, {
    title: path.basename(filePath),
    fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Calibri', Roboto, sans-serif`
  });

  return await renderHtmlToPdfViaChromium(fullHtml, options, path.dirname(filePath));
}

function buildDocumentHtmlWrapper(bodyHtml, { title = '', fontFamily = `'Segoe UI', sans-serif` } = {}) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>${escapeHtml(title)}</title>
  <style>
    * { box-sizing: border-box; }
    html, body {
      margin: 0;
      padding: 0;
      font-family: ${fontFamily};
      font-size: 11pt;
      line-height: 1.55;
      color: #111827;
      background: #ffffff;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .frontmatter-bar {
      display: flex;
      flex-wrap: wrap;
      gap: 6pt;
      margin-bottom: 14pt;
      padding-bottom: 10pt;
      border-bottom: 1px solid #e2e8f0;
    }
    .fm-badge {
      font-size: 9pt;
      background: #f1f5f9;
      color: #334155;
      padding: 3pt 7pt;
      border-radius: 4pt;
      border: 1px solid #cbd5e1;
    }
    h1, h2, h3, h4, h5, h6 {
      color: #0f172a;
      font-weight: 700;
      line-height: 1.3;
      page-break-after: avoid;
      break-after: avoid;
    }
    h1 { font-size: 20pt; margin: 0 0 10pt 0; padding-bottom: 4pt; border-bottom: 1px solid #e2e8f0; }
    h2 { font-size: 15.5pt; margin: 16pt 0 8pt 0; }
    h3 { font-size: 13pt; margin: 13pt 0 6pt 0; }
    h4 { font-size: 11.5pt; margin: 10pt 0 4pt 0; }
    p { margin: 0 0 8pt 0; orphans: 3; widows: 3; }
    ul, ol { margin: 0 0 9pt 0; padding-left: 1.6em; }
    li { margin: 3pt 0; }
    li > input[type="checkbox"] {
      margin-right: 6pt;
      transform: scale(1.1);
      vertical-align: middle;
    }
    blockquote {
      margin: 10pt 0;
      padding: 8pt 12pt;
      border-left: 4px solid #3b82f6;
      background: #f8fafc;
      color: #334155;
      border-radius: 0 4pt 4pt 0;
    }
    blockquote p:last-child { margin-bottom: 0; }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 10pt 0;
      font-size: 10pt;
      page-break-inside: auto;
    }
    tr { page-break-inside: avoid; break-inside: avoid; }
    th, td {
      border: 1px solid #cbd5e1;
      padding: 6pt 8pt;
      text-align: left;
      vertical-align: top;
    }
    th {
      background-color: #f1f5f9;
      font-weight: 700;
      color: #0f172a;
    }
    tr:nth-child(even) td { background-color: #f8fafc; }
    code {
      font-family: 'Cascadia Mono', 'Consolas', 'Courier New', monospace;
      font-size: 9.5pt;
      background: #f1f5f9;
      padding: 1.5pt 4pt;
      border-radius: 3pt;
      color: #0f172a;
    }
    pre {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      padding: 10pt 12pt;
      border-radius: 6pt;
      white-space: pre-wrap;
      overflow-wrap: break-word;
      font-size: 9pt;
      line-height: 1.45;
      margin: 10pt 0;
      page-break-inside: avoid;
    }
    pre code { background: none; padding: 0; border: none; }
    img {
      max-width: 100%;
      height: auto;
      display: block;
      margin: 10pt auto;
      page-break-inside: avoid;
    }
    hr {
      border: none;
      border-top: 1px solid #cbd5e1;
      margin: 14pt 0;
    }
    a { color: #2563eb; text-decoration: underline; }
  </style>
</head>
<body>
  ${bodyHtml}
</body>
</html>`;
}

/**
 * 6. ARQUIVOS HTML / WEB (.html, .htm, .xhtml, .mhtml)
 * Carrega diretamente no motor Chromium do Electron para manter 100% do CSS, fontes,
 * imagens relativas e layout da página.
 */
async function convertHtmlFileToPDF(filePath, options) {
  const printWin = new BrowserWindow({
    width: 1200,
    height: 900,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: false
    }
  });

  try {
    await printWin.loadFile(filePath);
    await printWin.webContents.executeJavaScript(`
      Promise.all([
        document.fonts ? document.fonts.ready : Promise.resolve(),
        ...Array.from(document.images).map(img => {
          if (img.complete) return Promise.resolve();
          return new Promise(res => { img.onload = res; img.onerror = res; });
        })
      ]).then(() => new Promise(r => setTimeout(r, 150)));
    `);

    const pdfBuffer = await printWin.webContents.printToPDF({
      pageSize: options.pageSize === 'Letter' ? 'Letter' : 'A4',
      landscape: options.orientation === 'landscape',
      printBackground: true,
      preferCSSPageSize: true,
      margins: getPrintMargins(options.margin)
    });

    return Buffer.from(pdfBuffer);
  } finally {
    if (!printWin.isDestroyed()) printWin.close();
  }
}

/**
 * 7. CÓDIGO-FONTE E DADOS ESTRUTURADOS (.json, .xml, .yaml, .sql, .js, .ts, .py, etc.)
 */
async function convertCodeOrStructuredToPDF(filePath, ext, options) {
  let raw = readTextSmartEncoding(filePath);

  if (ext === '.json') {
    try {
      raw = JSON.stringify(JSON.parse(raw), null, 2);
    } catch {
      // Mantém original se não for JSON estrito (ex: JSONC)
    }
  }

  const lines = raw.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
  const numberedRows = lines
    .map((line, i) => `<tr><td class="ln">${i + 1}</td><td class="lc">${escapeHtml(line) || ' '}</td></tr>`)
    .join('');

  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 0;
      background: #ffffff;
      color: #0f172a;
      font-family: 'Cascadia Mono', 'Consolas', 'Courier New', monospace;
      font-size: 9pt;
      line-height: 1.45;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .code-header {
      font-family: 'Segoe UI', sans-serif;
      font-size: 10pt;
      font-weight: 700;
      color: #334155;
      background: #f1f5f9;
      border: 1px solid #cbd5e1;
      border-bottom: none;
      padding: 6pt 10pt;
      border-radius: 6pt 6pt 0 0;
    }
    table.code-table {
      width: 100%;
      border-collapse: collapse;
      border: 1px solid #cbd5e1;
    }
    td.ln {
      width: 1%;
      white-space: nowrap;
      text-align: right;
      padding: 1pt 8pt;
      color: #64748b;
      background: #f8fafc;
      border-right: 1px solid #e2e8f0;
      user-select: none;
      vertical-align: top;
    }
    td.lc {
      padding: 1pt 8pt;
      white-space: pre-wrap;
      overflow-wrap: anywhere;
      word-break: break-word;
      tab-size: 4;
      vertical-align: top;
    }
  </style>
</head>
<body>
  <div class="code-header">${escapeHtml(path.basename(filePath))}</div>
  <table class="code-table"><tbody>${numberedRows}</tbody></table>
</body>
</html>`;

  return await renderHtmlToPdfViaChromium(html, options);
}

/**
 * 8. IMAGENS RASTER (.jpg, .jpeg, .png, .gif, .bmp, .webp, .tiff, .avif, .ico)
 * Usa sharp para corrigir rotação EXIF automaticamente e suporta qualquer formato de imagem!
 */
async function convertImageToPDF(imagePath, options = {}) {
  let pngBuffer = null;
  let imgW = 595;
  let imgH = 842;

  if (sharp) {
    try {
      const imagePipeline = sharp(imagePath, { animated: false }).rotate();
      const metadata = await imagePipeline.metadata();
      pngBuffer = await imagePipeline.png().toBuffer();
      imgW = metadata.width || 595;
      imgH = metadata.height || 842;
    } catch (sharpErr) {
      console.warn('Fallback de sharp para Chromium em convertImageToPDF:', sharpErr.message);
    }
  }

  // Se sharp não estiver disponível no runtime do Electron ou falhar, usa nativeImage / Chromium
  if (!pngBuffer) {
    const { nativeImage } = require('electron');
    const nImg = nativeImage.createFromPath(imagePath);
    if (!nImg.isEmpty()) {
      const size = nImg.getSize();
      imgW = size.width || 595;
      imgH = size.height || 842;
      pngBuffer = nImg.toPNG();
    } else {
      // Renderiza via Chromium (suporta WebP, AVIF, GIF, BMP, TIFF, ICO com orientação EXIF automática via image-orientation: from-image)
      const imgUrl = pathToFileURL(imagePath).href;
      const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #ffffff;
    }
    img {
      max-width: 100%;
      max-height: 100vh;
      width: auto;
      height: auto;
      image-orientation: from-image;
      display: block;
    }
  </style>
</head>
<body><img src="${imgUrl}" alt=""></body>
</html>`;
      return await renderHtmlToPdfViaChromium(html, options);
    }
  }

  const pdfDoc = await PDFDocument.create();
  const embeddedImage = await pdfDoc.embedPng(pngBuffer);

  imgW = embeddedImage.width || imgW;
  imgH = embeddedImage.height || imgH;

  // Se pageSize for 'auto' (Padrão para imagens), cria a página com a proporção exata 1:1 da imagem sem cortes
  if (!options.pageSize || options.pageSize === 'auto') {
    const page = pdfDoc.addPage([imgW, imgH]);
    page.drawImage(embeddedImage, {
      x: 0,
      y: 0,
      width: imgW,
      height: imgH
    });
  } else {
    // Ajusta a imagem dentro de uma página A4 ou Letter mantendo 100% da proporção (aspect ratio)
    const baseDims = options.pageSize === 'Letter' ? [612, 792] : [595.28, 841.89];
    const isLandscape =
      options.orientation === 'landscape' ||
      (options.orientation === 'auto' && imgW > imgH);
    const pageW = isLandscape ? baseDims[1] : baseDims[0];
    const pageH = isLandscape ? baseDims[0] : baseDims[1];

    const pad = options.margin === 'none' ? 0 : (options.margin === 'compact' ? 20 : 36);
    const availW = Math.max(10, pageW - pad * 2);
    const availH = Math.max(10, pageH - pad * 2);
    const scale = Math.min(availW / imgW, availH / imgH);
    const drawW = imgW * scale;
    const drawH = imgH * scale;
    const x = (pageW - drawW) / 2;
    const y = (pageH - drawH) / 2;

    const page = pdfDoc.addPage([pageW, pageH]);
    page.drawImage(embeddedImage, { x, y, width: drawW, height: drawH });
  }

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}

/**
 * 9. GRÁFICOS VETORIAIS (.svg)
 * Renderiza como vetor puro via Chromium para manter curvas e textos infinitamente nítidos.
 */
async function convertSvgToPDF(svgPath, options = {}) {
  const svgContent = readTextSmartEncoding(svgPath);
  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
    }
    svg {
      max-width: 100%;
      max-height: 100vh;
      width: auto;
      height: auto;
    }
  </style>
</head>
<body>${svgContent}</body>
</html>`;

  return await renderHtmlToPdfViaChromium(html, options, path.dirname(svgPath));
}

/**
 * 10. FALLBACK UNIVERSAL PARA ARQUIVOS DESCONHECIDOS
 * Verifica se é um arquivo textual (ex: nota sem extensão ou formato customizado) e converte preservando formatação.
 */
async function convertUnknownFileToPDF(filePath, ext, options) {
  const buf = fs.readFileSync(filePath);
  // Verifica se os primeiros 4KB parecem texto legível (sem bytes nulos excessivos fora de UTF-16)
  const sample = buf.subarray(0, Math.min(buf.length, 4096));
  let nullBytes = 0;
  for (let i = 0; i < sample.length; i++) {
    if (sample[i] === 0) nullBytes++;
  }

  const isLikelyUtf16 =
    (buf.length >= 2 && buf[0] === 0xFF && buf[1] === 0xFE) ||
    (buf.length >= 2 && buf[0] === 0xFE && buf[1] === 0xFF);

  if (isLikelyUtf16 || nullBytes / Math.max(1, sample.length) < 0.05) {
    return await convertNoteTextToPDF(filePath, options);
  }

  // Se for binário, tenta LibreOffice como última alternativa
  try {
    return await convertViaLibreOffice(filePath);
  } catch {
    throw new Error(
      `O formato "${ext || 'desconhecido'}" é um arquivo binário proprietário não suportado diretamente. Use arquivos Word, Notas, Markdown, Excel, PowerPoint, HTML, PDF ou Imagens.`
    );
  }
}

module.exports = {
  convertSingleFileToPdf,
  convertViaMicrosoftOfficeCOM,
  convertViaLibreOffice,
  convertWordOrRichTextToPDF,
  convertSpreadsheetToPDF,
  convertPresentationToPDF,
  convertNoteTextToPDF,
  convertMarkdownToPDF,
  convertHtmlFileToPDF,
  convertCodeOrStructuredToPDF,
  convertImageToPDF,
  convertSvgToPDF,
  convertUnknownFileToPDF,
  getFormatMetadata,
  FORMAT_CATEGORIES
};
