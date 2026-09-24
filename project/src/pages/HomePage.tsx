import Hero from '@/components/Hero';
import ServiceCarousel from '@/components/ServiceCarousel';
import WhyChooseUs from '@/components/WhyChooseUs';
import HowItWorks from '@/components/HowItWorks';
import BookingForm from '@/components/BookingForm';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServiceCarousel />
      <WhyChooseUs />
      <HowItWorks />
      <BookingForm />
      <FAQ />
      <Contact />
    </>
  );
}
