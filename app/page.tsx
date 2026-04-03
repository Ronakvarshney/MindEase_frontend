import { Community } from "@/components/Community";
import { FinalCTA } from "@/components/CTA";
import { Features } from "@/components/Features";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/How_it_works";
import { SupportMessage } from "@/components/Support";

export default function Home() {
  return (
    <div>
      <Hero />
      <Features />
      <SupportMessage />
      <HowItWorks />

      <Community />
      <FinalCTA/>
    </div>
  );
}
