// ============================================================================
// DICIONÁRIO COMPLETO DE IDIOMAS (I18N) — 9 IDIOMAS SUPORTADOS
// ============================================================================
const TRANSLATIONS = {
    'pt-BR': {
        title: 'PDF Converter',
        subtitle: 'Converta Word, Notas, Markdown, Planilhas, Slides, HTML e Imagens para PDF sem perder a formatação original',
        starBannerText: 'Obrigado por usar esse sistema! Avalie no git com uma estrela se possível!',
        starBtnText: 'Avaliar com ⭐',
        uploadText: 'Arraste e solte um ou múltiplos arquivos aqui',
        uploadSubtext: 'Preserva fontes, tabelas, recuos, quebras de linha, cores e imagens originais',
        selectFileBtn: 'Selecionar Arquivos',
        addMoreFilesBtn: 'Adicionar Mais',
        clearAllFilesBtn: 'Limpar Todos',
        outputModeTitle: 'Modo de Exportação para Múltiplos Arquivos:',
        modeMergeTitle: 'Juntar em 1 PDF só',
        modeMergeSub: '(Mesclagem na ordem abaixo)',
        modeSeparateTitle: 'Manter arquivos separados',
        modeSeparateSub: '(1 PDF para cada arquivo)',
        reorderHintText: 'Arraste os cards para organizar a ordem das páginas no PDF ou use as setas.',
        labelPageSize: 'Tamanho da Página',
        optPageOriginal: 'Original do Arquivo (Padrão)',
        optPageA4: 'A4 (210 × 297 mm)',
        optPageLetter: 'Carta / Letter (216 × 279 mm)',
        labelOrientation: 'Orientação',
        optOrientAuto: 'Original / Automática',
        optOrientPortrait: 'Retrato (Vertical)',
        optOrientLandscape: 'Paisagem (Horizontal)',
        labelMargin: 'Margens',
        optMarginDefault: 'Original / Padrão',
        optMarginCompact: 'Compacta (10 mm)',
        optMarginNone: 'Sem Margem (0 mm)',
        convertSingleBtn: 'Converter para PDF Fiel',
        convertMergeBtn: 'Juntar e Converter {count} Arquivos em 1 PDF',
        convertSeparateBtn: 'Converter {count} Arquivos Separadamente',
        optimizeBtn: 'Otimizar e Reduzir Tamanho do PDF',
        progressConverting: 'Processando arquivos com fidelidade original...',
        progressMerging: 'Unificando documentos na ordem selecionada...',
        progressOptimizing: 'Otimizando estrutura do PDF sem perda de qualidade...',
        successTitle: 'PDF gerado com sucesso!',
        successBatchTitle: '{count} PDFs gerados com sucesso!',
        successMeta: 'Formatação original preservada',
        openPdfBtn: 'Abrir PDF',
        openFolderBtn: 'Abrir Pasta de Destino',
        showInFolderBtn: 'Mostrar na Pasta',
        newConversionBtn: 'Nova Conversão',
        pixBadge: 'Apoio Solidário',
        pixBadgeSub: 'Projeto Livre & Independente',
        pixCardTitle: 'Se gostou do sistema, nos compre uma coca-cola 🥺',
        pixCardDesc: 'Faça um PIX pelo QR Code ou apoie através das carteiras internacionais abaixo.',
        pixMethodTag: 'Chave PIX (Brasil)',
        intlSupportTag: 'Apoio Internacional (Estrangeiros)',
        pixQrHint: 'Aponte a câmera do celular',
        intlDesc: 'Doe com cartão internacional, Apple Pay ou Google Pay:',
        contactPartnershipText: 'Contato para Parcerias',
        contactCopied: 'E-mail Copiado! ✓',
        errorTitle: 'Não foi possível concluir a conversão',
        retryBtn: 'Voltar e Tentar Novamente',
        footerTitle: 'Formatos suportados com preservação de layout original:',
        badgeWord: 'Word (DOCX, DOC, RTF, ODT)',
        badgeNotes: 'Notas & Texto (TXT, MD, NOTE)',
        badgeSheets: 'Planilhas (XLSX, XLS, CSV, ODS)',
        badgeSlides: 'Slides (PPTX, PPT, ODP)',
        badgeCode: 'Web & Código (HTML, JSON, XML, SQL)',
        badgeImages: 'Imagens (PNG, JPG, WEBP, SVG, TIFF)',
        fileSingular: '1 arquivo',
        filesPlural: '{count} arquivos'
    },
    'pt-PT': {
        title: 'PDF Converter',
        subtitle: 'Converta Word, Notas, Markdown, Folhas de Cálculo, Slides, HTML e Imagens para PDF sem perder a formatação original',
        starBannerText: 'Obrigado por utilizar este sistema! Avalie no git com uma estrela se possível!',
        starBtnText: 'Avaliar com ⭐',
        uploadText: 'Arraste e solte um ou múltiplos ficheiros aqui',
        uploadSubtext: 'Preserva tipos de letra, tabelas, avanços, quebras de linha, cores e imagens originais',
        selectFileBtn: 'Selecionar Ficheiros',
        addMoreFilesBtn: 'Adicionar Mais',
        clearAllFilesBtn: 'Limpar Todos',
        outputModeTitle: 'Modo de Exportação para Múltiplos Ficheiros:',
        modeMergeTitle: 'Juntar num só PDF',
        modeMergeSub: '(Fusão na ordem abaixo)',
        modeSeparateTitle: 'Manter ficheiros separados',
        modeSeparateSub: '(1 PDF para cada ficheiro)',
        reorderHintText: 'Arraste os cartões para ordenar as páginas no PDF ou utilize as setas.',
        labelPageSize: 'Tamanho da Página',
        optPageOriginal: 'Original do Ficheiro (Padrão)',
        optPageA4: 'A4 (210 × 297 mm)',
        optPageLetter: 'Carta / Letter (216 × 279 mm)',
        labelOrientation: 'Orientação',
        optOrientAuto: 'Original / Automática',
        optOrientPortrait: 'Ao Alto (Vertical)',
        optOrientLandscape: 'Ao Baixo (Horizontal)',
        labelMargin: 'Margens',
        optMarginDefault: 'Original / Padrão',
        optMarginCompact: 'Compacta (10 mm)',
        optMarginNone: 'Sem Margem (0 mm)',
        convertSingleBtn: 'Converter para PDF Fiel',
        convertMergeBtn: 'Juntar e Converter {count} Ficheiros num só PDF',
        convertSeparateBtn: 'Converter {count} Ficheiros Separadamente',
        optimizeBtn: 'Otimizar e Reduzir Tamanho do PDF',
        progressConverting: 'A processar ficheiros com fidelidade original...',
        progressMerging: 'A unir documentos na ordem selecionada...',
        progressOptimizing: 'A otimizar estrutura do PDF sem perda de qualidade...',
        successTitle: 'PDF criado com sucesso!',
        successBatchTitle: '{count} PDFs criados com sucesso!',
        successMeta: 'Formatação original preservada',
        openPdfBtn: 'Abrir PDF',
        openFolderBtn: 'Abrir Pasta de Destino',
        showInFolderBtn: 'Mostrar na Pasta',
        newConversionBtn: 'Nova Conversão',
        pixBadge: 'Apoio Solidário',
        pixBadgeSub: 'Projeto Livre & Independente',
        pixCardTitle: 'Se gostou do sistema, compre-nos uma coca-cola 🥺',
        pixCardDesc: 'Faça um PIX pelo QR Code ou apoie através das carteiras internacionais abaixo.',
        pixMethodTag: 'Chave PIX (Brasil)',
        intlSupportTag: 'Apoio Internacional (Estrangeiros)',
        pixQrHint: 'Aponte a câmara do telemóvel',
        intlDesc: 'Doe com cartão internacional, Apple Pay ou Google Pay:',
        contactPartnershipText: 'Contacto para Parcerias',
        contactCopied: 'E-mail Copiado! ✓',
        errorTitle: 'Não foi possível concluir a conversão',
        retryBtn: 'Voltar e Tentar Novamente',
        footerTitle: 'Formatos suportados com preservação de esquema original:',
        badgeWord: 'Word (DOCX, DOC, RTF, ODT)',
        badgeNotes: 'Notas & Texto (TXT, MD, NOTE)',
        badgeSheets: 'Folhas de Cálculo (XLSX, XLS, CSV, ODS)',
        badgeSlides: 'Apresentações (PPTX, PPT, ODP)',
        badgeCode: 'Web & Código (HTML, JSON, XML, SQL)',
        badgeImages: 'Imagens (PNG, JPG, WEBP, SVG, TIFF)',
        fileSingular: '1 ficheiro',
        filesPlural: '{count} ficheiros'
    },
    'en': {
        title: 'PDF Converter',
        subtitle: 'Convert Word, Notes, Markdown, Spreadsheets, Slides, HTML and Images to PDF without losing original formatting',
        starBannerText: 'Thank you for using this system! Please rate it with a star on GitHub if you can!',
        starBtnText: 'Rate with ⭐',
        uploadText: 'Drag and drop one or multiple files here',
        uploadSubtext: 'Preserves fonts, tables, indents, line breaks, colors, and original images',
        selectFileBtn: 'Select Files',
        addMoreFilesBtn: 'Add More',
        clearAllFilesBtn: 'Clear All',
        outputModeTitle: 'Export Mode for Multiple Files:',
        modeMergeTitle: 'Merge into a single PDF',
        modeMergeSub: '(Combined in the order below)',
        modeSeparateTitle: 'Keep files separate',
        modeSeparateSub: '(1 PDF for each file)',
        reorderHintText: 'Drag cards to reorder pages in the combined PDF or use the arrow buttons.',
        labelPageSize: 'Page Size',
        optPageOriginal: 'Original File Size (Default)',
        optPageA4: 'A4 (210 × 297 mm)',
        optPageLetter: 'Letter (216 × 279 mm)',
        labelOrientation: 'Orientation',
        optOrientAuto: 'Original / Automatic',
        optOrientPortrait: 'Portrait (Vertical)',
        optOrientLandscape: 'Landscape (Horizontal)',
        labelMargin: 'Margins',
        optMarginDefault: 'Original / Default',
        optMarginCompact: 'Compact (10 mm)',
        optMarginNone: 'No Margins (0 mm)',
        convertSingleBtn: 'Convert to Faithful PDF',
        convertMergeBtn: 'Merge and Convert {count} Files into 1 PDF',
        convertSeparateBtn: 'Convert {count} Files Separately',
        optimizeBtn: 'Optimize & Reduce PDF Size',
        progressConverting: 'Processing files with original fidelity...',
        progressMerging: 'Merging documents in selected order...',
        progressOptimizing: 'Optimizing PDF structure without quality loss...',
        successTitle: 'PDF generated successfully!',
        successBatchTitle: '{count} PDFs generated successfully!',
        successMeta: 'Original formatting preserved',
        openPdfBtn: 'Open PDF',
        openFolderBtn: 'Open Destination Folder',
        showInFolderBtn: 'Show in Folder',
        newConversionBtn: 'New Conversion',
        pixBadge: 'Community Support',
        pixBadgeSub: 'Free & Independent Project',
        pixCardTitle: 'If you liked this app, buy us a Coke 🥺',
        pixCardDesc: 'Make a PIX donation via QR Code or support via the international wallets below.',
        pixMethodTag: 'PIX Key (Brazil)',
        intlSupportTag: 'International Support (Global)',
        pixQrHint: 'Scan with your mobile camera',
        intlDesc: 'Donate via international card, Apple Pay, or Google Pay:',
        contactPartnershipText: 'Partnership & Contact',
        contactCopied: 'Email Copied! ✓',
        errorTitle: 'Could not complete conversion',
        retryBtn: 'Back and Try Again',
        footerTitle: 'Supported formats with original layout preservation:',
        badgeWord: 'Word (DOCX, DOC, RTF, ODT)',
        badgeNotes: 'Notes & Text (TXT, MD, NOTE)',
        badgeSheets: 'Spreadsheets (XLSX, XLS, CSV, ODS)',
        badgeSlides: 'Slides (PPTX, PPT, ODP)',
        badgeCode: 'Web & Code (HTML, JSON, XML, SQL)',
        badgeImages: 'Images (PNG, JPG, WEBP, SVG, TIFF)',
        fileSingular: '1 file',
        filesPlural: '{count} files'
    },
    'es': {
        title: 'PDF Converter',
        subtitle: 'Convierta Word, Notas, Markdown, Hojas de cálculo, Diapositivas, HTML e Imágenes a PDF sin perder el formato original',
        starBannerText: '¡Gracias por usar este sistema! ¡Califícanos en GitHub con una estrella si es posible!',
        starBtnText: 'Calificar con ⭐',
        uploadText: 'Arrastre y suelte uno o varios archivos aquí',
        uploadSubtext: 'Conserva fuentes, tablas, sangrías, saltos de línea, colores e imágenes originales',
        selectFileBtn: 'Seleccionar Archivos',
        addMoreFilesBtn: 'Agregar Más',
        clearAllFilesBtn: 'Limpiar Todos',
        outputModeTitle: 'Modo de exportación para múltiples archivos:',
        modeMergeTitle: 'Unir en 1 solo PDF',
        modeMergeSub: '(Combinados en el orden de abajo)',
        modeSeparateTitle: 'Mantener archivos separados',
        modeSeparateSub: '(1 PDF para cada archivo)',
        reorderHintText: 'Arrastre las tarjetas para ordenar las páginas en el PDF o use las flechas.',
        labelPageSize: 'Tamaño de Página',
        optPageOriginal: 'Original del Archivo (Predeterminado)',
        optPageA4: 'A4 (210 × 297 mm)',
        optPageLetter: 'Carta / Letter (216 × 279 mm)',
        labelOrientation: 'Orientación',
        optOrientAuto: 'Original / Automática',
        optOrientPortrait: 'Vertical',
        optOrientLandscape: 'Horizontal',
        labelMargin: 'Márgenes',
        optMarginDefault: 'Original / Predeterminado',
        optMarginCompact: 'Compacto (10 mm)',
        optMarginNone: 'Sin Márgenes (0 mm)',
        convertSingleBtn: 'Convertir a PDF Fiel',
        convertMergeBtn: 'Unir y Convertir {count} Archivos en 1 PDF',
        convertSeparateBtn: 'Convertir {count} Archivos por Separado',
        optimizeBtn: 'Optimizar y Reducir Tamaño de PDF',
        progressConverting: 'Procesando archivos con fidelidad original...',
        progressMerging: 'Combinando documentos en el orden seleccionado...',
        progressOptimizing: 'Optimizando estructura de PDF sin pérdida de calidad...',
        successTitle: '¡PDF generado con éxito!',
        successBatchTitle: '¡{count} PDFs generados con éxito!',
        successMeta: 'Formato original preservado',
        openPdfBtn: 'Abrir PDF',
        openFolderBtn: 'Abrir Carpeta de Destino',
        showInFolderBtn: 'Mostrar en Carpeta',
        newConversionBtn: 'Nueva Conversión',
        pixBadge: 'Apoyo Solidario',
        pixBadgeSub: 'Proyecto Libre e Independiente',
        pixCardTitle: 'Si te gustó el sistema, ¡cómpranos una Coca-Cola! 🥺',
        pixCardDesc: 'Haz una donación por PIX mediante el código QR o apoya a través de las billeteras internacionales.',
        pixMethodTag: 'Clave PIX (Brasil)',
        intlSupportTag: 'Apoyo Internacional (Extranjeros)',
        pixQrHint: 'Apunta con la cámara de tu móvil',
        intlDesc: 'Dona con tarjeta internacional, Apple Pay o Google Pay:',
        contactPartnershipText: 'Contacto para Alianzas',
        contactCopied: '¡Correo Copiado! ✓',
        errorTitle: 'No se pudo completar la conversión',
        retryBtn: 'Volver e Intentar de Nuevo',
        footerTitle: 'Formatos admitidos con preservación de diseño original:',
        badgeWord: 'Word (DOCX, DOC, RTF, ODT)',
        badgeNotes: 'Notas y Texto (TXT, MD, NOTE)',
        badgeSheets: 'Hojas de Cálculo (XLSX, XLS, CSV, ODS)',
        badgeSlides: 'Diapositivas (PPTX, PPT, ODP)',
        badgeCode: 'Web y Código (HTML, JSON, XML, SQL)',
        badgeImages: 'Imágenes (PNG, JPG, WEBP, SVG, TIFF)',
        fileSingular: '1 archivo',
        filesPlural: '{count} archivos'
    },
    'fr': {
        title: 'PDF Converter',
        subtitle: 'Convertissez Word, Notes, Markdown, Feuilles de calcul, Présentations, HTML et Images en PDF sans altérer la mise en page',
        starBannerText: 'Merci d\'utiliser ce système ! Donnez-nous une étoile sur GitHub si possible !',
        starBtnText: 'Noter avec ⭐',
        uploadText: 'Glissez et déposez un ou plusieurs fichiers ici',
        uploadSubtext: 'Préserve polices, tableaux, retraits, sauts de ligne, couleurs et images d\'origine',
        selectFileBtn: 'Sélectionner des fichiers',
        addMoreFilesBtn: 'Ajouter plus',
        clearAllFilesBtn: 'Tout effacer',
        outputModeTitle: 'Mode d\'exportation pour fichiers multiples :',
        modeMergeTitle: 'Fusionner en 1 seul PDF',
        modeMergeSub: '(Combiné selon l\'ordre ci-dessous)',
        modeSeparateTitle: 'Garder les fichiers séparés',
        modeSeparateSub: '(1 PDF pour chaque fichier)',
        reorderHintText: 'Glissez les cartes pour réorganiser les pages du PDF ou utilisez les flèches.',
        labelPageSize: 'Format de page',
        optPageOriginal: 'Format d\'origine (Par défaut)',
        optPageA4: 'A4 (210 × 297 mm)',
        optPageLetter: 'Lettre / Letter (216 × 279 mm)',
        labelOrientation: 'Orientation',
        optOrientAuto: 'D\'origine / Automatique',
        optOrientPortrait: 'Portrait (Vertical)',
        optOrientLandscape: 'Paysage (Horizontal)',
        labelMargin: 'Marges',
        optMarginDefault: 'D\'origine / Par défaut',
        optMarginCompact: 'Compacte (10 mm)',
        optMarginNone: 'Sans marge (0 mm)',
        convertSingleBtn: 'Convertir en PDF fidèle',
        convertMergeBtn: 'Fusionner et convertir {count} fichiers en 1 PDF',
        convertSeparateBtn: 'Convertir {count} fichiers séparément',
        optimizeBtn: 'Optimiser et réduire la taille du PDF',
        progressConverting: 'Traitement des fichiers avec fidélité absolue...',
        progressMerging: 'Fusion des documents dans l\'ordre sélectionné...',
        progressOptimizing: 'Optimisation de la structure PDF sans perte de qualité...',
        successTitle: 'PDF généré avec succès !',
        successBatchTitle: '{count} PDFs générés avec succès !',
        successMeta: 'Mise en page d\'origine préservée',
        openPdfBtn: 'Ouvrir le PDF',
        openFolderBtn: 'Ouvrir le dossier de destination',
        showInFolderBtn: 'Afficher dans le dossier',
        newConversionBtn: 'Nouvelle conversion',
        pixBadge: 'Soutien Solidaire',
        pixBadgeSub: 'Projet Libre & Indépendant',
        pixCardTitle: 'Si vous avez aimé ce logiciel, offrez-nous un Coca-Cola 🥺',
        pixCardDesc: 'Faites un don PIX via QR Code ou soutenez-nous via les portefeuilles internationaux ci-dessous.',
        pixMethodTag: 'Clé PIX (Brésil)',
        intlSupportTag: 'Soutien International (Monde)',
        pixQrHint: 'Pointez l\'appareil photo de votre smartphone',
        intlDesc: 'Faites un don par carte bancaire, Apple Pay ou Google Pay :',
        contactPartnershipText: 'Contact & Partenariats',
        contactCopied: 'E-mail copié ! ✓',
        errorTitle: 'Échec de la conversion',
        retryBtn: 'Retour et réessayer',
        footerTitle: 'Formats pris en charge avec préservation du rendu d\'origine :',
        badgeWord: 'Word (DOCX, DOC, RTF, ODT)',
        badgeNotes: 'Notes & Texte (TXT, MD, NOTE)',
        badgeSheets: 'Tableurs (XLSX, XLS, CSV, ODS)',
        badgeSlides: 'Diapositives (PPTX, PPT, ODP)',
        badgeCode: 'Web & Code (HTML, JSON, XML, SQL)',
        badgeImages: 'Images (PNG, JPG, WEBP, SVG, TIFF)',
        fileSingular: '1 fichier',
        filesPlural: '{count} fichiers'
    },
    'de': {
        title: 'PDF Converter',
        subtitle: 'Konvertieren Sie Word, Notizen, Markdown, Tabellen, Folien, HTML und Bilder in PDF, ohne das Original-Layout zu verlieren',
        starBannerText: 'Danke, dass Sie dieses System nutzen! Bitte bewerten Sie uns auf GitHub mit einem Stern!',
        starBtnText: 'Mit ⭐ bewerten',
        uploadText: 'Ziehen Sie eine oder mehrere Dateien hierher',
        uploadSubtext: 'Behält Schriftarten, Tabellen, Einzüge, Zeilenumbrüche, Farben und Originalbilder bei',
        selectFileBtn: 'Dateien auswählen',
        addMoreFilesBtn: 'Weitere hinzufügen',
        clearAllFilesBtn: 'Alle löschen',
        outputModeTitle: 'Exportmodus für mehrere Dateien:',
        modeMergeTitle: 'In 1 einzige PDF zusammenführen',
        modeMergeSub: '(Reihenfolge wie unten angegeben)',
        modeSeparateTitle: 'Dateien getrennt behalten',
        modeSeparateSub: '(1 PDF für jede Datei)',
        reorderHintText: 'Ziehen Sie Karten, um die Seitenfolge im PDF zu ändern, oder nutzen Sie die Pfeile.',
        labelPageSize: 'Seitengröße',
        optPageOriginal: 'Originalgröße (Standard)',
        optPageA4: 'A4 (210 × 297 mm)',
        optPageLetter: 'Letter (216 × 279 mm)',
        labelOrientation: 'Ausrichtung',
        optOrientAuto: 'Original / Automatisch',
        optOrientPortrait: 'Hochformat',
        optOrientLandscape: 'Querformat',
        labelMargin: 'Ränder',
        optMarginDefault: 'Original / Standard',
        optMarginCompact: 'Kompakt (10 mm)',
        optMarginNone: 'Keine Ränder (0 mm)',
        convertSingleBtn: 'Originalgetreu in PDF konvertieren',
        convertMergeBtn: '{count} Dateien in 1 PDF zusammenführen',
        convertSeparateBtn: '{count} Dateien separat konvertieren',
        optimizeBtn: 'PDF optimieren & verkleinern',
        progressConverting: 'Dateien werden mit voller Originaltreue verarbeitet...',
        progressMerging: 'Dokumente werden in gewählter Reihenfolge zusammengeführt...',
        progressOptimizing: 'PDF-Struktur wird ohne Qualitätsverlust optimiert...',
        successTitle: 'PDF erfolgreich erstellt!',
        successBatchTitle: '{count} PDFs erfolgreich erstellt!',
        successMeta: 'Original-Formatierung beibehalten',
        openPdfBtn: 'PDF öffnen',
        openFolderBtn: 'Zielordner öffnen',
        showInFolderBtn: 'Im Ordner anzeigen',
        newConversionBtn: 'Neue Konvertierung',
        pixBadge: 'Solidarische Unterstützung',
        pixBadgeSub: 'Freies & Unabhängiges Projekt',
        pixCardTitle: 'Gefällt Ihnen das System? Spenden Sie uns eine Cola! 🥺',
        pixCardDesc: 'Spenden Sie per PIX über den QR-Code oder unterstützen Sie uns über die internationalen Wallets unten.',
        pixMethodTag: 'PIX-Schlüssel (Brasilien)',
        intlSupportTag: 'Internationale Unterstützung (Weltweit)',
        pixQrHint: 'Mit der Handykamera scannen',
        intlDesc: 'Spenden Sie mit internationaler Karte, Apple Pay oder Google Pay:',
        contactPartnershipText: 'Kontakt & Partnerschaften',
        contactCopied: 'E-Mail kopiert! ✓',
        errorTitle: 'Konvertierung fehlgeschlagen',
        retryBtn: 'Zurück und erneut versuchen',
        footerTitle: 'Unterstützte Formate mit Erhalt des Originallayouts:',
        badgeWord: 'Word (DOCX, DOC, RTF, ODT)',
        badgeNotes: 'Notizen & Text (TXT, MD, NOTE)',
        badgeSheets: 'Tabellen (XLSX, XLS, CSV, ODS)',
        badgeSlides: 'Präsentationen (PPTX, PPT, ODP)',
        badgeCode: 'Web & Code (HTML, JSON, XML, SQL)',
        badgeImages: 'Bilder (PNG, JPG, WEBP, SVG, TIFF)',
        fileSingular: '1 Datei',
        filesPlural: '{count} Dateien'
    },
    'ru': {
        title: 'PDF Converter',
        subtitle: 'Конвертируйте Word, Заметки, Markdown, Таблицы, Слайды, HTML и Изображения в PDF с сохранением форматирования',
        starBannerText: 'Спасибо за использование системы! Пожалуйста, оцените проект звездой на GitHub!',
        starBtnText: 'Оценить ⭐',
        uploadText: 'Перетащите один или несколько файлов сюда',
        uploadSubtext: 'Сохраняет шрифты, таблицы, отступы, переносы строк, цвета и исходные изображения',
        selectFileBtn: 'Выбрать файлы',
        addMoreFilesBtn: 'Добавить еще',
        clearAllFilesBtn: 'Очистить все',
        outputModeTitle: 'Режим экспорта для нескольких файлов:',
        modeMergeTitle: 'Объединить в один общий PDF',
        modeMergeSub: '(Порядок страниц как в списке ниже)',
        modeSeparateTitle: 'Сохранить файлы раздельно',
        modeSeparateSub: '(1 PDF для каждого файла)',
        reorderHintText: 'Перетаскивайте карточки для изменения порядка страниц или используйте стрелки.',
        labelPageSize: 'Размер страницы',
        optPageOriginal: 'Исходный размер (По умолчанию)',
        optPageA4: 'A4 (210 × 297 мм)',
        optPageLetter: 'Letter (216 × 279 мм)',
        labelOrientation: 'Ориентация',
        optOrientAuto: 'Исходная / Авто',
        optOrientPortrait: 'Книжная (Вертикальная)',
        optOrientLandscape: 'Альбомная (Горизонтальная)',
        labelMargin: 'Поля',
        optMarginDefault: 'Исходные / По умолчанию',
        optMarginCompact: 'Компактные (10 мм)',
        optMarginNone: 'Без полей (0 мм)',
        convertSingleBtn: 'Конвертировать в точный PDF',
        convertMergeBtn: 'Объединить {count} файлов в 1 PDF',
        convertSeparateBtn: 'Конвертировать {count} файлов раздельно',
        optimizeBtn: 'Оптимизировать и сжать PDF',
        progressConverting: 'Обработка файлов с сохранением макета...',
        progressMerging: 'Объединение документов в выбранном порядке...',
        progressOptimizing: 'Оптимизация структуры PDF без потери качества...',
        successTitle: 'PDF успешно сформирован!',
        successBatchTitle: '{count} файлов PDF успешно сформированы!',
        successMeta: 'Исходное форматирование полностью сохранено',
        openPdfBtn: 'Открыть PDF',
        openFolderBtn: 'Открыть папку назначения',
        showInFolderBtn: 'Показать в папке',
        newConversionBtn: 'Новая конвертация',
        pixBadge: 'Поддержка проекта',
        pixBadgeSub: 'Свободный и независимый проект',
        pixCardTitle: 'Понравилась программа? Угостите нас кока-колой 🥺',
        pixCardDesc: 'Сделайте донат по PIX через QR-код или поддержите через международные кошельки ниже.',
        pixMethodTag: 'Ключ PIX (Бразилия)',
        intlSupportTag: 'Международная поддержка (Все страны)',
        pixQrHint: 'Наведите камеру смартфона',
        intlDesc: 'Поддержите проект картой, Apple Pay или Google Pay:',
        contactPartnershipText: 'Связь и сотрудничество',
        contactCopied: 'Email скопирован! ✓',
        errorTitle: 'Не удалось выполнить конвертацию',
        retryBtn: 'Вернуться и попробовать снова',
        footerTitle: 'Поддерживаемые форматы с сохранением макета:',
        badgeWord: 'Word (DOCX, DOC, RTF, ODT)',
        badgeNotes: 'Заметки и Текст (TXT, MD, NOTE)',
        badgeSheets: 'Таблицы (XLSX, XLS, CSV, ODS)',
        badgeSlides: 'Презентации (PPTX, PPT, ODP)',
        badgeCode: 'Веб и Код (HTML, JSON, XML, SQL)',
        badgeImages: 'Изображения (PNG, JPG, WEBP, SVG, TIFF)',
        fileSingular: '1 файл',
        filesPlural: '{count} файлов'
    },
    'zh-CN': {
        title: 'PDF Converter',
        subtitle: '将 Word、备忘录、Markdown、表格、幻灯片、HTML 和图片转换为 PDF，完整保留原始格式',
        starBannerText: '感谢使用本系统！如果觉得好用，请在 GitHub 上点亮一颗星 ⭐！',
        starBtnText: '点亮 ⭐',
        uploadText: '将一个或多个文件拖放到此处',
        uploadSubtext: '保留字体、表格、缩进、换行、颜色以及原始图片',
        selectFileBtn: '选择文件',
        addMoreFilesBtn: '添加更多文件',
        clearAllFilesBtn: '清空列表',
        outputModeTitle: '多文件导出模式：',
        modeMergeTitle: '合并为一个 PDF 文件',
        modeMergeSub: '(按下方卡片顺序合并)',
        modeSeparateTitle: '保持各文件独立',
        modeSeparateSub: '(每个文件单独生成 1 个 PDF)',
        reorderHintText: '拖动卡片可调整 PDF 页面先后顺序，或点击箭头移动。',
        labelPageSize: '页面尺寸',
        optPageOriginal: '原始文件大小 (默认)',
        optPageA4: 'A4 (210 × 297 毫米)',
        optPageLetter: '信纸 / Letter (216 × 279 毫米)',
        labelOrientation: '页面方向',
        optOrientAuto: '原始 / 自动',
        optOrientPortrait: '纵向 (垂直)',
        optOrientLandscape: '横向 (水平)',
        labelMargin: '边距',
        optMarginDefault: '原始 / 默认',
        optMarginCompact: '紧凑 (10 毫米)',
        optMarginNone: '无边距 (0 毫米)',
        convertSingleBtn: '精准转换为 PDF',
        convertMergeBtn: '合并并转换 {count} 个文件为 1 个 PDF',
        convertSeparateBtn: '分别转换 {count} 个文件',
        optimizeBtn: '优化并减小 PDF 体积',
        progressConverting: '正在以原始保真度处理文件...',
        progressMerging: '正在按指定顺序合并文件...',
        progressOptimizing: '正在无损优化 PDF 结构...',
        successTitle: 'PDF 生成成功！',
        successBatchTitle: '{count} 个 PDF 生成成功！',
        successMeta: '已完整保留原始排版与格式',
        openPdfBtn: '打开 PDF',
        openFolderBtn: '打开输出目录',
        showInFolderBtn: '在文件夹中显示',
        newConversionBtn: '转换新文件',
        pixBadge: '支持开发者',
        pixBadgeSub: '自由与独立开发项目',
        pixCardTitle: '如果喜欢这个系统，请我们喝瓶可乐吧 🥺',
        pixCardDesc: '通过二维码进行 PIX 赞助，或通过下方的国际赞助平台支持我们。',
        pixMethodTag: 'PIX支付（巴西）',
        intlSupportTag: '国际赞助（海外支持）',
        pixQrHint: '使用手机扫一扫',
        intlDesc: '支持国际信用卡、Apple Pay 或 Google Pay 赞助：',
        contactPartnershipText: '商务合作与联系',
        contactCopied: '邮箱已复制！✓',
        errorTitle: '无法完成转换',
        retryBtn: '返回并重试',
        footerTitle: '支持保留原貌的格式列表：',
        badgeWord: 'Word 文档 (DOCX, DOC, RTF, ODT)',
        badgeNotes: '备忘录与文本 (TXT, MD, NOTE)',
        badgeSheets: '电子表格 (XLSX, XLS, CSV, ODS)',
        badgeSlides: '幻灯片演示 (PPTX, PPT, ODP)',
        badgeCode: '网页与代码 (HTML, JSON, XML, SQL)',
        badgeImages: '图片与矢量 (PNG, JPG, WEBP, SVG, TIFF)',
        fileSingular: '1 个文件',
        filesPlural: '{count} 个文件'
    },
    'ja': {
        title: 'PDF Converter',
        subtitle: 'Word、メモ、Markdown、スプレッドシート、スライド、HTML、画像を元の書式を損なわずに高品質PDFへ変換',
        starBannerText: 'ご利用ありがとうございます！よろしければGitHubでスター ⭐ を付けて応援してください！',
        starBtnText: '⭐ で応援',
        uploadText: '1つまたは複数のファイルをドラッグ＆ドロップ',
        uploadSubtext: 'フォント、表、インデント、改行、カラー、元画像を完全に保持します',
        selectFileBtn: 'ファイルを選択',
        addMoreFilesBtn: 'さらにファイルを追加',
        clearAllFilesBtn: 'すべてクリア',
        outputModeTitle: '複数ファイルのエクスポート設定：',
        modeMergeTitle: '1つのPDFに統合する',
        modeMergeSub: '(下記の並び順で結合されます)',
        modeSeparateTitle: '個別のPDFとして保持する',
        modeSeparateSub: '(各ファイルごとに1つのPDFを作成)',
        reorderHintText: 'カードをドラッグしてページ順序を入れ替えるか、矢印ボタンをご利用ください。',
        labelPageSize: '用紙サイズ',
        optPageOriginal: '元のファイルサイズ (標準)',
        optPageA4: 'A4 (210 × 297 mm)',
        optPageLetter: 'レター / Letter (216 × 279 mm)',
        labelOrientation: 'ページの向き',
        optOrientAuto: '元の向き / 自動',
        optOrientPortrait: '縦向き (ポートレート)',
        optOrientLandscape: '横向き (ランドスケープ)',
        labelMargin: '余白設定',
        optMarginDefault: '元の余白 / 標準',
        optMarginCompact: '狭い (10 mm)',
        optMarginNone: '余白なし (0 mm)',
        convertSingleBtn: '高精度でPDFに変換',
        convertMergeBtn: '{count}個のファイルを1つのPDFに統合変換',
        convertSeparateBtn: '{count}個のファイルを個別にPDF変換',
        optimizeBtn: 'PDFを最適化して容量削減',
        progressConverting: '元のレイアウトを忠実に保ったまま処理中...',
        progressMerging: '指定された順序でPDFを結合中...',
        progressOptimizing: '品質を損なうことなくPDF構造を最適化中...',
        successTitle: 'PDFの生成が完了しました！',
        successBatchTitle: '{count}個のPDFが生成されました！',
        successMeta: '元の書式とレイアウトが正確に保持されています',
        openPdfBtn: 'PDFを開く',
        openFolderBtn: '保存先フォルダを開く',
        showInFolderBtn: 'フォルダで表示',
        newConversionBtn: '新しい変換',
        pixBadge: '開発者を応援',
        pixBadgeSub: '自由で独立したオープン開発',
        pixCardTitle: 'このソフトが役に立ちましたら、コーラを一杯ごちそうしてください 🥺',
        pixCardDesc: 'QRコードからPIXで送金するか、以下の国際決済ウォレットからご支援いただけます。',
        pixMethodTag: 'PIX送金（ブラジル）',
        intlSupportTag: '国際支援（海外からの応援）',
        pixQrHint: 'スマートフォンのカメラで読み取り',
        intlDesc: 'クレジットカード、Apple Pay、Google Payで支援：',
        contactPartnershipText: '提携・お問い合わせ',
        contactCopied: 'メールアドレスをコピーしました！✓',
        errorTitle: '変換を完了できませんでした',
        retryBtn: '戻ってやり直す',
        footerTitle: '元のレイアウトを保持して変換可能な形式：',
        badgeWord: 'Word文書 (DOCX, DOC, RTF, ODT)',
        badgeNotes: 'メモ＆テキスト (TXT, MD, NOTE)',
        badgeSheets: 'スプレッドシート (XLSX, XLS, CSV, ODS)',
        badgeSlides: 'プレゼンテーション (PPTX, PPT, ODP)',
        badgeCode: 'Web＆コード (HTML, JSON, XML, SQL)',
        badgeImages: '画像＆ベクター (PNG, JPG, WEBP, SVG, TIFF)',
        fileSingular: '1 ファイル',
        filesPlural: '{count} ファイル'
    }
};

