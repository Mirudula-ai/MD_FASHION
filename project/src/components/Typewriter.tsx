import { useEffect, useState } from 'react';

const words = ['Bridal Blouses', 'Aari Work', 'Designer Frocks', 'Lehengas', 'School Uniforms'];

export default function Typewriter() {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && text === current) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    } else {
      timeout = setTimeout(() => {
        setText((prev) =>
          isDeleting ? current.substring(0, prev.length - 1) : current.substring(0, prev.length + 1)
        );
      }, isDeleting ? 50 : 120);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex]);

  return (
    <span className="text-gold-500 font-heading font-semibold">
      {text}
      <span className="inline-block w-0.5 h-6 bg-gold-500 ml-1 animate-pulse" />
    </span>
  );
}
