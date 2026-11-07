const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  selectFile: () => ipcRenderer.invoke('select-file'),
  selectDirectory: (defaultPath) => ipcRenderer.invoke('select-directory', defaultPath),
  savePdf: (defaultName) => ipcRenderer.invoke('save-pdf', defaultName),
  convertToPdf: (filePath, options) => ipcRenderer.invoke('convert-to-pdf', filePath, options),
  mergeToSinglePdf: (filePaths, options) => ipcRenderer.invoke('merge-to-single-pdf', filePaths, options),
  convertBatchSeparate: (filePaths, targetDir, options) => ipcRenderer.invoke('convert-batch-separate', filePaths, targetDir, options),
  optimizePdf: (pdfBuffer) => ipcRenderer.invoke('optimize-pdf', pdfBuffer),
  getFileInfo: (filePath) => ipcRenderer.invoke('get-file-info', filePath),
  savePdfFile: (savePath, pdfBuffer) => ipcRenderer.invoke('save-pdf-file', savePath, pdfBuffer),
  readFileBuffer: (filePath) => ipcRenderer.invoke('read-file-buffer', filePath),
  openPath: (filePath) => ipcRenderer.invoke('open-path', filePath),
  showItemInFolder: (filePath) => ipcRenderer.invoke('show-item-in-folder', filePath),
  openExternal: (url) => ipcRenderer.invoke('open-external', url),
  getSystemLocale: () => ipcRenderer.invoke('get-system-locale')
});
