import React from "react";

export default function FUIFeatureSectionWithCards() {
  // Updated features array to reflect the AWS architecture assistant
  const features = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H15a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.07 2.33A4.5 4.5 0 0 0 2.25 15Z"
          />
        </svg>
      ),
      title: "AI-Powered Recommendations",
      desc: "Leverage advanced AI agents to generate optimized AWS architecture solutions tailored to your needs.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
          />
        </svg>
      ),
      title: "Retrieval-Augmented Generation",
      desc: "Utilize RAG to provide contextually relevant responses by integrating external AWS documentation.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M15.75 21v-1.5m-7.5 0v1.5m7.5-18h1.5m-15 0H3m12.75 12.75h1.5m-12-1.5H3m12.75-5.25H18M6 6.75H3m3 9H3"
          />
        </svg>
      ),
      title: "Fine-Tuned Language Models",
      desc: "Employ a fine-tuned LLaMA model to generate accurate AWS architecture diagrams and code.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
          />
        </svg>
      ),
      title: "Multi-Agent Collaboration",
      desc: "Coordinate specialized AI agents to ensure comprehensive architecture recommendations.",
    },
  ];

  return (
    <section className="py-14 relative">
      <div className="max-w-screen-xl mx-auto px-4 text-purple-800 dark:text-gray-400 md:px-8">
        <div className="relative max-w-2xl mx-auto sm:text-center">
          <div className="relative z-10">
            <h3 className="text-purple-900 dark:text-gray-200 mt-4 text-3xl font-normal font-geist tracking-tighter md:text-5xl sm:text-4xl">
              Streamline AWS Architecture Design
            </h3>
            <p className="mt-3 font-geist text-purple-700 dark:text-gray-200">
              Our AI-powered assistant simplifies AWS architecture design by generating optimized solutions and providing real-time recommendations, empowering architects to make informed decisions.
            </p>
          </div>
          <div
            className="absolute inset-0 max-w-xs mx-auto h-44 blur-[118px]"
            style={{
              background:
                "linear-gradient(152.92deg, rgba(126, 34, 206, 0.2) 4.54%, rgba(76, 29, 149, 0.26) 34.2%, rgba(107, 33, 168, 0.1) 77.55%)",
            }}
          ></div>
        </div>
        <hr className="bg-purple-300 dark:bg-white/30 h-px w-1/2 mx-auto mt-5" />
        <div className="relative mt-12">
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((item, idx) => (
              <li
                key={idx}
                className="bg-purple-50 dark:bg-transparent space-y-3 p-4 border rounded-xl transform-gpu border-purple-200 dark:border-white/10 shadow-sm dark:shadow-none"
              >
                <div className="text-purple-600 rounded-full p-4 w-fit bg-purple-100 dark:bg-transparent border border-purple-200 dark:border-white/10">
                  {item.icon}
                </div>
                <h4 className="text-lg text-purple-900 dark:text-gray-300 font-bold font-geist tracking-tighter">
                  {item.title}
                </h4>
                <p className="text-purple-700 dark:text-gray-500">{item.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}