// ============================================================================
// ELEMENTOS DO DOM
// ============================================================================
const languageSelect = document.getElementById('languageSelect');
const appTitle = document.getElementById('appTitle');
const appSubtitle = document.getElementById('appSubtitle');

const githubStarBanner = document.getElementById('githubStarBanner');
const starBannerText = document.getElementById('starBannerText');
const gitStarBtn = document.getElementById('gitStarBtn');
const gitStarBtnText = document.getElementById('gitStarBtnText');

const uploadArea = document.getElementById('uploadArea');
const uploadText = document.getElementById('uploadText');
const uploadSubtext = document.getElementById('uploadSubtext');
const selectFileBtn = document.getElementById('selectFileBtn');
const selectFileBtnText = document.getElementById('selectFileBtnText');

const fileManager = document.getElementById('fileManager');
const fileCountBadge = document.getElementById('fileCountBadge');
const fileTotalSize = document.getElementById('fileTotalSize');
const addMoreFilesBtn = document.getElementById('addMoreFilesBtn');
const addMoreFilesBtnText = document.getElementById('addMoreFilesBtnText');
const clearAllFilesBtn = document.getElementById('clearAllFilesBtn');
const clearAllFilesBtnText = document.getElementById('clearAllFilesBtnText');

const outputModeSelector = document.getElementById('outputModeSelector');
const outputModeTitle = document.getElementById('outputModeTitle');
const modeMergeRadio = document.getElementById('modeMergeRadio');
const modeSeparateRadio = document.getElementById('modeSeparateRadio');
const modeMergeTitle = document.getElementById('modeMergeTitle');
const modeMergeSub = document.getElementById('modeMergeSub');
const modeSeparateTitle = document.getElementById('modeSeparateTitle');
const modeSeparateSub = document.getElementById('modeSeparateSub');

