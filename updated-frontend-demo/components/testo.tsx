import Image from 'next/image'

const testimonials = [
  {
    name: "Alena Zhukova",
    profession: "Ingénieure Logiciel",
    description:
      "Simple est l'outil parfait pour construire des interfaces utilisateur. Il est facile à utiliser et dispose de nombreuses fonctionnalités. Je l'utilise depuis un certain temps et je suis vraiment satisfaite des résultats.",
    avatar:
      "https://assets.basehub.com/fa068a12/uXVXN7g1Fc2EjO8OWn0HG/09.png?width=64&quality=90&format=auto",
    image:
      "https://res.cloudinary.com/dfhp33ufc/image/upload/v1715881430/vercel_wordmark_dark_mhv8u8.svg",
  },
  {
    name: "Aiko",
    profession: "Ingénieure en Design",
    description:
      "Simple est un excellent outil pour construire des interfaces utilisateur. Il est facile à utiliser et dispose de nombreuses fonctionnalités. Je l'utilise depuis un certain temps et je suis vraiment satisfaite des résultats.",
    avatar:
      "https://assets.basehub.com/fa068a12/uXVXN7g1Fc2EjO8OWn0HG/09.png?width=64&quality=90&format=auto",
    image:
      "https://res.cloudinary.com/dfhp33ufc/image/upload/v1715881430/vercel_wordmark_dark_mhv8u8.svg",
  },
  {
    name: "Alena Zhukova",
    profession: "Ingénieure Logiciel",
    description:
      "Simple est l'outil parfait pour construire des interfaces utilisateur. Il est facile à utiliser et dispose de nombreuses fonctionnalités. Je l'utilise depuis un certain temps et je suis vraiment satisfaite des résultats.",
    avatar:
      "https://assets.basehub.com/fa068a12/uXVXN7g1Fc2EjO8OWn0HG/09.png?width=64&quality=90&format=auto",
    image:
      "https://res.cloudinary.com/dfhp33ufc/image/upload/v1715881430/vercel_wordmark_dark_mhv8u8.svg",
  },
  {
    name: "Lisa Kemp",
    profession: "Développeuse Frontend",
    description:
      "Simple est un excellent outil pour construire des interfaces utilisateur. Il est facile à utiliser et dispose de nombreuses fonctionnalités. Je l'utilise depuis un certain temps et je suis vraiment satisfaite des résultats.",
    avatar:
      "https://assets.basehub.com/fa068a12/uXVXN7g1Fc2EjO8OWn0HG/09.png?width=64&quality=90&format=auto",
    image:
      "https://res.cloudinary.com/dfhp33ufc/image/upload/v1715881430/vercel_wordmark_dark_mhv8u8.svg",
  },
  {
    name: "Saud",
    profession: "Développeur de Jeux",
    description:
      "Simple est un excellent outil pour construire des interfaces utilisateur. Il est facile à utiliser et dispose de nombreuses fonctionnalités. Je l'utilise depuis un certain temps et je suis vraiment satisfait des résultats.",
    avatar:
      "https://assets.basehub.com/fa068a12/uXVXN7g1Fc2EjO8OWn0HG/09.png?width=64&quality=90&format=auto",
    image:
      "https://res.cloudinary.com/dfhp33ufc/image/upload/v1715881430/vercel_wordmark_dark_mhv8u8.svg",
  },
];

const FUITestimonialWithSlide = () => {
    return (
      <div className="w-full py-12">
        <div className="mx-auto w-full px-4 md:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl dark:text-white">
              What our clients say
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
              Trusted by leading manufacturers worldwide
            </p>
          </div>
  
          <div
            className="group relative mt-6 flex gap-6 overflow-hidden p-2"
            style={{
              maskImage: "linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 95%)",
              WebkitMaskImage: "linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 95%)"
            }}
          >
            {Array(3)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className="flex shrink-0 animate-x-slider flex-row justify-around gap-6"
                >
                  {testimonials.map((testimonial, key) => (
                    <div
                      key={key}
                      className="w-[80vw] sm:w-[60vw] md:w-[40vw] lg:w-[30vw] flex-shrink-0 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm"
                    >
                      <div className="flex flex-col h-full">
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                          &quot;{testimonial.description}&quot;
                        </p>
                        <div className="mt-auto border-t border-gray-200 dark:border-gray-800 pt-4">
                          <div className="flex items-center gap-4">
                            <img
                              src={testimonial.avatar}
                              alt={testimonial.name}
                              className="h-12 w-12 rounded-full"
                            />
                            <div>
                              <p className="font-medium text-gray-900 dark:text-gray-100">
                                {testimonial.name}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {testimonial.profession}
                              </p>
                            </div>
                            <img
                              src={testimonial.image}
                              alt="company logo"
                              className="h-8 w-auto ml-auto dark:invert"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default FUITestimonialWithSlide;

  