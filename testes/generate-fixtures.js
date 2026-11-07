const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const JSZip = require('jszip');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

const FIXTURES_DIR = path.join(__dirname, 'arquivos-de-teste');

async function createDocx(filePath) {
  const zip = new JSZip();
  zip.file('[Content_Types].xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>`);

  zip.file('_rels/.rels', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`);

  zip.file('word/document.xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    <w:p>
      <w:pPr><w:pStyle w:val="Heading1"/></w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="36"/><w:color w:val="0D9488"/></w:rPr><w:t>Relatório Técnico Oficial - PDF Converter</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:t>Este documento DOCX de teste valida a preservação fiel de fontes, tabelas, formatações ricas em negrito, itálico e cores corporativas.</w:t></w:r>
    </w:p>
    <w:tbl>
      <w:tblPr>
        <w:tblBorders>
          <w:top w:val="single" w:sz="4" w:space="0" w:color="0D9488"/>
          <w:bottom w:val="single" w:sz="4" w:space="0" w:color="0D9488"/>
        </w:tblBorders>
      </w:tblPr>
      <w:tr>
        <w:tc><w:p><w:r><w:rPr><w:b/></w:rPr><w:t>Módulo</w:t></w:r></w:p></w:tc>
        <w:tc><w:p><w:r><w:rPr><w:b/></w:rPr><w:t>Status</w:t></w:r></w:p></w:tc>
        <w:tc><w:p><w:r><w:rPr><w:b/></w:rPr><w:t>Precisão</w:t></w:r></w:p></w:tc>
      </w:tr>
      <w:tr>
        <w:tc><w:p><w:r><w:t>Motor Word DOCX</w:t></w:r></w:p></w:tc>
        <w:tc><w:p><w:r><w:t>Operacional</w:t></w:r></w:p></w:tc>
        <w:tc><w:p><w:r><w:t>100%</w:t></w:r></w:p></w:tc>
      </w:tr>
    </w:tbl>
    <w:p>
      <w:r><w:rPr><w:i/></w:rPr><w:t>Preservação integral concluída sem perda de formatação.</w:t></w:r>
    </w:p>
  </w:body>
</w:document>`);

  const buf = await zip.generateAsync({ type: 'nodebuffer' });
  fs.writeFileSync(filePath, buf);
}

function createRtf(filePath) {
  const content = `{\\rtf1\\ansi\\deff0
{\\fonttbl{\\f0\\fnil\\fcharset0 Segoe UI;}{\\f1\\fnil\\fcharset0 Consolas;}}
{\\colortbl ;\\red13\\green148\\blue136;\\red30\\green41\\blue59;}
\\viewkind4\\uc1\\pard\\cf1\\b\\f0\\fs32 Documento RTF de Teste Oficial\\cf2\\b0\\fs22\\par
\\par
Este documento testa a compatibilidade de \\b Rich Text Format (RTF)\\b0  com suporte a cores, negrito e fontes estruturadas.\\par
\\par
\\bullet Item 1: Preserva\\'e7\\'e3o de acentua\\'e7\\'e3o e caracteres UTF-8\\par
\\bullet Item 2: Margens e espa\\'e7amento equilibrado\\par
\\bullet Item 3: Convers\\'e3o fiel para PDF de alta defini\\'e7\\'e3o\\par
}`;
  fs.writeFileSync(filePath, content, 'utf8');
}

async function createOdt(filePath) {
  const zip = new JSZip();
  zip.file('mimetype', 'application/vnd.oasis.opendocument.text', { compression: 'STORE' });
  zip.file('META-INF/manifest.xml', `<?xml version="1.0" encoding="UTF-8"?>
<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0">
  <manifest:file-entry manifest:full-path="/" manifest:media-type="application/vnd.oasis.opendocument.text"/>
  <manifest:file-entry manifest:full-path="content.xml" manifest:media-type="text/xml"/>
</manifest:manifest>`);

  zip.file('content.xml', `<?xml version="1.0" encoding="UTF-8"?>
<office:document-content xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0"
  xmlns:text="urn:oasis:names:tc:opendocument:xmlns:text:1.0"
  xmlns:table="urn:oasis:names:tc:opendocument:xmlns:table:1.0">
  <office:body>
    <office:text>
      <text:h text:outline-level="1">Documento OpenDocument ODT - Teste</text:h>
      <text:p>Validação da conversão nativa de arquivos do LibreOffice Writer (.odt) para PDF fiel.</text:p>
      <text:p>Tabela de métricas operacionais:</text:p>
      <table:table table:name="Tabela1">
        <table:table-row>
          <table:table-cell><text:p>Chave</text:p></table:table-cell>
          <table:table-cell><text:p>Valor</text:p></table:table-cell>
        </table:table-row>
        <table:table-row>
          <table:table-cell><text:p>Fidelidade ODT</text:p></table:table-cell>
          <table:table-cell><text:p>100% Nativo</text:p></table:table-cell>
        </table:table-row>
      </table:table>
    </office:text>
  </office:body>
</office:document-content>`);

  const buf = await zip.generateAsync({ type: 'nodebuffer' });
  fs.writeFileSync(filePath, buf);
}

async function createPptx(filePath) {
  const zip = new JSZip();
  zip.file('[Content_Types].xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/ppt/presentation.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"/>
  <Override PartName="/ppt/slides/slide1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>
</Types>`);

  zip.file('_rels/.rels', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="ppt/presentation.xml"/>
</Relationships>`);

  zip.file('ppt/presentation.xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:presentation xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:sldIdLst><p:sldId id="256" r:id="rId1" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"/></p:sldIdLst>
</p:presentation>`);

  zip.file('ppt/_rels/presentation.xml.rels', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide1.xml"/>
</Relationships>`);

  zip.file('ppt/slides/slide1.xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld>
    <p:spTree>
      <p:sp>
        <p:txBody>
          <a:p><a:r><a:t>Apresentação Executiva - Slide 1</a:t></a:r></a:p>
          <a:p><a:r><a:t>Visão Geral da Conversão de Slides PPTX para PDF com Layout 16:9</a:t></a:r></a:p>
          <a:p><a:r><a:t>• Ponto 1: Fidelidade visual preservada</a:t></a:r></a:p>
          <a:p><a:r><a:t>• Ponto 2: Vetores, textos e proporções ajustadas</a:t></a:r></a:p>
        </p:txBody>
      </p:sp>
    </p:spTree>
  </p:cSld>
</p:sld>`);

  const buf = await zip.generateAsync({ type: 'nodebuffer' });
  fs.writeFileSync(filePath, buf);
}

function createSpreadsheets() {
  const wb = xlsx.utils.book_new();
  const wsData = [
    ['Código', 'Produto / Serviço', 'Qtd', 'Preço Unitário (R$)', 'Total (R$)', 'Status'],
    ['PRD-001', 'Licença PDF Converter Enterprise', 15, 149.90, 2248.50, 'Aprovado'],
    ['PRD-002', 'Módulo de Integração Cloud OCR', 8, 89.00, 712.00, 'Aprovado'],
    ['PRD-003', 'Suporte Especializado 24/7', 1, 450.00, 450.00, 'Ativo'],
    ['', '', '', 'Subtotal:', 3410.50, ''],
    ['', '', '', 'Impostos (10%):', 341.05, ''],
    ['', '', '', 'Valor Líquido Total:', 3751.55, 'CONCLUÍDO']
  ];
  const ws = xlsx.utils.aoa_to_sheet(wsData);
  xlsx.utils.book_append_sheet(wb, ws, 'Faturamento 2026');

  // Adiciona segunda aba
  const wsData2 = [
    ['Mês', 'Usuários Ativos', 'Conversões Realizadas', 'Taxa de Sucesso'],
    ['Janeiro', 12450, 45890, '99.98%'],
    ['Fevereiro', 15890, 58200, '99.99%'],
    ['Março', 19430, 71340, '100.00%']
  ];
  const ws2 = xlsx.utils.aoa_to_sheet(wsData2);
  xlsx.utils.book_append_sheet(wb, ws2, 'Métricas Operacionais');

  // Salvar XLSX
  xlsx.writeFile(wb, path.join(FIXTURES_DIR, 'amostra.xlsx'));

  // Salvar XLS (biff8)
  try {
    xlsx.writeFile(wb, path.join(FIXTURES_DIR, 'amostra.xls'), { bookType: 'biff8' });
  } catch (e) {
    console.warn('XLS biff8 fallback:', e.message);
  }

  // Salvar ODS
  try {
    xlsx.writeFile(wb, path.join(FIXTURES_DIR, 'amostra.ods'), { bookType: 'ods' });
  } catch (e) {
    console.warn('ODS write fallback:', e.message);
  }

  // Salvar CSV com dados e acentuação
  const csvContent = `Código;Produto / Serviço;Quantidade;Preço;Total\nPRD-01;Conversor Universal PDF;10;150,00;1500,00\nPRD-02;Módulo de Segurança Máxima;5;220,00;1100,00\nTOTAL;;;R$ 2.600,00;\n`;
  fs.writeFileSync(path.join(FIXTURES_DIR, 'amostra.csv'), csvContent, 'utf8');
}

async function createPdfFixture(filePath) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // A4
  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

  page.drawText('Documento PDF Original de Teste', {
    x: 50,
    y: 780,
    size: 20,
    font: font,
    color: rgb(0.05, 0.58, 0.53) // Teal
  });

  page.drawText('Este arquivo PDF serve de amostra para testes de unificação e otimização.', {
    x: 50,
    y: 740,
    size: 12,
    font: fontRegular,
    color: rgb(0.2, 0.2, 0.2)
  });

  page.drawRectangle({
    x: 50,
    y: 650,
    width: 495,
    height: 60,
    borderColor: rgb(0.05, 0.58, 0.53),
    borderWidth: 1.5,
    color: rgb(0.95, 0.98, 0.98)
  });

  page.drawText('Box de Destaque: Verificação de geometria, vetores e fontes.', {
    x: 65,
    y: 675,
    size: 11,
    font: fontRegular,
    color: rgb(0.1, 0.1, 0.1)
  });

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(filePath, pdfBytes);
}

function createTextAndNoteFixtures() {
  fs.writeFileSync(path.join(FIXTURES_DIR, 'amostra.txt'), 
`=======================================================
BLOCO DE NOTAS / TEXTO PLANO UTF-8 (TESTE)
=======================================================
Data: 07/11/2026
Autor: PDF Converter Engine Suite
Finalidade: Validação de preservação de caracteres acentuados (ã, é, ç, õ, ú),
emojis (🚀, 📄, ⚡, 🛡️, ⭐), tabulações e recuos.

Checklist de Verificação:
  [✓] Recuo com 2 espaços
    [✓] Recuo aninhado com 4 espaços
      [✓] Recuo profundo com 6 espaços
	[✓] Tabulação física real (tab stop)
  [✓] Quebras de linha consecutivas:


Fim do arquivo de teste de notas.`, 'utf8');

  fs.writeFileSync(path.join(FIXTURES_DIR, 'amostra.note'),
`# NOTAS RÁPIDAS & ANOTAÇÕES
-------------------------------------------------------
Assunto: Brainstorming de Arquitetura 2026
Prioridade: Alta
Status: Em Andamento

- Implementar conversores multi-tier com failover gracioso
- Garantir tempo de conversão < 1.5s por arquivo
- Certificar compatibilidade WCAG 2.2 AA em todos os relatórios`, 'utf8');

  fs.writeFileSync(path.join(FIXTURES_DIR, 'amostra.log'),
`2026-11-07 08:00:01.120 [INFO] [SystemInit] Iniciando subsistemas do PDF Converter v1.0.0...
2026-11-07 08:00:01.345 [INFO] [EngineTier] Motores carregados: MS Office COM, LibreOffice, Chromium Native
2026-11-07 08:00:02.012 [DEBUG] [MemoryAudit] Alocação inicial de heap: 42.5 MB (OK)
2026-11-07 08:00:02.500 [INFO] [Ready] Sistema pronto para operações com 100% de disponibilidade.`, 'utf8');
}

function createMarkdownFixture() {
  fs.writeFileSync(path.join(FIXTURES_DIR, 'amostra.md'),
`# Documento de Especificação Markdown

Este documento valida a renderização rica de **Markdown** com títulos, listas, tabelas, blocos de código e citações.

## Recursos Suportados

- **Negrito e Itálico**: Texto com *ênfase elegante* e **destaque forte**.
- **Listas de Tarefas (Checklists)**:
  - [x] Motor de renderização marcado ativado
  - [x] Preservação de estilos e tabelas
  - [x] Numeração de blocos de código

### Tabela Comparativa de Motores

| Motor | Tipo de Arquivo | Taxa de Fidelidade |
| :--- | :--- | :--- |
| **Chromium Native** | HTML, MD, Imagens, Código | 100% Pixel Perfect |
| **Docx-Preview** | Word DOCX / DOCM | 100% Paginação & Layout |
| **SheetJS + CSS** | Excel XLSX, CSV, ODS | 100% Células e Cores |

> **Nota Importante:** Todos os estilos respeitam tipografia com piso mínimo ergonômico e alto contraste visual.

\`\`\`javascript
// Exemplo de código formatado
function calculatePurity(score, total) {
  return ((score / total) * 100).toFixed(2) + '%';
}
console.log('Precisão:', calculatePurity(50, 50));
\`\`\`
`, 'utf8');
}

function createHtmlFixture() {
  fs.writeFileSync(path.join(FIXTURES_DIR, 'amostra.html'),
`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Página Web de Teste - PDF Converter</title>
  <style>
    body {
      font-family: 'Segoe UI', system-ui, sans-serif;
      margin: 2rem;
      color: #0f172a;
      background: #ffffff;
      line-height: 1.6;
    }
    .header {
      border-bottom: 3px solid #0d9488;
      padding-bottom: 1rem;
      margin-bottom: 2rem;
    }
    h1 {
      color: #0d9488;
      margin: 0 0 0.5rem 0;
      font-size: 24px;
    }
    .card-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
      margin-top: 1.5rem;
    }
    .card {
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      padding: 1.25rem;
      background: #f8fafc;
    }
    .badge {
      display: inline-block;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 12px;
      font-weight: bold;
      color: #ffffff;
      background: #0d9488;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 1.5rem;
    }
    th, td {
      border: 1px solid #cbd5e1;
      padding: 0.75rem;
      text-align: left;
    }
    th {
      background: #f1f5f9;
      font-weight: 600;
    }
  </style>
</head>
<body>
  <div class="header">
    <span class="badge">TESTE HTML NATIVO</span>
    <h1>Relatório de Desempenho e Arquitetura Web</h1>
    <p>Validação da conversão de páginas HTML5 com CSS avançado e tabelas.</p>
  </div>

  <div class="card-grid">
    <div class="card">
      <h3>Métricas de Layout</h3>
      <p>Renderização completa de sombras, bordas arredondadas e quebras de página automáticas.</p>
    </div>
    <div class="card">
      <h3>Tipografia e Cores</h3>
      <p>Garantia de que 100% das regras CSS aplicadas na visualização sejam convertidas para PDF.</p>
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th>Módulo</th>
        <th>Especificação</th>
        <th>Resultado</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Motor Chromium</td>
        <td>Blink + Skia PDF Backend</td>
        <td>Excelente (200 OK)</td>
      </tr>
      <tr>
        <td>Resolução</td>
        <td>300 DPI de Impressão</td>
        <td>Alta Definição</td>
      </tr>
    </tbody>
  </table>
</body>
</html>`, 'utf8');
}

function createCodeFixtures() {
  // JSON
  fs.writeFileSync(path.join(FIXTURES_DIR, 'amostra.json'), JSON.stringify({
    projeto: 'PDF Converter Suite',
    versao: '1.0.0',
    status: 'Produção',
    recursos: {
      multiArquivos: true,
      dragAndDrop: true,
      idiomas: 9,
      carteiras: ['PIX', 'Buy Me a Coffee', 'Ko-fi'],
      suporteTier: 'Universal'
    },
    modulosSuportados: [
      { categoria: 'Word', extensoes: ['.docx', '.doc', '.rtf', '.odt'] },
      { categoria: 'Planilhas', extensoes: ['.xlsx', '.xls', '.csv', '.ods'] },
      { categoria: 'Apresentações', extensoes: ['.pptx', '.ppt', '.odp'] },
      { categoria: 'Web e Código', extensoes: ['.html', '.json', '.xml', '.sql', '.js', '.py', '.css'] },
      { categoria: 'Imagens e Vetores', extensoes: ['.png', '.jpg', '.webp', '.svg', '.bmp'] }
    ]
  }, null, 2), 'utf8');

  // XML
  fs.writeFileSync(path.join(FIXTURES_DIR, 'amostra.xml'),
`<?xml version="1.0" encoding="UTF-8"?>
<configuracoesSistema xmlns="http://pdfconverter.app/schema">
  <aplicacao>
    <nome>PDF Converter Universal</nome>
    <versao>1.0.0</versao>
    <ambiente>Producao</ambiente>
  </aplicacao>
  <modulos>
    <modulo id="1" ativo="true">
      <nome>Conversor Word Nativo</nome>
      <prioridade>Alta</prioridade>
    </modulo>
    <modulo id="2" ativo="true">
      <nome>Conversor de Planilhas e Tabelas</nome>
      <prioridade>Alta</prioridade>
    </modulo>
  </modulos>
</configuracoesSistema>`, 'utf8');

  // YAML
  fs.writeFileSync(path.join(FIXTURES_DIR, 'amostra.yaml'),
`# Configuração do Pipeline de Testes e Build
pipeline:
  nome: PDF Converter Test Suite
  ambiente: Windows x64
  passos:
    - nome: Gerar Fixtures de Teste
      comando: node testes/generate-fixtures.js
    - nome: Executar Conversões e Validações
      comando: electron testes/runner.js
    - nome: Verificar Integridade Estrutural
      verificarHeaderPdf: true
      verificarBytes: true
      verificarPaginas: true
  metricas:
    taxaAprovacaoMinima: 100%
`, 'utf8');

  // SQL
  fs.writeFileSync(path.join(FIXTURES_DIR, 'amostra.sql'),
`-- =======================================================
-- Script SQL de Amostra: Estrutura do Catálogo
-- =======================================================

CREATE TABLE IF NOT EXISTS conversions_audit (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    source_format VARCHAR(10) NOT NULL,
    file_size_bytes INT NOT NULL,
    output_pages INT NOT NULL,
    conversion_time_ms INT NOT NULL,
    status VARCHAR(20) DEFAULT 'SUCCESS',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO conversions_audit (source_format, file_size_bytes, output_pages, conversion_time_ms, status)
VALUES 
    ('.docx', 45020, 2, 420, 'SUCCESS'),
    ('.xlsx', 89200, 3, 510, 'SUCCESS'),
    ('.md', 12340, 1, 150, 'SUCCESS'),
    ('.html', 24100, 1, 230, 'SUCCESS');

SELECT 
    source_format,
    COUNT(*) as total_conversoes,
    AVG(conversion_time_ms) as tempo_medio_ms,
    SUM(file_size_bytes) as volume_total_bytes
FROM conversions_audit
GROUP BY source_format;
`, 'utf8');

  // JavaScript
  fs.writeFileSync(path.join(FIXTURES_DIR, 'amostra.js'),
`/**
 * Módulo de Demonstração JavaScript
 * Validação de coloração sintática e preservação de recuos
 */
class DocumentValidator {
  constructor(documentName) {
    this.documentName = documentName;
    this.validations = [];
  }

  addCheck(ruleName, fn) {
    this.validations.push({ ruleName, fn });
    return this;
  }

  async runAll(context) {
    const results = [];
    for (const { ruleName, fn } of this.validations) {
      const pass = await fn(context);
      results.push({ ruleName, pass });
    }
    return results;
  }
}

module.exports = { DocumentValidator };
`, 'utf8');

  // Python
  fs.writeFileSync(path.join(FIXTURES_DIR, 'amostra.py'),
`"""
Módulo de Amostra Python para Conversão Fiel em PDF.
Preserva docstrings, funções, tipagem e indentação.
"""
from typing import List, Dict, Any

class ConversionReport:
    def __init__(self, suite_name: str) -> None:
        self.suite_name: str = suite_name
        self.results: List[Dict[str, Any]] = []

    def record_test(self, test_name: str, passed: bool, duration_ms: float) -> None:
        self.results.append({
            "name": test_name,
            "passed": passed,
            "duration_ms": duration_ms
        })

    def summary(self) -> Dict[str, Any]:
        total = len(self.results)
        passed = sum(1 for r in self.results if r["passed"])
        return {
            "total": total,
            "passed": passed,
            "success_rate": f"{(passed / total * 100):.1f}%" if total > 0 else "0.0%"
        }

if __name__ == "__main__":
    report = ConversionReport("Universal PDF Tests")
    report.record_test("Markdown Test", True, 120.5)
    print(report.summary())
`, 'utf8');

  // CSS
  fs.writeFileSync(path.join(FIXTURES_DIR, 'amostra.css'),
`/* ========================================================
   Design System Stylesheet de Teste
   ======================================================== */
:root {
  --primary-teal: #0D9488;
  --primary-hover: #14B8A6;
  --surface-dark: #0F172A;
  --text-main: #FFFFFF;
  --text-muted: #94A3B8;
  --font-base: 1rem;
}

.pdf-preview-box {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 1.5rem;
  background-color: var(--surface-dark);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.4);
}
`, 'utf8');
}

function createImageAndVectorFixtures() {
  // SVG
  fs.writeFileSync(path.join(FIXTURES_DIR, 'amostra.svg'),
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0D9488;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#2DD4BF;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1E293B;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0F172A;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <rect width="100%" height="100%" fill="url(#cardGrad)"/>
  
  <circle cx="400" cy="220" r="110" fill="url(#grad1)" opacity="0.9" />
  
  <polygon points="400,140 470,260 330,260" fill="#FFFFFF" />
  
  <text x="400" y="380" font-family="Segoe UI, sans-serif" font-size="28" font-weight="bold" fill="#FFFFFF" text-anchor="middle">
    Vetor SVG Gráfico de Alta Fidelidade
  </text>
  
  <text x="400" y="420" font-family="Segoe UI, sans-serif" font-size="16" fill="#94A3B8" text-anchor="middle">
    Preservação milimétrica de curvas, gradientes e formas vetoriais no PDF
  </text>
  
  <rect x="250" y="460" width="300" height="44" rx="8" fill="url(#grad1)"/>
  <text x="400" y="488" font-family="Segoe UI, sans-serif" font-size="14" font-weight="bold" fill="#042F2E" text-anchor="middle">
    CONVERSÃO VETORIAL IMPECÁVEL
  </text>
</svg>`, 'utf8');

  // Copia o PNG do projeto se existir
  const projectPng = path.join(__dirname, '..', 'icon.png');
  if (fs.existsSync(projectPng)) {
    fs.copyFileSync(projectPng, path.join(FIXTURES_DIR, 'amostra.png'));
  }

  // Gera BMP simples 100x100 de teste caso necessário
  const bmpHeader = Buffer.alloc(54);
  bmpHeader.write('BM', 0); // Signature
  const fileSize = 54 + 100 * 100 * 3;
  bmpHeader.writeInt32LE(fileSize, 2);
  bmpHeader.writeInt32LE(54, 10); // Offset to image data
  bmpHeader.writeInt32LE(40, 14); // Header size
  bmpHeader.writeInt32LE(100, 18); // Width
  bmpHeader.writeInt32LE(100, 22); // Height
  bmpHeader.writeInt16LE(1, 26);  // Color planes
  bmpHeader.writeInt16LE(24, 28); // Bits per pixel (24-bit RGB)
  bmpHeader.writeInt32LE(0, 30);  // Compression (BI_RGB)
  bmpHeader.writeInt32LE(100 * 100 * 3, 34); // Image size

  const bmpPixels = Buffer.alloc(100 * 100 * 3);
  for (let i = 0; i < 100 * 100 * 3; i += 3) {
    bmpPixels[i] = 136;     // Blue (BGR format)
    bmpPixels[i + 1] = 148; // Green
    bmpPixels[i + 2] = 13;  // Red (Teal shade)
  }
  fs.writeFileSync(path.join(FIXTURES_DIR, 'amostra.bmp'), Buffer.concat([bmpHeader, bmpPixels]));
}

async function main() {
  console.log('Gerando fixtures de teste oficiais para todos os formatos...');
  if (!fs.existsSync(FIXTURES_DIR)) fs.mkdirSync(FIXTURES_DIR, { recursive: true });

  await createDocx(path.join(FIXTURES_DIR, 'amostra.docx'));
  createRtf(path.join(FIXTURES_DIR, 'amostra.rtf'));
  await createOdt(path.join(FIXTURES_DIR, 'amostra.odt'));
  await createPptx(path.join(FIXTURES_DIR, 'amostra.pptx'));
  createSpreadsheets();
  await createPdfFixture(path.join(FIXTURES_DIR, 'amostra.pdf'));
  createTextAndNoteFixtures();
  createMarkdownFixture();
  createHtmlFixture();
  createCodeFixtures();
  createImageAndVectorFixtures();

  console.log('Todas as fixtures foram geradas com sucesso em:', FIXTURES_DIR);
}

main().catch(err => {
  console.error('Erro ao gerar fixtures:', err);
  process.exit(1);
});
