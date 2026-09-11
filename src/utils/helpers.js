/**
 * Utility helpers
 */

export function scrollToSection(sectionId, customOffset) {
  if (typeof window === 'undefined') return;

  const cleanId = sectionId.replace('#', '');
  const element = document.getElementById(cleanId);
  if (!element) return;

  // Header offset: 64px on mobile screens, 80px on larger displays
  const isMobile = window.innerWidth < 768;
  const navOffset = customOffset ?? (isMobile ? 64 : 80);

  const rect = element.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  const targetY = Math.max(0, Math.round(rect.top + scrollTop - navOffset));

  // If already at the target within a tiny threshold, avoid redundant scrolling
  if (Math.abs(scrollTop - targetY) < 4) return;

  try {
    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });
  } catch {
    window.scrollTo(0, targetY);
  }
}

export function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  } else {
    // Fallback for non-secure contexts
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    return new Promise((resolve, reject) => {
      const successful = document.execCommand('copy');
      if (successful) {
        resolve();
      } else {
        reject(new Error('Copy failed'));
      }
      textArea.remove();
    });
  }
}

export function downloadVCard(info) {
  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${info.name}`,
    `N:Bhavsar;Vishv;;;`,
    `ORG:GLS University`,
    `TITLE:${info.roleTitle}`,
    `EMAIL;type=INTERNET;type=WORK:${info.contact?.email || 'vishvbhavsar2004@gmail.com'}`,
    `TEL;type=CELL:${info.contact?.phone || '+919924014723'}`,
    `URL:${info.contact?.portfolioUrl || 'https://vishv05.github.io/Portfolio/'}`,
    `ADR;type=WORK:;;${info.location || 'Ahmedabad, Gujarat, India'};;;;`,
    `X-SOCIALPROFILE;type=linkedin:${info.contact?.linkedIn || ''}`,
    `X-SOCIALPROFILE;type=github:${info.contact?.github || ''}`,
    `NOTE:${info.heroSubtitle || ''}`,
    'END:VCARD'
  ].join('\r\n');

  const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${(info.name || 'Vishv_Bhavsar').replace(/\s+/g, '_')}_Contact.vcf`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