const reorderHintBanner = document.getElementById('reorderHintBanner');
const reorderHintText = document.getElementById('reorderHintText');
const fileListScrollable = document.getElementById('fileListScrollable');

const conversionOptions = document.getElementById('conversionOptions');
const labelPageSize = document.getElementById('labelPageSize');
const pageSizeSelect = document.getElementById('pageSizeSelect');
const optPageOriginal = document.getElementById('optPageOriginal');
const optPageA4 = document.getElementById('optPageA4');
const optPageLetter = document.getElementById('optPageLetter');

const labelOrientation = document.getElementById('labelOrientation');
const orientationSelect = document.getElementById('orientationSelect');
const optOrientAuto = document.getElementById('optOrientAuto');
const optOrientPortrait = document.getElementById('optOrientPortrait');
const optOrientLandscape = document.getElementById('optOrientLandscape');

const labelMargin = document.getElementById('labelMargin');
const marginSelect = document.getElementById('marginSelect');
const optMarginDefault = document.getElementById('optMarginDefault');
const optMarginCompact = document.getElementById('optMarginCompact');
const optMarginNone = document.getElementById('optMarginNone');

const actions = document.getElementById('actions');
const convertBtn = document.getElementById('convertBtn');
const convertBtnText = document.getElementById('convertBtnText');
const optimizeBtn = document.getElementById('optimizeBtn');
const optimizeBtnText = document.getElementById('optimizeBtnText');

