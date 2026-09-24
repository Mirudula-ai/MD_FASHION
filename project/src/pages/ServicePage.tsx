import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, MessageCircle, Scissors } from 'lucide-react';
import { getService, services as servicesRaw } from '@/data/services';
import { localizeService } from '@/data/servicesTa';
import { images } from '@/data/images';
import { business } from '@/data/content';
import { whatsappLink } from '@/utils/links';
import { useLang } from '@/components/LanguageContext';
import ServiceImage from '@/components/ServiceImage';
import MagneticButton from '@/components/MagneticButton';
import Reveal from '@/components/Reveal';

export default function ServicePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t, lang } = useLang();
  const services = servicesRaw.map((s) => localizeService(s, lang));
  const rawService = slug ? getService(slug) : undefined;
  const service = rawService ? localizeService(rawService, lang) : undefined;

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 px-4">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold text-navy-700 mb-4">Service not found</h1>
          <MagneticButton onClick={() => navigate('/')} variant="gold">
            <ArrowLeft size={18} /> Back Home
          </MagneticButton>
        </div>
      </div>
    );
  }

  const serviceImages = images.services[service.slug as keyof typeof images.services];
  const otherServices = services.filter((s) => s.slug !== service.slug);

  const waMessage = `Hello ${business.name}, I'm interested in your ${service.name} service. Could you share more details?`;

  return (
    <div className="pt-20 animate-fade-in">
      {/* Hero photo */}
      <section className="relative h-[50vh] sm:h-[60vh] overflow-hidden">
        <ServiceImage
          src={serviceImages.hero}
          alt={service.name}
          eager
          className="w-full h-full object-cover"
          fallbackLabel={service.name}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-700/20 via-transparent to-ivory/80" />
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-navy-700 mb-2 drop-shadow-lg">
              {service.name}
            </h1>
            <p className="text-navy-600 text-base sm:text-lg font-medium drop-shadow-md">
              {service.tagline}
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-navy-500 hover:text-gold-500 transition-colors mb-8 font-medium text-sm"
        >
          <ArrowLeft size={18} /> {t('Back', 'பின்')}
        </button>

        {/* Description */}
        <Reveal>
          <p className="text-navy-600 text-base sm:text-lg leading-relaxed mb-10">
            {service.description}
          </p>
        </Reveal>

        {/* What we offer */}
        <Reveal>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-navy-700 mb-5">
            {t('What We Offer', 'என்ன செய்கிறோம்')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
            {service.offerings.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gold-100 shadow-soft"
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gold-100 flex items-center justify-center mt-0.5">
                  <Check size={14} className="text-gold-600" />
                </div>
                <span className="text-navy-600 text-sm sm:text-base">{item}</span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Gallery */}
        <Reveal>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-navy-700 mb-5">
            {t('Gallery', 'படத்தொகுப்பு')}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-12">
            {serviceImages.gallery.map((src, i) => (
              <div
                key={i}
                className="aspect-square rounded-2xl overflow-hidden shadow-soft border border-gold-100 group cursor-pointer"
              >
                <ServiceImage
                  src={src}
                  alt={`${service.name} ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  fallbackLabel={service.shortName}
                />
              </div>
            ))}
          </div>
        </Reveal>

        {/* How we stitch it */}
        <Reveal>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-navy-700 mb-5">
            {t('How We Stitch It', 'எப்படி தைக்கிறோம்')}
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 mb-12 overflow-x-auto no-scrollbar">
            {service.steps.map((step, i) => (
              <div
                key={i}
                className="flex-shrink-0 bg-white rounded-2xl p-5 border border-gold-100 shadow-soft w-full sm:w-56"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-navy-700 text-gold-400 text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center">
                    {i + 1}
                  </span>
                  <h3 className="font-heading font-bold text-navy-700 text-sm">{step.title}</h3>
                </div>
                <p className="text-navy-500 text-xs leading-relaxed">{step.detail}</p>
                {i < service.steps.length - 1 && (
                  <div className="hidden sm:block text-gold-300 text-xl mt-3">→</div>
                )}
              </div>
            ))}
          </div>
        </Reveal>

        {/* Book on WhatsApp */}
        <Reveal>
          <div className="bg-gradient-to-r from-gold-50 via-blush to-sky rounded-3xl p-6 sm:p-8 text-center mb-12 border border-gold-200">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-navy-700 mb-3">
              {t('Book This Service', 'இந்த சேவையை பதிவு செய்யவும்')}
            </h2>
            <p className="text-navy-500 mb-5 text-sm sm:text-base">
              {t("Send us a message on WhatsApp and we'll get back to you quickly.", 'WhatsApp-ல் செய்தி அனுப்புங்கள், விரைவில் பதிலளிப்போம்.')}
            </p>
            <MagneticButton
              as="a"
              href={whatsappLink(waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              variant="whatsapp"
              size="lg"
            >
              <MessageCircle size={20} /> {t('Book on WhatsApp', 'WhatsApp-ல் பதிவு')}
            </MagneticButton>
          </div>
        </Reveal>

        {/* Other services */}
        <Reveal>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-navy-700 mb-5">
            {t('Other Services', 'மற்ற சேவைகள்')}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className="group bg-white rounded-xl p-4 border border-gold-100 shadow-soft hover:shadow-card hover:border-gold-300 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-gold-50 flex items-center justify-center mb-3 group-hover:bg-gold-100 transition-colors">
                  <Scissors size={18} className="text-gold-500" />
                </div>
                <h3 className="font-heading font-semibold text-navy-700 text-xs sm:text-sm leading-tight group-hover:text-gold-500 transition-colors">
                  {s.shortName}
                </h3>
                <span className="text-gold-500 text-xs flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {t('View', 'பார்')} <ArrowRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
