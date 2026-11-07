# Catálogo Técnico — PDF Converter Studio

**Versão**: 1.0.0  
**Arquitetura**: Desktop Cross-Platform (Electron + Chromium Engine + Native Fallbacks)  
**Licença**: PolyForm Noncommercial 1.0.0  
**Desenvolvedor & Mantenedor**: Caduzen (`cscarlinhos@hotmail.com`)  
**Página Oficial de Doações Globais**: [https://www.buymeacoffee.com/cscarlinhos](https://www.buymeacoffee.com/cscarlinhos) | [https://ko-fi.com/cscarlinhos](https://ko-fi.com/cscarlinhos)

---

## 1. Visão Geral do Sistema
O **PDF Converter** é uma aplicação desktop de alta fidelidade desenvolvida para converter qualquer documento, nota, planilha, apresentação ou imagem para PDF sem distorções visuais e sem perda de formatação original.

---

## 2. Catálogo de Formatos Suportados

| Categoria | Extensões | Motor Primário | Motor Secundário / Fallback | Garantia de Fidelidade |
| :--- | :--- | :--- | :--- | :--- |
| **Word & Texto Rico** | `.docx`, `.doc`, `.docm`, `.dotx`, `.rtf`, `.odt` | Microsoft Word COM (`ExportAsFixedFormat`) | LibreOffice Headless / `docx-preview` + Chromium | 100% de fontes, tabelas, cabeçalhos, rodapés e numeração de páginas. |
| **Notas & Texto Puro** | `.txt`, `.note`, `.notes`, `.log`, `.ini`, `.cfg`, `.env`, `.srt`, `.tex` | Smart UTF-8/UTF-16LE/BOM Decoder + Chromium Pre-wrap | `pdf-lib` stream buffer | Preserva recuos, quebras de linha exatas, acentuação em português, emojis e tabelas ASCII sem cortes. |
| **Markdown Estruturado** | `.md`, `.markdown`, `.mdown` | `marked` (GFM completo) + Frontmatter Parser + Chromium | HTML Engine | Suporta tabelas, checklists interativos (`- [x]`), blocos de código com syntax box e citações. |
| **Planilhas & Dados** | `.xlsx`, `.xls`, `.xlsm`, `.xlsb`, `.ods`, `.csv`, `.tsv` | Microsoft Excel COM (`ExportAsFixedFormat` otimizado) | SheetJS (`xlsx`) + Chromium Table Renderer | Mantém cores, bordas de células, células mescladas e auto-orientação para paisagem em tabelas largas. |
| **Apresentações** | `.pptx`, `.ppt`, `.ppsx`, `.pps`, `.odp` | Microsoft PowerPoint COM (`SaveAs` PDF) | LibreOffice Headless / JSZip OOXML Slide Extractor | Proporção widescreen 16:9 ou 4:3 preservada em slides sequenciais. |
| **Web & Código** | `.html`, `.htm`, `.xhtml`, `.json`, `.xml`, `.yaml`, `.sql`, `.js`, `.ts`, `.py`, `.css` | Chromium Engine nativo (`printToPDF`) | Pretty-Print Code Table | Renderização web completa (CSS e imagens relativas) ou numeração de linhas monoespaçada. |
| **Imagens & Vetores** | `.png`, `.jpg`, `.jpeg`, `.webp`, `.bmp`, `.gif`, `.tiff`, `.avif`, `.svg`, `.ico` | Sharp Lossless + Chromium Vector Renderer | `pdf-lib` PNG Embedder | Auto-orientação por metadados EXIF e proporção 1:1 sem distorção. |
| **PDF Existente** | `.pdf` | `pdf-lib` Structural Engine | Stream Optimizer | Compressão estrutural (`useObjectStreams`) e remoção de metadados pesados. |

---

## 3. Catálogo de Recursos da Interface (UI/UX)

- **Suporte Multilíngue Global (9 Idiomas)**:
  - 🇺🇸 Inglês (`en`)
  - 🇧🇷 Português do Brasil (`pt-BR`)
  - 🇵🇹 Português de Portugal (`pt-PT`)
  - 🇪🇸 Espanhol (`es`)
  - 🇫🇷 Francês (`fr`)
  - 🇩🇪 Alemão (`de`)
  - 🇷🇺 Russo (`ru`)
  - 🇨🇳 Chinês Simplificado (`zh-CN`)
  - 🇯🇵 Japonês (`ja`)
  - *Detecção automática do idioma do computador no primeiro uso e seletor persistente no topo de todas as telas.*
- **Gerenciador de Múltiplos Arquivos**:
  - Seleção simultânea de arquivos e botão `+ Adicionar Mais`.
  - Modo 1: **Juntar em 1 PDF só** (Mesclagem na ordem definida pelo usuário).
  - Modo 2: **Manter arquivos separados** (Conversão em lote salva na pasta de destino).
- **Reordenação Tátil Arrastável (Estilo Celular Android)**:
  - Cards com alças de arraste (`⋮⋮`), badges de numeração `#1`, `#2`... e botões táteis de acessibilidade (`▲` e `▼`).
- **Instalador NSIS Profissional & Multilíngue (Windows)**:
  - **Detecção Automática do Idioma do Sistema Operacional**: O instalador detecta a língua do Windows e se apresenta automaticamente no idioma nativo do usuário (9 idiomas suportados: `pt_BR`, `pt_PT`, `en_US`, `es_ES`, `fr_FR`, `de_DE`, `ru_RU`, `zh_CN`, `ja_JP`).
  - **Identidade Visual Corporativa**:
    - Banner lateral clássico de assistente (`installerSidebar.bmp` e `uninstallerSidebar.bmp` de 164 × 314 px com gradiente dark navy/teal e ícone oficial).
    - Cabeçalho superior moderno nas telas internas (`installerHeader.bmp` de 150 × 57 px).
    - Ícones oficiais em alta resolução no executável e desinstalador (`icon.ico`).
  - **Assistente Inteligente de Manutenção**:
    - Detecta automaticamente se o programa já está instalado e abre diálogo traduzido no idioma do usuário:
      - `[ SIM / YES / OUI / JA / 是 / はい ]` → **Reparar / Reinstalar** (atualiza arquivos e atalhos sem perder configurações).
      - `[ NÃO / NO / NON / NEIN / 否 / いいえ ]` → **Remover / Desinstalar** (aciona o desinstalador limpo).
      - `[ CANCELAR / CANCEL / ABBRECHEN / 取消 ]` → Encerra com segurança sem alterar nada.

---

## 4. Catálogo de Canais de Apoio & Doações

| Canal | Tipo / Chave | Finalidade | Status no App |
| :--- | :--- | :--- | :--- |
| **PIX (Brasil)** | QR Code oficial no app (`pix-qrcode.png`) | Doações instantâneas em Real (BRL) para brasileiros | ✅ Ativo e exclusivo no lado esquerdo da Tela 3 |
| **Buy Me a Coffee** | `https://www.buymeacoffee.com/cscarlinhos` | Apoio internacional (Cartão, Apple Pay, Google Pay) | ✅ Ativo com botão dedicado na Tela 3 |
| **Ko-fi** | `https://ko-fi.com/cscarlinhos` | Apoio internacional (Cartões globais e pagamentos locais) | ✅ Ativo com botão dedicado na Tela 3 |
| **Contato / Parcerias** | E-mail: `cscarlinhos@hotmail.com` (oculto) | Parcerias e sugestões com 1 clique (copia + mailto) | ✅ Botão discreto no rodapé do card (sem texto puro do email) |
| **Afdian (爱发电)** | Plataforma chinesa de criadores | Apoio de usuários na China / Ásia (Alipay & WeChat) | ⏳ Certificação de criador submetida (em análise até 3 dias) |
| **Alipay (支付宝)** | QR Code de recebimento internacional | Doações diretas da China e Ásia (RMB) | ⏳ Agendado para configuração |
| **PayPal** | Conta / E-mail | Doações internacionais | ❌ Removido da interface a pedido |

---

## 5. Estrutura de Arquivos do Projeto

```
PROJETO - PDF/
├── .gitignore               # Ignora dependências pesadas e builds
├── CATALOGO.md              # Este catálogo oficial do projeto
├── README.md                # Documentação rápida de execução e build
├── package.json             # Metadados, scripts, dependências e config NSIS
├── installer.nsh            # Script NSIS de manutenção (Instalar, Reparar, Remover)
├── main.js                  # Backend Electron (Processo Principal e Conversores Multi-Tier)
├── preload.js               # Ponte segura de contexto e IPC (contextIsolation: true)
├── index.html               # Interface moderna acessível (WCAG 2.2 AA)
├── styles.css               # Design system fluido (100% em rem, tema escuro de alto contraste)
├── renderer.js              # Lógica de interface, drag & drop reorder e i18n
├── pagina-de-testes.html    # Dashboard visual de testes de todos os formatos na raiz
├── pix-qrcode.png           # QR Code oficial do PIX
├── create-icons.js          # Gerador de ícones binários ICO e ICNS
├── icon.*                   # Ícones oficiais do sistema (.png, .ico, .icns, .svg)
└── testes/                  # Suíte completa e automatizada de testes
    ├── index.html           # Página de testes (dashboard visual)
    ├── generate-fixtures.js # Gerador de arquivos reais para cada extensão
    ├── runner.js            # Executor automatizado com validação estrutural profunda
    ├── resultado-testes.json# Relatório consolidado com métricas, páginas e status
    ├── arquivos-de-teste/   # 24 amostras reais geradas (DOCX, XLSX, PPTX, MD, etc.)
    └── saida-pdf/           # PDFs convertidos e validados com pdf-lib
```

---

## 6. Bateria de Testes Automatizados & Página de Testes

- **Execução dos Testes**: `npm test`
- **Geração de Amostras**: `npm run test:fixtures`
- **Dashboard Visual**: [pagina-de-testes.html](pagina-de-testes.html) ou [testes/index.html](testes/index.html)
- **Status Geral**: **100% APROVADO (26/26 Testes Concluídos com Sucesso)**:
  - **Word & Texto Rico**: `.docx` (PASS), `.rtf` (PASS), `.odt` (PASS)
  - **Planilhas & Tabelas**: `.xlsx` (PASS), `.xls` (PASS), `.csv` (PASS), `.ods` (PASS)
  - **Apresentações**: `.pptx` (PASS)
  - **Bloco de Notas & Texto**: `.txt` (PASS), `.note` (PASS), `.log` (PASS)
  - **Markdown**: `.md` (PASS)
  - **Web & Código**: `.html` (PASS), `.json` (PASS), `.xml` (PASS), `.yaml` (PASS), `.sql` (PASS), `.js` (PASS), `.py` (PASS), `.css` (PASS)
  - **Imagens & Vetores**: `.png` (PASS), `.svg` (PASS), `.bmp` (PASS)
  - **PDF & Otimização**: `.pdf` (PASS)
  - **Multi-Arquivo Unificado (Merge)**: 4 arquivos (MD, TXT, HTML, SVG) combinados em 1 PDF de 4 páginas (PASS)
  - **Multi-Arquivo Separado (Batch)**: 3 arquivos (JSON, SQL, PY) gerados separadamente em lote (PASS)
- **Critérios de Validação**:
  - Cabeçalho mágico `%PDF-` íntegro em todos os arquivos gerados.
  - Carregamento e validação geométrica via `pdf-lib` (verificação de largura, altura e contagem de páginas > 0).
  - Tolerância a falhas (failover gracioso com timeout de 6s para COM, acionando automaticamente os motores integrados Chromium e SheetJS sem travar a interface).
