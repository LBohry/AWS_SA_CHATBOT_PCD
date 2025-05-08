import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { Spotlight } from './ui/spotlight-new';

interface FUIHeroWithJellyProps {
  title: string;
  subtitle: string;
  description: string;
  videoSrc: string;
}

const FUIHeroWithJelly = ({
  title,
  subtitle,
  description,
  videoSrc,
}: FUIHeroWithJellyProps) => {
  return (
    <section className="relative dark:text-white bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900">
        <Spotlight/>
      <div className="px-4 mx-auto sm:px-6 md:px-0">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          <div className="pb-12 text-center md:pb-16">
            <h1
              className="mb-6 border-y dark:border-none text-5xl max-w-3xl mx-auto font-normal tracking-tighter [border-image:linear-gradient(to_right,transparent,theme(colors.slate.300/.),transparent)1] md:text-6xl"
              data-aos="zoom-y-out"
              data-aos-delay={150}
            >
              {title}
              <br className="max-lg:hidden" />
              {subtitle}
            </h1>
            <div className="relative mx-auto max-w-3xl">
              <p
                className="mb-8 text-lg text-gray-700 dark:text-gray-300"
                data-aos="zoom-y-out"
                data-aos-delay={300}
              >
                {description}
              </p>
              <div className="relative before:absolute before:inset-0 before:border-y dark:before:border-none before:[border-image:linear-gradient(to_right,transparent,theme(colors.slate.300/.8),transparent)1]">
                <div
                  className="mx-auto z-20 max-w-xs mt-[-20px] mb-[20px] sm:flex sm:justify-center items-center sm:max-w-none gap-5"
                  data-aos="zoom-y-out"
                  data-aos-delay={450}
                >
                  <Link
                    href="/auth/register"
                    className="group inline-flex text-lg gap-x-2 mt-2 backdrop-blur-md text-white justify-center items-center py-3 px-5 ml-3 w-fit rounded-xl border duration-200 group bg-page-gradient border-white/30 text-md font-geistSans hover:border-zinc-600 hover:bg-transparent/10 hover:text-zinc-100"
                  >
                    Get Started
                    <div className="flex overflow-hidden relative justify-center items-center ml-1 w-5 h-5">
                      <ArrowUpRight className="absolute transition-all duration-500 group-hover:translate-x-4 group-hover:-translate-y-5" />
                      <ArrowUpRight className="absolute transition-all duration-500 -translate-x-4 -translate-y-5 group-hover:translate-x-0 group-hover:translate-y-0" />
                    </div>
                  </Link>
                  <Link
                    href="/detect"
                    className="group inline-flex text-lg gap-x-2 mt-2 backdrop-blur-md text-white justify-center items-center py-3 px-5 ml-3 w-fit rounded-xl border duration-200 group bg-transparent border-white/30 text-md font-geistSans hover:border-zinc-600 hover:bg-transparent/10 hover:text-zinc-100"
                  >
                    Try Demo
                    <div className="flex overflow-hidden relative justify-center items-center ml-1 w-5 h-5">
                      <ArrowUpRight className="absolute transition-all duration-500 group-hover:translate-x-4 group-hover:-translate-y-5" />
                      <ArrowUpRight className="absolute transition-all duration-500 -translate-x-4 -translate-y-5 group-hover:translate-x-0 group-hover:translate-y-0" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <video
            autoPlay
            loop
            muted
            playsInline
            src={videoSrc}
            className="w-full h-[400px] object-cover mt-0"
          />
          <div
            className="mx-auto max-w-3xl"
            data-aos="zoom-y-out"
            data-aos-delay={600}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default FUIHeroWithJelly;