const progressContainer = document.getElementById('progressContainer');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');

const successMessage = document.getElementById('successMessage');
const successTitle = document.getElementById('successTitle');
const successMeta = document.getElementById('successMeta');
const successDetails = document.getElementById('successDetails');
const openPdfBtn = document.getElementById('openPdfBtn');
const openPdfBtnText = document.getElementById('openPdfBtnText');
const showInFolderBtn = document.getElementById('showInFolderBtn');
const showInFolderBtnText = document.getElementById('showInFolderBtnText');
const newConversionBtn = document.getElementById('newConversionBtn');
const newConversionBtnText = document.getElementById('newConversionBtnText');

const pixBadge = document.getElementById('pixBadge');
const pixBadgeSub = document.getElementById('pixBadgeSub');
const pixCardTitle = document.getElementById('pixCardTitle');
const pixCardDesc = document.getElementById('pixCardDesc');
const pixMethodTag = document.getElementById('pixMethodTag');
const intlSupportTag = document.getElementById('intlSupportTag');
const intlDesc = document.getElementById('intlDesc');
const pixQrHint = document.getElementById('pixQrHint');
const openBmcBtn = document.getElementById('openBmcBtn');
const openKofiBtn = document.getElementById('openKofiBtn');
const contactPartnershipBtn = document.getElementById('contactPartnershipBtn');
const contactPartnershipText = document.getElementById('contactPartnershipText');

