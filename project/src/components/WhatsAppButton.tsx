import { useState, useEffect } from 'react';
import { MessageCircle, Phone, UserPlus } from 'lucide-react';
import { whatsappLink, telLink, vCardUrl } from '@/utils/links';
import { business } from '@/data/content';

export default function WhatsAppButton() {
  const [showSave, setShowSave] = useState(false);
  const [vUrl, setVUrl] = useState('');

  useEffect(() => {
    return () => { if (vUrl) URL.revokeObjectURL(vUrl); };
  }, [vUrl]);

  const handleSaveContact = () => {
    const url = vCardUrl();
    setVUrl(url);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'MD-Fashion-Boutique.vcf';
    a.click();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3">
      {showSave && (
        <div className="flex flex-col gap-2 animate-fade-up">
          <a
            href={telLink()}
            className="flex items-center gap-2 bg-navy-700 text-white px-4 py-2.5 rounded-full shadow-card text-sm font-semibold hover:bg-navy-600 transition-colors"
          >
            <Phone size={16} /> Call
          </a>
          <button
            onClick={handleSaveContact}
            className="flex items-center gap-2 bg-gold-500 text-navy-700 px-4 py-2.5 rounded-full shadow-card text-sm font-semibold hover:bg-gold-400 transition-colors"
          >
            <UserPlus size={16} /> Save Contact
          </button>
        </div>
      )}
      <button
        onClick={() => setShowSave(!showSave)}
        className="relative flex items-center justify-center w-11 h-11 rounded-full bg-navy-700 text-gold-400 shadow-card hover:bg-navy-600 transition-colors"
        aria-label="More options"
      >
        <UserPlus size={18} />
      </button>
      <a
        href={whatsappLink(`Hello ${business.name}, I'd like to know more about your services.`)}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:scale-110 transition-transform"
        aria-label="WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse-ring" />
        <MessageCircle size={28} className="relative" />
      </a>
    </div>
  );
}
