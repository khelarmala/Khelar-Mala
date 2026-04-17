import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/sections/HeroSection";
import AboutPreview from "@/components/sections/AboutPreview";
import PlayTherapySection from "@/components/sections/PlayTherapySection";
import TherapiesGrid from "@/components/sections/TherapiesGrid";
import ConditionsSection from "@/components/sections/ConditionsSection";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";
import FounderSection from "@/components/sections/FounderSection";
import ContactCTA from "@/components/sections/ContactCTA";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Khelar Mala - Where Play Meets Progress | Special Education Centre, Siliguri</title>
        <meta
          name="description"
          content="Khelar Mala offers holistic Play Therapy for children with Autism, ADHD, Down Syndrome & developmental delays. North Bengal's trusted centre since 1997."
        />
        <meta property="og:title" content="Khelar Mala - Where Play Meets Progress" />
        <meta property="og:description" content="Holistic Play Therapy for children with special needs. Serving families since 1997." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.khelarmala.in" />
      </Helmet>

      <Layout>
        <HeroSection />
        <AboutPreview />
        <PlayTherapySection />
        <TherapiesGrid />
        <ConditionsSection />
        <WhyChooseUsSection />
        <FounderSection />
        <ContactCTA />
      </Layout>
    </>
  );
};

export default Index;