import pypdf

reader = pypdf.PdfReader('public/Vishv Bhavsar Resume 2026.pdf')
with open('resume_extracted.txt', 'w', encoding='utf-8') as f:
    f.write(f'Total Pages: {len(reader.pages)}\n\n')
    for i, page in enumerate(reader.pages):
        f.write(f'=== PAGE {i+1} ===\n')
        f.write(page.extract_text() or '')
        f.write('\n\n')

print('Extracted successfully to resume_extracted.txt')
