
import { Heart } from 'lucide-react';
import { FadeIn } from './FadeIn';

export const SupportMessage = () => (
  <section className="py-32 bg-white text-center">
    <div className="max-w-4xl mx-auto px-4">
      <FadeIn>
        <Heart className="w-12 h-12 text-rose-400 mx-auto mb-8" fill="#fb7185" />
        <blockquote className="text-3xl md:text-5xl font-light italic text-slate-800 leading-tight mb-8">
          “You are not broken. You are human. <br className="hidden md:block" />
          And help is always available.”
        </blockquote>
        <p className="text-slate-500 font-medium">— The Serenity Team</p>
      </FadeIn>
    </div>
  </section>
);