const errorMessage = document.getElementById('errorMessage');
const errorTitle = document.getElementById('errorTitle');
const errorDetails = document.getElementById('errorDetails');
const retryBtn = document.getElementById('retryBtn');
const retryBtnText = document.getElementById('retryBtnText');

const footerTitle = document.getElementById('footerTitle');
const badgeWord = document.getElementById('badgeWord');
const badgeNotes = document.getElementById('badgeNotes');
const badgeSheets = document.getElementById('badgeSheets');
const badgeSlides = document.getElementById('badgeSlides');
const badgeCode = document.getElementById('badgeCode');
const badgeImages = document.getElementById('badgeImages');

// ============================================================================
// ESTADO DA APLICAÇÃO
// ============================================================================
let currentLanguage = 'pt-BR';
let fileList = []; // Array de itens { path, name, size, ext, badge, typeLabel, engineLabel }
let outputMode = 'merge'; // 'merge' | 'separate'
let lastSavedPdfPath = null;
let lastSavedFolderPath = null;
let progressIntervalId = null;
let draggedItemIndex = null;

// ============================================================================
// GERENCIAMENTO DE IDIOMA E I18N
// ============================================================================
async function initLanguage() {
    const savedLang = localStorage.getItem('pdf_converter_lang');
    if (savedLang && TRANSLATIONS[savedLang]) {
        currentLanguage = savedLang;
    } else {
        let systemLang = 'pt-BR';
        try {
            if (window.electronAPI && window.electronAPI.getSystemLocale) {
                systemLang = await window.electronAPI.getSystemLocale();
            }
        } catch {
            systemLang = navigator.language || 'en';
        }

        const lower = (systemLang || '').toLowerCase();
        if (lower.startsWith('pt-pt')) {
            currentLanguage = 'pt-PT';
        } else if (lower.startsWith('pt')) {
            currentLanguage = 'pt-BR';
        } else if (lower.startsWith('es')) {
            currentLanguage = 'es';
        } else if (lower.startsWith('fr')) {
            currentLanguage = 'fr';
        } else if (lower.startsWith('de')) {
            currentLanguage = 'de';
        } else if (lower.startsWith('ru')) {
            currentLanguage = 'ru';
        } else if (lower.startsWith('zh')) {
            currentLanguage = 'zh-CN';
        } else if (lower.startsWith('ja')) {
            currentLanguage = 'ja';
        } else {
            currentLanguage = 'en';
        }
    }

    languageSelect.value = currentLanguage;
    applyLanguage(currentLanguage);
}

