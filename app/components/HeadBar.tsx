"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";

export default function Headbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <header className="w-full px-4 sm:px-8 md:px-20 lg:px-40 py-3 sm:py-4 fixed top-3 md:block z-10">
        <nav className="flex items-center justify-between backdrop-blur-xl p-3 sm:p-4 rounded-3xl relative shadow-xl md:shadow-none bg-white/50">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link href={"/"}>
              <Image
                src={"/img/logo/cafegah-transparent.png"}
                width={1000}
                quality={100}
                height={1000}
                alt="Cafegah Logo"
                className="max-w-[48px] sm:max-w-[60px]"
              />
            </Link>
          </div>
          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-6 lg:gap-10 mr-4 lg:mr-14 font-bold flex-1">
            <li>
              <Link href="/">خانه</Link>
            </li>
            <li>
              <Link href="/#features">قابلیت ها</Link>
            </li>
            <li>
              <Link href="/#prices">قیمت ها</Link>
            </li>
            <li>
              <Link href="/#faq">سوالات متداول</Link>
            </li>
            {/* <li><Link href="/blog">بلاگ</Link></li> */}
            <li>
              <Link href="/about-us">درباره ما</Link>
            </li>
          </ul>
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center justify-end gap-2 lg:gap-4 flex-shrink-0">
            <div className="relative">
              <Link
                href="/login"
                className="rounded-2xl py-3 px-4 border border-teal-600 text-teal-600 font-bold hover:bg-teal-600 hover:text-white duration-200 hover:shadow-xl hover:shadow-teal-600/30 text-sm lg:text-base"
              >
                پنل تامین کنندگان
              </Link>
              <div className="absolute -top-6  right-0 bg-teal-600 text-white text-xs py-1 px-3 rounded-full">
                به زودی
              </div>
            </div>
            <Link
              href="/login"
              className="rounded-2xl py-3 px-4 bg-teal-600 text-white font-bold shadow-xl shadow-teal-600/30 text-sm lg:text-base"
            >
              شروع کنید !
            </Link>
          </div>
          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center justify-center p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="باز کردن منو"
          >
            <svg
              className="w-7 h-7 text-teal-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 8h16M4 16h16"
                />
              )}
            </svg>
          </button>
        </nav>
      </header>
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(!menuOpen)}
          className="fixed top-0 right-0 h-full w-full md:hidden flex justify-between bg-black/30 backdrop-blur-lg p-4 z-40"
        >
          <div className="w-2/3 bg-white rounded-3xl h-full p-4">
            <Link href={"/"}>
              <Image
                src={"/img/logo/FullLogo.png"}
                width={2000}
                height={2000}
                quality={100}
                className="max-w-[200px] mx-auto"
                alt="لوگو کافه گاه"
              ></Image>
            </Link>
            <div className="my-3 flex flex-col justify-between h-[90%]">
              <ul className="flex flex-col gap-2 py-4 px-2 space-y-4 text-sm border-t border-gray-100">
                <li>
                  <Link href="/" onClick={() => setMenuOpen(false)}>
                    خانه
                  </Link>
                </li>
                <li>
                  <Link href="/#features" onClick={() => setMenuOpen(false)}>
                    قابلیت ها
                  </Link>
                </li>
                <li>
                  <Link href="/#prices" onClick={() => setMenuOpen(false)}>
                    قیمت ها
                  </Link>
                </li>
                <li>
                  <Link href="/#faq" onClick={() => setMenuOpen(false)}>
                    سوالات متداول
                  </Link>
                </li>
                <li>
                  <Link href="/about-us" onClick={() => setMenuOpen(false)}>
                    درباره ما
                  </Link>
                </li>
              </ul>
              <div className="flex flex-col gap-2 pb-7">
                {/* <Link href="#" className="rounded-2xl py-3 px-4 border border-teal-600 text-teal-600 font-bold hover:bg-teal-600 hover:text-white duration-200 hover:shadow-xl hover:shadow-teal-600/30 text-sm text-center">پنل تامین کنندگان</Link> */}
                <Link
                  href="/login"
                  className="rounded-2xl py-3 px-4 bg-teal-600 text-white font-bold shadow-xl shadow-teal-600/30 text-sm text-center"
                >
                  شروع کنید !
                </Link>
              </div>
            </div>
          </div>
          <div className="w-1/3"></div>
        </div>
      )}
    </>
  );
}
