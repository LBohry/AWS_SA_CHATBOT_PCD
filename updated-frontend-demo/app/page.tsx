'use client';

import AnimatedLogoCloud from '@/components/AnimatedLogoCloudProps';
import FUIHeroSectionWithImage from '@/components/FUIHeroSectionWithImage';
import FUIHeroWithJelly from '@/components/FUIHeroWithJelly';
import PricingSection from '@/components/PricingSectionProps';
import FUITestimonialWithSlide from '@/components/testo';
import FUIFeatureSectionWithCards from '@/components/features';
import { Logo, Feature, Tier } from '@/interfaces/types';

const logos: Logo[] = [
  {
    name: 'Vercel',
    url: 'https://res.cloudinary.com/dfhp33ufc/image/upload/v1715881430/vercel_wordmark_dark_mhv8u8.svg',
  },
  {
    name: 'Nextjs',
    url: 'https://res.cloudinary.com/dfhp33ufc/image/upload/v1715881475/nextjs_logo_dark_gfkf8m.svg',
  },
  {
    name: 'Prime',
    url: 'https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276558/logos/t2awrrfzdvmg1chnzyfr.svg',
  },
  {
    name: 'Trustpilot',
    url: 'https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276558/logos/tkfspxqmjflfllbuqxsi.svg',
  },
  {
    name: 'Webflow',
    url: 'https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276560/logos/nymiivu48d5lywhf9rpf.svg',
  },
  {
    name: 'Airbnb',
    url: 'https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276558/logos/pmblusboe7vkw8vxdknx.svg',
  },
  {
    name: 'Tina',
    url: 'https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276560/logos/afqhiygywyphuou6xtxc.svg',
  },
  {
    name: 'Stackoverflow',
    url: 'https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276558/logos/ts1j4mkooxqmscgptafa.svg',
  },
  {
    name: 'Mistral',
    url: 'https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276558/logos/tyos2ayezryjskox3wzs.svg',
  },
];

const features: Feature[] = [
  'Advanced AI-powered defect detection',
  'Real-time analysis and reporting',
  'Interactive visualizations',
  'Export detailed reports',
  '24/7 technical support',
];



const navigation = [
  { title: 'Features', path: '/features' },
  { title: 'Integrations', path: '/integrations' },
  { title: 'Customers', path: '/customers' },
  { title: 'Pricing', path: '/pricing' },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Commented out the previous hero section */}
      {/* <FUIHeroWithJelly
        title="AI-Powered Textile Defect Detection"
        subtitle="for Quality Control"
        description="Revolutionize your quality control process with our advanced AI-powered defect detection system, streamlining analysis and reporting."
        videoSrc="https://ease-one.vercel.app/bg/something.mp4"
      /> */}

      {/* New hero section */}
      <FUIHeroSectionWithImage
        title="AI-Powered AWS Architecture Assistant"
        description="Design and optimize AWS architectures effortlessly with our intelligent assistant, powered by AI agents"
        logoSrc="https://www.farmui.com/logo.svg" // Replace with your logo URL
        newsLink="/news" // Replace with your news link
        navigation={navigation}
      />

      <AnimatedLogoCloud logos={logos} />
      
      <FUIFeatureSectionWithCards />
      <PricingSection  />
      <FUITestimonialWithSlide />
    </div>
  );
}