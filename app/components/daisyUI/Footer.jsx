import React from "react";

function Footer() {
  return (
    <footer
      className="
        relative 
        bg-[rgba(255,252,252,0.5)] 
        backdrop-blur-md 
        rounded-t-2xl
        overflow-hidden
      "
      data-aos="fade-up"
    >
      {/* Radial hover overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,204,128,0.15),_transparent)] opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 flex flex-col md:flex-row md:justify-between md:items-center gap-8">
        {/* Left nav */}
        <nav className="flex justify-center md:justify-start space-x-8 z-10">
          <a
            href="#about"
            className="relative text-gray-800 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-amber-700 after:transition-all after:duration-300 hover:after:w-full"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            About Us
          </a>
          <a
            href="#contact"
            className="relative text-gray-800 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-amber-700 after:transition-all after:duration-300 hover:after:w-full"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Contact
          </a>
        </nav>

        {/* Socials */}
        <nav className="flex justify-center space-x-8 z-10">
          <a
            href="#"
            className="transition-transform duration-300 hover:scale-110 hover:text-amber-700"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              className="fill-current hover:animate-bounce-slow"
            >
              <path d="M24 4.557c-.883.392-1.832.656-2.828..."></path>
            </svg>
          </a>
          <a
            href="#"
            className="transition-transform duration-300 hover:scale-110 hover:text-amber-700"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              className="fill-current hover:animate-bounce-slow"
            >
              <path d="M19.615 3.184c-3.604-.246-11.631..."></path>
            </svg>
          </a>
        </nav>

        {/* Right copyright */}
        <aside
          className="text-center md:text-right z-10"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <p className="text-sm md:text-base text-gray-700">
            © {new Date().getFullYear()} – All rights reserved by{" "}
            <span className="font-semibold text-[var(--title)]">RA KAPE</span>
          </p>
        </aside>
      </div>
    </footer>
  );
}

export default Footer;
