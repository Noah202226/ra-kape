"use client";
import React, { useState, useEffect } from "react";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // change threshold as needed
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const item1 = "Frappe";
  const item2 = "Coffee";
  const submenu1 = "Iced Coffee";
  const submenu2 = "Hot Coffee";
  const item3 = "Snacks";
  const item4 = "Contact";
  const item5 = "About Us";

  return (
    <div
      className={`navbar shadow-sm fixed top-0 left-0 w-npm transition-colors duration-300 z-50 ${
        scrolled ? "bg-white" : "bg-transparent"
      }`}
    >
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden border-amber-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-amber-700 text-white rounded-box z-1 mt-3 w-52 p-2 shadow-2xl text-5xl"
          >
            <li className="text-2xl">
              <a href="/frappe">{item1}</a>
            </li>
            <li>
              <a>{item2}</a>
              <ul className="p-2">
                <li>
                  <a href="iced-coffee">{submenu1}</a>
                </li>
                <li>
                  <a href="/hot-coffee">{submenu2}</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="/snacks">{item3}</a>
            </li>
            <li>
              <a href="/snacks">{item4}</a>
            </li>
            <li>
              <a href="/snacks">{item5}</a>
            </li>
          </ul>
        </div>
        <a href="/" className="btn btn-ghost text-lg">
          RA KAPE
        </a>
      </div>
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal px-1 ">
          <li>
            <a href="/frappe">{item1}</a>
          </li>
          <li>
            <details>
              <summary>{item2}</summary>
              <ul className="p-2">
                <li>
                  <a href="/iced-coffee">{submenu1}</a>
                </li>
                <li>
                  <a href="/hot-coffee">{submenu2}</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <a href="/snacks">{item3}</a>
          </li>
          <li>
            <a href="/contact">{item4}</a>
          </li>
          <li>
            <a href="/about">{item5}</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn bg-amber-700 border-0 hover:bg-amber-600">KAPE NA</a>
      </div>
    </div>
  );
}

export default Navbar;
