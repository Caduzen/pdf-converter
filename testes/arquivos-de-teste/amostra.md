# Documento de Especificação Markdown

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

```javascript
// Exemplo de código formatado
function calculatePurity(score, total) {
  return ((score / total) * 100).toFixed(2) + '%';
}
console.log('Precisão:', calculatePurity(50, 50));
```
