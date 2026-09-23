import { business } from '@/data/content';

export function whatsappLink(message: string): string {
  return `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function telLink(): string {
  return `tel:${business.phone}`;
}

export function vCardUrl(): string {
  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${business.name}`,
    `ORG:${business.name}`,
    `TITLE:${business.role}`,
    `TEL;TYPE=CELL,VOICE:${business.whatsapp}`,
    `TEL;TYPE=WORK,VOICE:${business.phone}`,
    `EMAIL:${business.email}`,
    `ADR;TYPE=WORK:;;# 5/281, V.O.C. Street, Periyar, Vyasarpadi;Chennai;Tamil Nadu;600039;India`,
    `ADR;TYPE=WORK:;;No. 26, SSV Kovil 3rd Street, Ramana Nagar, Perambur;Chennai;Tamil Nadu;600011;India`,
    'URL:https://mdfashionboutique.com',
    'END:VCARD',
  ].join('\n');
  return URL.createObjectURL(new Blob([vcard], { type: 'text/vcard' }));
}
