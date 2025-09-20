import React from "react";

const BlogPage = () => {
  const sections = [
    {
      title: "Blogs",
      description:
        "Read insightful blogs written by experts and volunteers on mental health, awareness, and personal growth.",
      image: "/src/assets/blogs.jpg",
    },
    {
      title: "Stories",
      description:
        "Discover real-life stories of resilience and hope that inspire others to overcome mental health struggles.",
      image: "/src/assets/stories.jpg",
    },
    {
      title: "Podcasts",
      description:
        "Listen to engaging podcasts featuring discussions, expert advice, and inspiring conversations.",
      image: "/src/assets/podcasts.jpg",
    },
    {
      title: "Articles",
      description:
        "Explore in-depth articles backed by research, providing knowledge and awareness about mental health.",
      image: "/src/assets/articles.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-[#041e22] py-16">
      {/* Page Title */}
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
          Explore Our Resources
        </h1>
        <p className="text-lg text-gray-300 mt-3">
          Blogs, Stories, Podcasts & Articles to support your mental well-being
        </p>
      </header>

      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl">
          {sections.map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg overflow-hidden 
              hover:scale-105 hover:shadow-2xl transition-transform duration-300 cursor-pointer w-full h-72 flex flex-col"
            >
              <img
                className="w-full h-36 object-cover"
                src={item.image}
                alt={item.title}
              />
              <div className="p-4 flex-1 flex flex-col">
                <h2 className="text-xl font-semibold text-green-400 mb-2">
                  {item.title}
                </h2>
                <p className="text-gray-300 text-sm flex-1">
                  {item.description}
                </p>
                <a
                  href="#"
                  className="text-yellow-400 mt-3 inline-block font-medium hover:underline"
                >
                  Explore {item.title}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