function applyLanguage(lang) {
    const t = TRANSLATIONS[lang] || TRANSLATIONS['pt-BR'];
    currentLanguage = lang;
    document.documentElement.lang = lang;

    appTitle.textContent = t.title;
    appSubtitle.textContent = t.subtitle;

    starBannerText.textContent = t.starBannerText;
    gitStarBtnText.textContent = t.starBtnText;

    uploadText.textContent = t.uploadText;
    uploadSubtext.textContent = t.uploadSubtext;
    selectFileBtnText.textContent = t.selectFileBtn;

    addMoreFilesBtnText.textContent = t.addMoreFilesBtn;
    clearAllFilesBtnText.textContent = t.clearAllFilesBtn;

    outputModeTitle.textContent = t.outputModeTitle;
    modeMergeTitle.textContent = t.modeMergeTitle;
    modeMergeSub.textContent = t.modeMergeSub;
    modeSeparateTitle.textContent = t.modeSeparateTitle;
    modeSeparateSub.textContent = t.modeSeparateSub;

    reorderHintText.textContent = t.reorderHintText;

    labelPageSize.textContent = t.labelPageSize;
    optPageOriginal.textContent = t.optPageOriginal;
    optPageA4.textContent = t.optPageA4;
    optPageLetter.textContent = t.optPageLetter;

    labelOrientation.textContent = t.labelOrientation;
    optOrientAuto.textContent = t.optOrientAuto;
    optOrientPortrait.textContent = t.optOrientPortrait;
    optOrientLandscape.textContent = t.optOrientLandscape;

    labelMargin.textContent = t.labelMargin;
    optMarginDefault.textContent = t.optMarginDefault;
    optMarginCompact.textContent = t.optMarginCompact;
    optMarginNone.textContent = t.optMarginNone;

    optimizeBtnText.textContent = t.optimizeBtn;

    pixBadge.textContent = t.pixBadge;
    pixBadgeSub.textContent = t.pixBadgeSub;
    pixCardTitle.textContent = t.pixCardTitle;
    pixCardDesc.textContent = t.pixCardDesc;
    pixMethodTag.textContent = t.pixMethodTag;
    if (intlSupportTag) intlSupportTag.textContent = t.intlSupportTag;
    if (intlDesc) intlDesc.textContent = t.intlDesc;
    pixQrHint.textContent = t.pixQrHint;
    if (contactPartnershipText && (!contactPartnershipBtn || !contactPartnershipBtn.classList.contains('copied'))) {
        contactPartnershipText.textContent = t.contactPartnershipText;
    }

    newConversionBtnText.textContent = t.newConversionBtn;
    errorTitle.textContent = t.errorTitle;
    retryBtnText.textContent = t.retryBtn;

    footerTitle.textContent = t.footerTitle;
    badgeWord.textContent = t.badgeWord;
    badgeNotes.textContent = t.badgeNotes;
    badgeSheets.textContent = t.badgeSheets;
    badgeSlides.textContent = t.badgeSlides;
    badgeCode.textContent = t.badgeCode;
    badgeImages.textContent = t.badgeImages;

    updateConvertButtonText();
    updateFileCountAndSize();
}

languageSelect.addEventListener('change', (e) => {
    const selected = e.target.value;
    localStorage.setItem('pdf_converter_lang', selected);
    applyLanguage(selected);
});

// ============================================================================
// GERENCIADOR DE ARQUIVOS E DRAG & DROP REORDER (ESTILO ANDROID)
// ============================================================================

async function addFilesToList(paths) {
    if (!paths || paths.length === 0) return;

    for (const filePath of paths) {
        if (!filePath) continue;
        const exists = fileList.some(item => item.path.toLowerCase() === filePath.toLowerCase());
        if (exists) continue; // Evita duplicatas idênticas

        try {
            const info = await window.electronAPI.getFileInfo(filePath);
            fileList.push({
                path: filePath,
                name: info.name,
                size: info.size,
                ext: info.ext,
                badge: info.badge,
                typeLabel: info.typeLabel,
                engineLabel: info.engineLabel
            });
        } catch (err) {
            console.warn('Erro ao obter informações do arquivo:', filePath, err.message);
        }
    }

    if (fileList.length > 0) {
        uploadArea.classList.add('hidden');
        fileManager.classList.remove('hidden');
        actions.classList.remove('hidden');
        conversionOptions.classList.remove('hidden');
        githubStarBanner.classList.remove('hidden');
        renderFileList();
    }
}

function renderFileList() {
    fileListScrollable.innerHTML = '';

    fileList.forEach((file, index) => {
        const card = document.createElement('div');
        card.className = 'file-card-item';
        card.setAttribute('draggable', outputMode === 'merge' ? 'true' : 'false');
        card.setAttribute('data-index', index);
        card.setAttribute('role', 'listitem');

        const isFirst = index === 0;
        const isLast = index === fileList.length - 1;
        const sizeFormatted = formatFileSize(file.size);

        card.innerHTML = `
            <div class="drag-handle" title="Segure e arraste para reordenar" aria-grabbed="false">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <circle cx="9" cy="6" r="1.8"/>
                    <circle cx="15" cy="6" r="1.8"/>
                    <circle cx="9" cy="12" r="1.8"/>
                    <circle cx="15" cy="12" r="1.8"/>
                    <circle cx="9" cy="18" r="1.8"/>
                    <circle cx="15" cy="18" r="1.8"/>
                </svg>
            </div>
            <span class="badge-order" aria-label="Ordem ${index + 1}">#${index + 1}</span>
            <span class="badge badge-format">${file.badge || 'DOC'}</span>
            <div class="file-item-info">
                <p class="file-item-name" title="${escapeHtml(file.name)}">${escapeHtml(file.name)}</p>
                <span class="file-item-size">${sizeFormatted} • ${escapeHtml(file.typeLabel || 'Documento')}</span>
            </div>
            <div class="reorder-actions" role="group" aria-label="Reordenar arquivo">
                <button type="button" class="btn-micro-icon btn-move-up" data-action="up" data-index="${index}" title="Mover para cima" ${isFirst ? 'disabled' : ''}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"></polyline></svg>
                </button>
                <button type="button" class="btn-micro-icon btn-move-down" data-action="down" data-index="${index}" title="Mover para baixo" ${isLast ? 'disabled' : ''}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </button>
            </div>
            <button type="button" class="btn-micro-remove" data-action="remove" data-index="${index}" title="Remover da lista">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
        `;

        // Eventos de Drag and Drop HTML5 Fluido
        card.addEventListener('dragstart', (e) => {
            if (outputMode !== 'merge') return;
            draggedItemIndex = index;
            card.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', index);
        });

        card.addEventListener('dragend', () => {
            card.classList.remove('dragging');
            document.querySelectorAll('.file-card-item').forEach(el => el.classList.remove('drag-over-item'));
            draggedItemIndex = null;
        });

        card.addEventListener('dragover', (e) => {
            if (outputMode !== 'merge') return;
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            card.classList.add('drag-over-item');
        });

        card.addEventListener('dragleave', () => {
            card.classList.remove('drag-over-item');
        });

        card.addEventListener('drop', (e) => {
            if (outputMode !== 'merge') return;
            e.preventDefault();
            card.classList.remove('drag-over-item');

            const targetIndex = parseInt(card.getAttribute('data-index'), 10);
            if (draggedItemIndex !== null && draggedItemIndex !== targetIndex) {
                const [movedItem] = fileList.splice(draggedItemIndex, 1);
                fileList.splice(targetIndex, 0, movedItem);
                renderFileList();
            }
        });

        fileListScrollable.appendChild(card);
    });

    // Seletor de Modo e Dica de Reordenação
    if (fileList.length > 1) {
        outputModeSelector.classList.remove('hidden');
        if (outputMode === 'merge') {
            reorderHintBanner.classList.remove('hidden');
        } else {
            reorderHintBanner.classList.add('hidden');
        }
    } else {
        outputModeSelector.classList.add('hidden');
        reorderHintBanner.classList.add('hidden');
    }

    // Se houver apenas 1 arquivo e for PDF, mostra botão de otimização
    if (fileList.length === 1 && fileList[0].ext === '.pdf') {
        optimizeBtn.classList.remove('hidden');
    } else {
        optimizeBtn.classList.add('hidden');
    }

    updateFileCountAndSize();
    updateConvertButtonText();
}

