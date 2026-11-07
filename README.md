# PDF Converter v1.0.0 — Conversor Universal de Alta Fidelidade

[![Baixar Instalador Windows (.exe)](https://img.shields.io/badge/Download-Windows%20Setup%20(.exe)-0078D4?style=for-the-badge&logo=windows&logoColor=white)](https://github.com/Caduzen/pdf-converter/releases/download/v1.0.0/PDF.Converter.Setup.1.0.0.exe)
[![Ver Todas as Versões](https://img.shields.io/badge/Releases-v1.0.0-238636?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Caduzen/pdf-converter/releases/latest)
[![GitHub stars](https://img.shields.io/github/stars/Caduzen/pdf-converter?style=social)](https://github.com/Caduzen/pdf-converter)
[![License: PolyForm Noncommercial](https://img.shields.io/badge/License-PolyForm%20Noncommercial-blue.svg)](LICENSE)
[![Platform: Windows | macOS | Linux](https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Linux-teal.svg)](#-compatibilidade-multiplataforma)

> 📥 **Download Direto para Windows:**  
> 👉 **[Clique aqui para Baixar o Instalador Oficial (`PDF Converter Setup 1.0.0.exe`)](https://github.com/Caduzen/pdf-converter/releases/download/v1.0.0/PDF.Converter.Setup.1.0.0.exe)**  
> *(Também disponível na barra lateral direita do repositório na seção **Releases**)*

Aplicação desktop profissional multiplataforma (Electron) para converter documentos **Word, Notas, Markdown, Planilhas Excel/CSV, Apresentações PowerPoint, HTML, Código-Fonte e Imagens** para PDF **preservando 100% da formatação original**.

Disponível gratuitamente para uso pessoal, estudo e trabalho sem fins lucrativos. **Venda e revenda estritamente proibidas.**

---

## 🌟 Recursos Principais do Lançamento Oficial v1.0.0

- **Suporte a Múltiplos Arquivos em Lote**:
  - Selecione de 1 a dezenas de arquivos simultaneamente.
  - **Modo 1: Juntar em 1 PDF só (Merge)** — Unifica todos os documentos em um único PDF na ordem que você escolher.
  - **Modo 2: Manter arquivos separados (Batch)** — Converte cada arquivo para o seu respectivo PDF na pasta de saída.
- **Reordenação Tátil Interativa (Estilo App Mobile Android)**:
  - Arraste os cards para cima ou para baixo para definir visualmente a sequência exata das páginas no PDF unificado, com botões de acessibilidade alternativos (`▲` e `▼`).
- **Suporte Global em 9 Idiomas Nativos**:
  - Português (Brasil / Portugal), Inglês, Espanhol, Francês, Alemão, Russo, Chinês Simplificado e Japonês.
  - Detecção automática da linguagem do sistema com seletor persistente.
- **Conversores Multi-Tier com Alta Disponibilidade**:
  - **Word / ODT / RTF (`.docx`, `.rtf`, `.odt`)**: Preserva cabeçalhos, rodapés, tabelas, fontes e paginação.
  - **Planilhas (`.xlsx`, `.xls`, `.ods`, `.csv`)**: Tabelas com células mescladas, cores, bordas e quebras automáticas.
  - **Slides (`.pptx`, `.odp`)**: Renderização 16:9 de apresentação com textos e vetores.
  - **Notas & Texto (`.txt`, `.note`, `.log`)**: Detecção inteligente de charset (UTF-8, UTF-16, Latin-1) e preservação exata de espaços, recuos e tabulações.
  - **Markdown (`.md`)**: Suporte completo a títulos, checklists, tabelas e coloração sintática de código.
  - **Código-Fonte & Web (`.html`, `.json`, `.xml`, `.sql`, `.js`, `.py`, `.css`)**: Numeração de linhas, tipografia monoespaçada e realce visual.
  - **Imagens & Vetores (`.png`, `.jpg`, `.webp`, `.svg`, `.bmp`)**: Resolução nítida e proporção 1:1 sem distorção.

---

## 💻 Compatibilidade Multiplataforma

O PDF Converter foi arquitetado com padrões web e motores universais integrados para rodar de forma idêntica e consistente nos três principais sistemas operacionais:

| Sistema Operacional | Suporte | Formatos Gerados | Notas de Instalação |
| :--- | :--- | :--- | :--- |
| **Windows 10 / 11** | ✅ Nativo (100%) | Instalador assistido `.exe` (NSIS) | Detecta idioma e oferece reparo/atualização limpa |
| **macOS (Intel & Apple Silicon)** | ✅ Nativo (100%) | Imagem de disco `.dmg` e `.zip` | Totalmente compatível com arquiteturas x64 e arm64 |
| **Linux (Ubuntu, Debian, Fedora, Arch)** | ✅ Nativo (100%) | Pacotes `.AppImage` e `.deb` | Independente de dependências externas |

*Nota:* Em ambientes sem Microsoft Office (como Linux e macOS), os motores integrados Chromium, SheetJS, docx-preview e JSZip executam a renderização de documentos, planilhas e apresentações com total autonomia. Se o LibreOffice estiver instalado na máquina, ele é detectado automaticamente para conversões ainda mais profundas.

---

## 🎯 Como Executar Localmente

```bash
# 1. Clonar o repositório
git clone https://github.com/Caduzen/pdf-converter.git
cd pdf-converter

# 2. Instalar dependências
npm install

# 3. Iniciar a aplicação
npm start

# 4. Executar bateria de testes (26/26 formatos)
npm test
```

---

## 📦 Gerar Instaladores Oficiais

```bash
# Windows (.exe com assistente NSIS personalizado)
npm run build:win

# Linux (.AppImage e .deb)
npm run build:linux

# macOS (.dmg)
npm run build:mac
```

---

## 🛡️ Aviso de Segurança & Instalação Limpa (Windows SmartScreen / Antivírus)

### 🇧🇷 Em Português:
> **Aviso sobre aviso de tela azul / autorização do Windows:**  
> Por ser um software independente, distribuído de forma **100% gratuita** e de código aberto, o executável de instalação (`.exe`) não possui um certificado digital comercial corporativo da Microsoft (cujo custo anual é de centenas de dólares para empresas).  
> 
> Por este motivo, ao executar o instalador pela primeira vez, o Windows Defender SmartScreen pode exibir um aviso de proteção (*"O Windows protegeu o seu computador - Aplicativo não reconhecido"*).
> 
> - **Zero Vírus, Trojans ou Códigos Maliciosos:** O sistema é totalmente limpo, transparente e seguro.
> - **Código Aberto e Auditável:** Todo o código-fonte está disponível neste repositório para conferência e testes por qualquer programador, pesquisador ou usuário, respeitando os termos da licença não-comercial.
> - **Como prosseguir na instalação:** Basta clicar em **"Mais informações"** e, em seguida, clicar no botão **"Executar assim mesmo"**.

---

### 🇺🇸 In English:
> **Notice regarding Windows SmartScreen / System Warnings:**  
> As an independent, **100% free**, and open project distributed without an expensive corporate Code Signing certificate from Microsoft (which costs hundreds of dollars per year), Windows Defender SmartScreen or other operating systems may display an authorization prompt (*"Windows protected your PC - Unknown Publisher"*).
> 
> - **100% Clean & Safe:** The installer and binary contain **zero viruses, trojans, backdoors, spyware, or malicious components**.
> - **Auditable Source Code:** All source files, build scripts, and test suites are openly available in this repository for verification and security audit by anyone, respecting our non-commercial license.
> - **How to proceed with installation:** Simply click **"More info"** and then select **"Run anyway"**.

---

## ⚖️ Licença de Uso (PolyForm Noncommercial 1.0.0)

Este projeto é protegido por direitos autorais e distribuído sob a **[PolyForm Noncommercial License 1.0.0](LICENSE)**.

- **Permitido:** Uso pessoal, acadêmico, educacional, corporativo interno e sem fins lucrativos de forma 100% gratuita.
- **Estritamente Proibido:** Vender, revender, alugar, sublicenciar ou cobrar por downloads, cópias ou acessos a este programa em qualquer marketplace, site ou mídia física.
- **Consequências Legais:** A violação dos termos e a comercialização não autorizada sujeitam o infrator a medidas judiciais cíveis e criminais por violação de propriedade intelectual (Lei nº 9.609/1998 e Lei nº 9.610/1998 no Brasil, e Convenção de Berna / DMCA internacionalmente).
- **Canal de Denúncias e Parcerias:** `cscarlinhos@hotmail.com`
