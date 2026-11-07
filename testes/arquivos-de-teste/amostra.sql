-- =======================================================
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