function updateFileCountAndSize() {
    const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS['pt-BR'];
    const count = fileList.length;

    if (count === 1) {
        fileCountBadge.textContent = t.fileSingular || '1 arquivo';
    } else {
        fileCountBadge.textContent = (t.filesPlural || '{count} arquivos').replace('{count}', count);
    }

    const totalBytes = fileList.reduce((acc, f) => acc + (f.size || 0), 0);
    fileTotalSize.textContent = `Total: ${formatFileSize(totalBytes)}`;
}

function updateConvertButtonText() {
    const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS['pt-BR'];
    const count = fileList.length;

    if (count <= 1) {
        convertBtnText.textContent = t.convertSingleBtn;
    } else if (outputMode === 'merge') {
        convertBtnText.textContent = t.convertMergeBtn.replace('{count}', count);
    } else {
        convertBtnText.textContent = t.convertSeparateBtn.replace('{count}', count);
    }
}

// Delegação de cliques para botões de mover e remover
fileListScrollable.addEventListener('click', (e) => {
    const targetBtn = e.target.closest('button');
    if (!targetBtn) return;

    const action = targetBtn.getAttribute('data-action');
    const index = parseInt(targetBtn.getAttribute('data-index'), 10);
    if (isNaN(index)) return;

    if (action === 'up' && index > 0) {
        const item = fileList.splice(index, 1)[0];
        fileList.splice(index - 1, 0, item);
        renderFileList();
    } else if (action === 'down' && index < fileList.length - 1) {
        const item = fileList.splice(index, 1)[0];
        fileList.splice(index + 1, 0, item);
        renderFileList();
    } else if (action === 'remove') {
        fileList.splice(index, 1);
        if (fileList.length === 0) {
            resetUI();
        } else {
            renderFileList();
        }
    }
});

// Troca de modo de exportação (Merge vs Separate)
modeMergeRadio.addEventListener('change', () => {
    outputMode = 'merge';
    renderFileList();
});

modeSeparateRadio.addEventListener('change', () => {
    outputMode = 'separate';
    renderFileList();
});

// Adicionar mais arquivos
addMoreFilesBtn.addEventListener('click', async () => {
    try {
        const paths = await window.electronAPI.selectFile();
        if (Array.isArray(paths) && paths.length > 0) {
            await addFilesToList(paths);
        }
    } catch (err) {
        showError(err.message);
    }
});

// Limpar todos os arquivos
clearAllFilesBtn.addEventListener('click', () => {
    resetUI();
});

// ============================================================================
// UPLOAD INICIAL E DRAG & DROP GLOBAL
// ============================================================================
selectFileBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    triggerFileSelection();
});

uploadArea.addEventListener('click', triggerFileSelection);
uploadArea.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        triggerFileSelection();
    }
});

async function triggerFileSelection() {
    try {
        const paths = await window.electronAPI.selectFile();
        if (Array.isArray(paths) && paths.length > 0) {
            await addFilesToList(paths);
        }
    } catch (err) {
        showError(err.message);
    }
}

uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('drag-over');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('drag-over');
});

uploadArea.addEventListener('drop', async (e) => {
    e.preventDefault();
    uploadArea.classList.remove('drag-over');

    const files = Array.from(e.dataTransfer.files).filter(f => f.path);
    if (files.length > 0) {
        await addFilesToList(files.map(f => f.path));
    }
});

// ============================================================================
// CONVERSÃO (1 ARQUIVO, MERGE OU EM LOTE SEPARADO)
// ============================================================================
convertBtn.addEventListener('click', async () => {
    if (fileList.length === 0) return;

    const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS['pt-BR'];
    const options = {
        pageSize: pageSizeSelect.value,
        orientation: orientationSelect.value,
        margin: marginSelect.value
    };

    // Caso 1: Apenas 1 arquivo selecionado
    if (fileList.length === 1) {
        const file = fileList[0];
        showProgress(t.progressConverting);

        try {
            const pdfBuffer = await window.electronAPI.convertToPdf(file.path, options);
            const baseName = file.ext ? file.name.slice(0, -file.ext.length) : file.name;
            const defaultName = `${baseName}.pdf`;

            const savePath = await window.electronAPI.savePdf(defaultName);
            if (savePath) {
                await window.electronAPI.savePdfFile(savePath, pdfBuffer);
                lastSavedPdfPath = savePath;
                lastSavedFolderPath = null;
                const newSize = formatFileSize(pdfBuffer.byteLength || pdfBuffer.length);
                showSuccess(savePath, `${t.successMeta} • ${newSize}`, false);
            } else {
                restoreFromCancel();
            }
        } catch (err) {
            showError(err.message);
        }
        return;
    }

    // Caso 2: Múltiplos arquivos com MODO MERGE (Juntar em 1 PDF só na ordem arrastada)
    if (outputMode === 'merge') {
        showProgress(t.progressMerging);

        try {
            const orderedPaths = fileList.map(f => f.path);
            const mergedBuffer = await window.electronAPI.mergeToSinglePdf(orderedPaths, options);

            const firstName = fileList[0].name.replace(/\.[^/.]+$/, '');
            const defaultName = `${firstName}_e_mais_${fileList.length - 1}_unificados.pdf`;

            const savePath = await window.electronAPI.savePdf(defaultName);
            if (savePath) {
                await window.electronAPI.savePdfFile(savePath, mergedBuffer);
                lastSavedPdfPath = savePath;
                lastSavedFolderPath = null;
                const newSize = formatFileSize(mergedBuffer.byteLength || mergedBuffer.length);
                showSuccess(savePath, `${t.successMeta} • ${fileList.length} arquivos unificados • ${newSize}`, false);
            } else {
                restoreFromCancel();
            }
        } catch (err) {
            showError(err.message);
        }
        return;
    }

    // Caso 3: Múltiplos arquivos com MODO SEPARATE (Manter arquivos separados)
    if (outputMode === 'separate') {
        try {
            const targetDir = await window.electronAPI.selectDirectory();
            if (!targetDir) {
                return; // Usuário cancelou a escolha da pasta
            }

            showProgress(t.progressConverting);
            const orderedPaths = fileList.map(f => f.path);
            const result = await window.electronAPI.convertBatchSeparate(orderedPaths, targetDir, options);

            lastSavedPdfPath = result.files[0] || null;
            lastSavedFolderPath = result.targetDir;

            const batchTitle = t.successBatchTitle.replace('{count}', result.count);
            showSuccess(result.targetDir, `${batchTitle} • Salvos na pasta de destino`, true);
        } catch (err) {
            showError(err.message);
        }
    }
});

