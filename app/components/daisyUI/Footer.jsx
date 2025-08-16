import React from "react";

function Footer() {
  return (
    <footer
      className="
        footer 
        flex flex-col md:flex-row md:justify-between items-center 
        text-black 
        bg-[rgba(255,252,252,0.4)] 
        backdrop-blur-md 
        rounded-t-xl 
        p-10 
        max-w-7xl mx-auto mt-12 
        relative overflow-hidden
      "
      data-aos="fade-up"
    >
      {/* Radial gradient hover overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,204,128,0.2),_transparent)] opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"></div>

      <nav className="mb-6 md:mb-0 flex space-x-6 z-10">
        <a
          className="link link-hover relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-amber-700 after:transition-all after:duration-300 hover:after:w-full"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          About us
        </a>
        <a
          className="link link-hover relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-amber-700 after:transition-all after:duration-300 hover:after:w-full"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Contact
        </a>
      </nav>

      <nav className="flex space-x-6 mb-6 md:mb-0 z-10">
        <a
          className="transition-transform duration-300 hover:scale-110 hover:text-amber-700"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            className="fill-current hover:animate-bounce-slow"
          >
            <path d="M24 4.557c-.883.392-1.832.656-2.828.775..."></path>
          </svg>
        </a>
        <a
          className="transition-transform duration-300 hover:scale-110 hover:text-amber-700"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            className="fill-current hover:animate-bounce-slow"
          >
            <path d="M19.615 3.184c-3.604-.246-11.631..."></path>
          </svg>
        </a>
      </nav>

      <aside
        className="text-center md:text-right z-10"
        data-aos="fade-up"
        data-aos-delay="600"
      >
        <p className="text-sm text-gray-700">
          © {new Date().getFullYear()} - All rights reserved by{" "}
          <span className="font-semibold text-[var(--title)]">RA KAPE</span>
        </p>
      </aside>
    </footer>
  );
}

export default Footer;