// Otimizar PDF (se houver 1 PDF selecionado)
optimizeBtn.addEventListener('click', async () => {
    if (fileList.length !== 1 || fileList[0].ext !== '.pdf') return;

    const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS['pt-BR'];
    const file = fileList[0];
    showProgress(t.progressOptimizing);

    try {
        const pdfBuffer = await window.electronAPI.readFileBuffer(file.path);
        const optimizedBuffer = await window.electronAPI.optimizePdf(pdfBuffer);

        const baseName = file.name.replace(/\.pdf$/i, '');
        const defaultName = `${baseName}_otimizado.pdf`;

        const savePath = await window.electronAPI.savePdf(defaultName);
        if (savePath) {
            await window.electronAPI.savePdfFile(savePath, optimizedBuffer);
            lastSavedPdfPath = savePath;
            lastSavedFolderPath = null;

            const origLen = pdfBuffer.byteLength || pdfBuffer.length;
            const optLen = optimizedBuffer.byteLength || optimizedBuffer.length;
            const originalSize = formatFileSize(origLen);
            const newSize = formatFileSize(optLen);
            const diffRatio = ((1 - optLen / Math.max(1, origLen)) * 100);
            const summary = diffRatio > 0
                ? `${originalSize} → ${newSize} (-${diffRatio.toFixed(1)}%)`
                : `${newSize}`;

            showSuccess(savePath, summary, false);
        } else {
            restoreFromCancel();
        }
    } catch (err) {
        showError(err.message);
    }
});

function restoreFromCancel() {
    stopProgressAnimation();
    progressContainer.classList.add('hidden');
    fileManager.classList.remove('hidden');
    conversionOptions.classList.remove('hidden');
    actions.classList.remove('hidden');
    githubStarBanner.classList.remove('hidden');
}

// ============================================================================
// TELAS DE STATUS: PROGRESSO, SUCESSO E ERRO
// ============================================================================
function showProgress(text) {
    stopProgressAnimation();

    githubStarBanner.classList.remove('hidden');
    uploadArea.classList.add('hidden');
    fileManager.classList.add('hidden');
    conversionOptions.classList.add('hidden');
    actions.classList.add('hidden');
    progressContainer.classList.remove('hidden');
    successMessage.classList.add('hidden');
    errorMessage.classList.add('hidden');

    progressText.textContent = text;
    progressFill.style.width = '12%';

    let progress = 12;
    progressIntervalId = setInterval(() => {
        progress += Math.random() * 18;
        if (progress > 92) progress = 92;
        progressFill.style.width = `${progress.toFixed(0)}%`;
    }, 240);
}

function showSuccess(pathOrDir, metaText, isDirectory = false) {
    stopProgressAnimation();
    progressFill.style.width = '100%';

    // Tela 3 (Sucesso): remove o banner da estrela e exibe a mensagem de apoio com PIX, carteiras globais e contato
    githubStarBanner.classList.add('hidden');
    uploadArea.classList.add('hidden');
    fileManager.classList.add('hidden');
    conversionOptions.classList.add('hidden');
    actions.classList.add('hidden');
    progressContainer.classList.add('hidden');
    successMessage.classList.remove('hidden');
    errorMessage.classList.add('hidden');

    const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS['pt-BR'];
    successTitle.textContent = isDirectory
        ? t.successBatchTitle.replace('{count}', fileList.length)
        : t.successTitle;

    successMeta.textContent = metaText;
    successDetails.textContent = pathOrDir;

    // Configuração dos botões de ação na tela de sucesso
    if (isDirectory) {
        openPdfBtn.classList.add('hidden');
        showInFolderBtnText.textContent = t.openFolderBtn || 'Abrir Pasta de Destino';
    } else {
        openPdfBtn.classList.remove('hidden');
        showInFolderBtnText.textContent = t.showInFolderBtn || 'Mostrar na Pasta';
    }
}

function showError(message) {
    stopProgressAnimation();

    githubStarBanner.classList.remove('hidden');
    uploadArea.classList.add('hidden');
    fileManager.classList.add('hidden');
    conversionOptions.classList.add('hidden');
    actions.classList.add('hidden');
    progressContainer.classList.add('hidden');
    successMessage.classList.add('hidden');
    errorMessage.classList.remove('hidden');

    errorDetails.textContent = (message || '').replace(/^Error:\s*/i, '');
}

function resetUI() {
    stopProgressAnimation();

    fileList = [];
    draggedItemIndex = null;
    lastSavedPdfPath = null;
    lastSavedFolderPath = null;

    githubStarBanner.classList.remove('hidden');
    uploadArea.classList.remove('hidden');
    fileManager.classList.add('hidden');
    conversionOptions.classList.add('hidden');
    actions.classList.add('hidden');
    progressContainer.classList.add('hidden');
    successMessage.classList.add('hidden');
    errorMessage.classList.add('hidden');
    progressFill.style.width = '0%';
}

function stopProgressAnimation() {
    if (progressIntervalId) {
        clearInterval(progressIntervalId);
        progressIntervalId = null;
    }
}

// ============================================================================
// BOTÕES GLOBAIS: GIT, CARTEIRAS (BMC / KO-FI / PIX), ABRIR ARQUIVO, REFAZER
// ============================================================================
gitStarBtn.addEventListener('click', async () => {
    const gitUrl = 'https://github.com/Caduzen/pdf-converter';
    try {
        if (window.electronAPI && window.electronAPI.openExternal) {
            await window.electronAPI.openExternal(gitUrl);
        } else {
            window.open(gitUrl, '_blank');
        }
    } catch (e) {
        console.warn('Erro ao abrir link externo do GitHub:', e);
    }
});

if (openBmcBtn) {
    openBmcBtn.addEventListener('click', async () => {
        const bmcUrl = 'https://www.buymeacoffee.com/cscarlinhos';
        try {
            if (window.electronAPI && window.electronAPI.openExternal) {
                await window.electronAPI.openExternal(bmcUrl);
            } else {
                window.open(bmcUrl, '_blank');
            }
        } catch (e) {
            console.warn('Erro ao abrir Buy Me a Coffee:', e);
        }
    });
}

if (openKofiBtn) {
    openKofiBtn.addEventListener('click', async () => {
        const kofiUrl = 'https://ko-fi.com/cscarlinhos';
        try {
            if (window.electronAPI && window.electronAPI.openExternal) {
                await window.electronAPI.openExternal(kofiUrl);
            } else {
                window.open(kofiUrl, '_blank');
            }
        } catch (e) {
            console.warn('Erro ao abrir Ko-fi:', e);
        }
    });
}

if (contactPartnershipBtn) {
    contactPartnershipBtn.addEventListener('click', async () => {
        const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS['pt-BR'];
        const emailContact = 'cscarlinhos@hotmail.com';
        try {
            await navigator.clipboard.writeText(emailContact);
            contactPartnershipBtn.classList.add('copied');
            contactPartnershipText.textContent = t.contactCopied || 'E-mail Copiado! ✓';
            setTimeout(() => {
                contactPartnershipBtn.classList.remove('copied');
                contactPartnershipText.textContent = t.contactPartnershipText || 'Contato para Parcerias';
            }, 2500);
        } catch {
            const temp = document.createElement('input');
            temp.value = emailContact;
            document.body.appendChild(temp);
            temp.select();
            document.execCommand('copy');
            document.body.removeChild(temp);
            contactPartnershipBtn.classList.add('copied');
            contactPartnershipText.textContent = t.contactCopied || 'E-mail Copiado! ✓';
            setTimeout(() => {
                contactPartnershipBtn.classList.remove('copied');
                contactPartnershipText.textContent = t.contactPartnershipText || 'Contato para Parcerias';
            }, 2500);
        }

        // Aciona o cliente de email via mailto de forma transparente
        try {
            const mailtoUrl = 'mailto:cscarlinhos@hotmail.com?subject=Contato%20-%20PDF%20Converter';
            if (window.electronAPI && window.electronAPI.openExternal) {
                await window.electronAPI.openExternal(mailtoUrl);
            }
        } catch (err) {
            console.warn('Erro ao abrir cliente de email:', err);
        }
    });
}

openPdfBtn.addEventListener('click', async () => {
    if (!lastSavedPdfPath) return;
    try {
        await window.electronAPI.openPath(lastSavedPdfPath);
    } catch (err) {
        showError(err.message);
    }
});

showInFolderBtn.addEventListener('click', async () => {
    try {
        if (lastSavedFolderPath) {
            await window.electronAPI.openPath(lastSavedFolderPath);
        } else if (lastSavedPdfPath) {
            await window.electronAPI.showItemInFolder(lastSavedPdfPath);
        }
    } catch (err) {
        showError(err.message);
    }
});

newConversionBtn.addEventListener('click', resetUI);
retryBtn.addEventListener('click', resetUI);

// Utilitários de escape e formatação de bytes
function formatFileSize(bytes) {
    if (!bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

function escapeHtml(str) {
    return String(str || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// Inicializa a aplicação
initLanguage();
