import React, { useState, useEffect } from "react";
import Cover from "./components/Cover";
import Countdown from "./components/Countdown";
import MusicPlayer from "./components/MusicPlayer";
import RSVPForm from "./components/RSVPForm";
import RegistryCard from "./components/RegistryCard";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const storyItems = [
    {
      image: "/foto3.jpeg",
      badge: "AWAL MULA",
      title: "Pertemuan Tak Terduga",
    },
    {
      image: "/foto5.jpeg",
      badge: "BAHAGIA BERSAMA",
      title: "Kisah Kita",
    },
    {
      image: "/foto4.jpeg",
      badge: "KASIH & CINTA",
      title: "Momen Kebersamaan",
    },
    {
      image: "/foto2.jpeg",
      badge: "MENUJU HALAL",
      title: "Janji Suci",
    },
  ];

  const nextStory = () => {
    setCurrentStoryIndex((prev) => (prev + 1) % storyItems.length);
  };

  const prevStory = () => {
    setCurrentStoryIndex((prev) => (prev - 1 + storyItems.length) % storyItems.length);
  };

  // Lock scroll when cover is active
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  // Reveal on scroll (Intersection Observer)
  useEffect(() => {
    if (!isOpen) return;

    const observerOptions = {
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, [isOpen]);

  // Navigation active highlighting on scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleScroll = () => {
      const sections = document.querySelectorAll("section, header");
      let current = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 150) {
          current = section.getAttribute("id") || "";
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  const navLinks = [
    { name: "Our Story", href: "#story", id: "story" },
    { name: "Event Details", href: "#details", id: "details" },
    { name: "Gallery", href: "#gallery", id: "gallery" },
    { name: "Registry", href: "#registry", id: "registry" },
  ];

  const bottomNavLinks = [
    { name: "Story", href: "#story", id: "story", icon: "favorite" },
    { name: "Acara", href: "#details", id: "details", icon: "event" },
    { name: "Galeri", href: "#gallery", id: "gallery", icon: "photo_library" },
    { name: "Kado", href: "#registry", id: "registry", icon: "card_giftcard" },
    { name: "RSVP", href: "#rsvp", id: "rsvp", icon: "mail" },
  ];

  const getNavLinkClass = (linkId) => {
    const baseClass = "font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors pb-1";
    const activeClass = " text-primary font-bold border-b-2 border-primary";
    return activeSection === linkId ? `${baseClass}${activeClass}` : baseClass;
  };

  const getBottomNavLinkClass = (linkId) => {
    const isActive = activeSection === linkId;
    const iconClass = isActive
      ? "text-primary scale-110 font-bold"
      : "text-on-surface-variant/60 hover:text-primary";
    const labelClass = isActive
      ? "text-[10px] font-bold text-primary tracking-wider mt-1 scale-100"
      : "text-[10px] font-medium text-on-surface-variant/60 mt-1 scale-95";
    return { iconClass, labelClass, isActive };
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen text-on-surface bg-surface font-body-md overflow-x-hidden">
      {/* 1. Welcome Cover Screen */}
      <div
        className={`fixed inset-0 z-[100] transition-all duration-[1200ms] ease-in-out ${isOpen ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0"
          }`}
      >
        <Cover onOpen={() => { setIsOpen(true); setIsPlaying(true); }} />
      </div>

      {/* 2. Floating Music Player */}
      {isOpen && (
        <MusicPlayer isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      )}

      {/* Main Wedding Content Container */}
      <div className={`${isOpen ? "block" : "hidden md:block opacity-20 pointer-events-none max-h-screen overflow-hidden"}`}>
        {/* Navigation Bar - Desktop Only */}
        <nav className="hidden md:block fixed top-0 w-full z-50 bg-surface/80 dark:bg-surface-dim/80 backdrop-blur-md border-b border-outline-variant/30">
          <div className="flex justify-between items-center px-gutter py-stack-md max-w-container-max mx-auto">
            <span className="font-headline-sm text-headline-sm text-primary">
              Pratu M.Ihsan Adi Putra &amp; Nurul Ilmy Ikbal, S.Kes
            </span>

            {/* Desktop Navigation */}
            <div className="flex gap-stack-lg items-center">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={getNavLinkClass(link.id)}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#rsvp"
                onClick={(e) => handleNavClick(e, "#rsvp")}
                className="bg-primary text-on-primary px-stack-lg py-2 rounded-full font-label-caps text-label-caps hover:bg-primary-container transition-all"
              >
                RSVP
              </a>
            </div>
          </div>
        </nav>

        {/* Navigation Bar - Mobile Bottom Navbar */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface/90 dark:bg-surface-dim/90 backdrop-blur-lg border-t border-outline-variant/30 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] pb-[env(safe-area-inset-bottom,16px)] pt-2 px-2 flex justify-around items-center">
          {bottomNavLinks.map((link) => {
            const { iconClass, labelClass, isActive } = getBottomNavLinkClass(link.id);
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="flex flex-col items-center justify-center flex-1 py-1 transition-all duration-200"
              >
                {/* Background pill effect on active icon */}
                <div className={`flex items-center justify-center w-12 h-7 rounded-full transition-all duration-300 ${isActive ? "bg-primary/15" : "bg-transparent"
                  }`}>
                  <span className={`material-symbols-outlined text-2xl transition-all duration-300 ${iconClass}`}>
                    {link.icon}
                  </span>
                </div>
                <span className={`transition-all duration-300 ${labelClass}`}>
                  {link.name}
                </span>
              </a>
            );
          })}
        </nav>

        {/* Hero Section */}
        <header id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              className="w-full h-full object-cover object-[center_15%] md:object-center opacity-90 scale-105 animate-[pulse_10s_ease-in-out_infinite]"
              src="/fotobackground.jpeg"
              alt="Ikhsan &amp; Ny Ikhsan Wedding Venue"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-surface/20 via-transparent to-surface"></div>
          </div>
          <div className="relative z-10 text-center px-gutter max-w-4xl">
            <span className="font-label-caps text-label-caps text-primary tracking-[0.4em] mb-stack-md block">
              SAVE THE DATE
            </span>
            <h1 className="font-display-lg text-3xl sm:text-4xl md:text-5xl text-primary mb-stack-sm drop-shadow-md flex flex-col items-center leading-tight gap-1 text-center">
              <span>Pratu M.Ihsan Adi Putra</span>
              <span className="text-2xl sm:text-3xl italic font-serif my-1 text-primary/80">&amp;</span>
              <span>Nurul Ilmy Ikbal, S.Kes</span>
            </h1>
            <p className="font-headline-sm text-headline-sm italic text-secondary mb-stack-lg">
              Minggu, 02 Agustus 2026
            </p>
            <Countdown />
          </div>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <span className="material-symbols-outlined text-primary opacity-50 text-3xl">
              keyboard_double_arrow_down
            </span>
          </div>
        </header>

        {/* Introduction */}
        <section className="py-section-padding-mobile md:py-section-padding-desktop px-gutter relative botanical-bg overflow-hidden">
          <div className="max-w-3xl mx-auto text-center reveal">
            <span
              className="material-symbols-outlined text-primary-container text-4xl mb-stack-md"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              favorite
            </span>
            <p className="font-body-lg text-body-lg text-on-surface-variant italic leading-relaxed">
              "Di mana pun engkau berada, di sanalah rumahku. Cintamu adalah cahaya yang menuntun jalanku pulang."
            </p>
            <div className="w-20 h-px bg-outline-variant mx-auto my-stack-lg"></div>
            <h2 className="font-headline-md text-headline-md text-on-surface mb-stack-md">
              Selamat Datang di Hari Bahagia Kami
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
              Kehadiran dan doa restu Anda adalah kado terindah bagi kami. Mari rayakan awal perjalanan hidup baru kami bersama dalam suasana penuh cinta dan kehangatan.
            </p>
          </div>
        </section>

        {/* Our Story (Bento Style) */}
        <section className="py-section-padding-mobile md:py-section-padding-desktop bg-surface-container-low" id="story">
          <div className="max-w-container-max mx-auto px-gutter">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">

              <div className="md:col-span-8 reveal">
                <div className="relative group overflow-hidden rounded-xl h-[400px] shadow-sm">
                  <img
                    key={currentStoryIndex}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    src={storyItems[currentStoryIndex].image}
                    alt={storyItems[currentStoryIndex].title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end justify-between p-stack-lg pointer-events-none">
                    <div>
                      <span className="font-label-caps text-white/80 mb-2 block tracking-widest">
                        {storyItems[currentStoryIndex].badge}
                      </span>
                      <h3 className="font-headline-sm text-white">
                        {storyItems[currentStoryIndex].title}
                      </h3>
                    </div>

                    {/* Navigation Dots */}
                    <div className="flex gap-1.5 mb-1 pointer-events-auto">
                      {storyItems.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentStoryIndex(idx)}
                          className={`h-2 rounded-full transition-all duration-300 ${idx === currentStoryIndex ? "bg-white w-6" : "bg-white/50 w-2"
                            }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Left Arrow */}
                  <button
                    onClick={prevStory}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition-all opacity-80 hover:opacity-100 active:scale-95 z-10"
                    aria-label="Previous Slide"
                  >
                    <span className="material-symbols-outlined">chevron_left</span>
                  </button>

                  {/* Right Arrow */}
                  <button
                    onClick={nextStory}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition-all opacity-80 hover:opacity-100 active:scale-95 z-10"
                    aria-label="Next Slide"
                  >
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>
                </div>
              </div>

              <div className="md:col-span-4 reveal" style={{ transitionDelay: "200ms" }}>
                <div className="bg-surface-container-high p-stack-lg rounded-xl h-full flex flex-col justify-center border border-outline-variant/20 shadow-sm">
                  <h4 className="font-headline-sm text-primary mb-6">Perjalanan Kita</h4>
                  <div className="relative pl-10 space-y-6">
                    {/* Vertical Line */}
                    <div className="absolute left-5 top-2 bottom-2 w-[1px] bg-primary-container/30"></div>

                    {/* Item 1 */}
                    <div className="relative">
                      {/* Timeline Icon */}
                      <div className="absolute -left-[38px] top-0.5 w-9 h-9 flex items-center justify-center z-10">
                        <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-sm">
                          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white shadow-inner">
                            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                              school
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="pl-2">
                        <span className="text-[10px] text-primary/70 font-semibold tracking-widest uppercase block mb-0.5">
                          Awal Mula — 31 Januari 2025
                        </span>
                        <h5 className="font-headline-sm text-sm text-primary font-semibold mb-2">
                          Pertemuan Pertama
                        </h5>
                        <div className="bg-surface/60 dark:bg-surface-dim/60 p-3.5 rounded-xl border border-outline-variant/30 shadow-sm">
                          <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
                            Kisah kami dimulai dari sebuah jembatan sederhana bernama Rizky. Sebagai adik, dialah yang pertama kali mengenalkan perempuan luar biasa ini kepada saya. Sebuah pertemuan awal yang singkat, namun ternyata menjadi awal dari segalanya.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Item 2 */}
                    <div className="relative">
                      {/* Timeline Icon */}
                      <div className="absolute -left-[38px] top-0.5 w-9 h-9 flex items-center justify-center z-10">
                        <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-sm">
                          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white shadow-inner">
                            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                              favorite
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="pl-2">
                        <span className="text-[10px] text-primary/70 font-semibold tracking-widest uppercase block mb-0.5">
                          Kedekatan
                        </span>
                        <h5 className="font-headline-sm text-sm text-primary font-semibold mb-2">
                          Menjalin Kedekatan
                        </h5>
                        <div className="bg-surface/60 dark:bg-surface-dim/60 p-3.5 rounded-xl border border-outline-variant/30 shadow-sm">
                          <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
                            Dari perkenalan itu, obrolan kami mulai mengalir. Rasa canggung perlahan berubah menjadi kecocokan, dan kenyamanan itu menuntun kami untuk saling menjaga hati. Rizky yang awalnya hanya mengenalkan, kini menjadi saksi bagaimana hubungan kami tumbuh semakin kuat setiap harinya.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Item 3 */}
                    <div className="relative">
                      {/* Timeline Icon */}
                      <div className="absolute -left-[38px] top-0.5 w-9 h-9 flex items-center justify-center z-10">
                        <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-sm animate-pulse">
                          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white shadow-inner">
                            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                              diamond
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="pl-2">
                        <span className="text-[10px] text-primary/70 font-semibold tracking-widest uppercase block mb-0.5">
                          Komitmen — 15 Juni 2026
                        </span>
                        <h5 className="font-headline-sm text-sm text-primary font-semibold mb-2">
                          Mengikat Janji
                        </h5>
                        <div className="bg-surface/60 dark:bg-surface-dim/60 p-3.5 rounded-xl border border-outline-variant/30 shadow-sm">
                          <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
                            Kini, setelah melewati proses perjalanan bersama, keyakinan kami sudah bulat. Dari sebuah perkenalan yang diinisiasi oleh seorang adik, kami bersiap melangkah ke babak paling sakral: mengikat janji suci di pelaminan sebagai suami istri.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-4 reveal" style={{ transitionDelay: "400ms" }}>
                <div className="relative h-[300px] rounded-xl overflow-hidden shadow-sm">
                  <img
                    className="w-full h-full object-cover"
                    src="/story-flowers.png"
                    alt="Pressed flowers in notebook"
                  />
                </div>
              </div>

              <div className="md:col-span-8 reveal" style={{ transitionDelay: "600ms" }}>
                <div className="bg-primary text-on-primary p-stack-lg rounded-xl h-full flex flex-col justify-center items-center text-center shadow-md">
                  <span
                    className="material-symbols-outlined text-4xl mb-4"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    auto_awesome
                  </span>
                  <p className="font-headline-sm max-w-lg">
                    "Dua jiwa, satu detak jantung. Bersama, kita menulis bab baru."
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Event Details */}
        <section className="py-section-padding-mobile md:py-section-padding-desktop relative bg-surface-container-low" id="details">
          <div className="max-w-xl mx-auto px-gutter">
            <h2 className="font-display-lg text-headline-md md:text-headline-md text-center text-primary mb-stack-lg">
              Detail Acara
            </h2>

            <div className="bg-surface-container-lowest p-stack-lg md:p-12 border border-outline-variant/30 rounded-xl reveal flex flex-col items-center text-center shadow-sm">
              {/* Save The Date Block */}
              <span className="material-symbols-outlined text-secondary text-5xl mb-4">
                calendar_month
              </span>
              <h3 className="font-label-caps text-label-caps text-primary tracking-widest mb-2">Save The Date</h3>
              <p className="font-headline-sm text-headline-sm text-on-surface mb-2 font-semibold">
                Minggu, 02 Agustus 2026
              </p>
              <div className="font-body-lg text-body-lg text-on-surface-variant mb-6 font-medium max-w-lg leading-relaxed flex flex-col gap-1">
                <span>Resepsi: 10.00 WITA - Sampai Selesai</span>
                <span>Akad Nikah: Sultan Alauddin Hotel &amp; Convention pada tanggal 26 Juli 2026</span>
              </div>

              {/* Countdown Divider */}
              <div className="w-full h-px bg-outline-variant/20 my-6"></div>

              {/* Countdown Component */}
              <div className="w-full mb-6">
                <Countdown />
              </div>

              {/* Location Divider */}
              <div className="w-full h-px bg-outline-variant/20 my-6"></div>

              {/* Location Block */}
              <span className="material-symbols-outlined text-secondary text-5xl mb-4">
                location_on
              </span>
              <h3 className="font-label-caps text-label-caps text-primary tracking-widest mb-2">Lokasi Acara</h3>
              <p className="font-body-lg text-body-lg text-on-surface mb-4 leading-relaxed max-w-md flex flex-col gap-1">
                <span>Lingkungan Pure 1 (Sd Inpres Pure)</span>
                <span>Kec. Kalukku,Kab. Mamuju Sulawesi Barat</span>
              </p>

              {/* Embedded Google Map */}
              <div className="w-full h-64 sm:h-80 rounded-xl overflow-hidden my-6 border border-outline-variant/30 shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31886.49663029139!2d119.02671373885525!3d-2.567828311284466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d92e7a67620231b%3A0xd1e6c15ffc1f02f4!2sSD%20inpres%20pure!5e0!3m2!1sid!2sid!4v1782742033602!5m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Peta Lokasi Acara"
                ></iframe>
              </div>

              <a
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-on-primary hover:bg-primary-container px-8 py-3 rounded-full font-label-caps text-label-caps tracking-widest transition-all duration-300 transform hover:scale-105 shadow-md active:scale-95"
                href="https://maps.google.com/?q=SD+inpres+pure"
              >
                <span className="material-symbols-outlined text-sm">map</span>
                BUKA DI GOOGLE MAPS
              </a>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-section-padding-mobile md:py-section-padding-desktop bg-surface-container-highest/30" id="gallery">
          <div className="max-w-container-max mx-auto px-gutter">
            <div className="flex flex-col md:flex-row justify-between items-end mb-stack-lg gap-4">
              <div>
                <span className="font-label-caps text-primary tracking-widest">MEMORI KITA</span>
                <h2 className="font-display-lg text-headline-md md:text-headline-md">Galeri Foto</h2>
              </div>
              <p className="max-w-md font-body-md text-on-surface-variant">
                Setiap foto bercerita tentang tawa, cinta, dan janji yang kami pegang teguh.
              </p>
            </div>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">

              <div className="break-inside-avoid reveal">
                <img
                  className="w-full rounded-lg shadow-sm border border-white p-2 bg-white object-cover"
                  src="/foto1.jpeg"
                  alt="Foto Galeri 1"
                />
              </div>

              <div className="break-inside-avoid reveal">
                <img
                  className="w-full rounded-lg shadow-sm border border-white p-2 bg-white object-cover"
                  src="/foto2.jpeg"
                  alt="Foto Galeri 2"
                />
              </div>

              <div className="break-inside-avoid reveal">
                <img
                  className="w-full rounded-lg shadow-sm border border-white p-2 bg-white object-cover"
                  src="/foto3.jpeg"
                  alt="Foto Galeri 3"
                />
              </div>

              <div className="break-inside-avoid reveal">
                <img
                  className="w-full rounded-lg shadow-sm border border-white p-2 bg-white object-cover"
                  src="/foto4.jpeg"
                  alt="Foto Galeri 4"
                />
              </div>

              <div className="break-inside-avoid reveal">
                <img
                  className="w-full rounded-lg shadow-sm border border-white p-2 bg-white object-cover"
                  src="/foto5.jpeg"
                  alt="Foto Galeri 5"
                />
              </div>

            </div>
          </div>
        </section>

        {/* RSVP Section */}
        <section className="py-section-padding-mobile md:py-section-padding-desktop px-gutter relative" id="rsvp">
          <div className="reveal">
            <RSVPForm />
          </div>
        </section>

        {/* Registry */}
        <section className="py-section-padding-mobile md:py-section-padding-desktop bg-surface-container-low text-center px-gutter" id="registry">
          <div className="max-w-xl mx-auto reveal">
            <span className="material-symbols-outlined text-secondary text-4xl mb-4">
              featured_seasonal_and_gifts
            </span>
            <h2 className="font-headline-md text-headline-md text-on-surface mb-stack-md">
              Kado Pernikahan
            </h2>
            <p className="font-body-md text-on-surface-variant mb-stack-lg leading-relaxed">
              Doa restu Anda adalah yang terpenting bagi kami. Namun, jika Anda berencana untuk memberikan tanda kasih, Anda dapat melakukannya melalui tautan atau rekening berikut:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <RegistryCard
                bankName="BSI"
                accountNumber="7304905004"
                accountHolder="Nurul Ilmy"
              />
              <RegistryCard
                bankName="BSI"
                accountNumber="7349304157"
                accountHolder="M.Ihsan Adi Putra"
              />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full pt-section-padding-mobile pb-28 md:py-stack-lg bg-surface-container-low dark:bg-surface-dim border-t border-outline-variant/20">
          <div className="flex flex-col items-center gap-stack-md text-center px-gutter w-full">
            <div className="font-headline-sm text-headline-sm text-primary flex flex-col items-center leading-tight gap-1">
              <span>Pratu M.Ihsan Adi Putra</span>
              <span className="text-xl italic font-serif my-0.5 text-primary/80">&amp;</span>
              <span>Nurul Ilmy Ikbal, S.Kes</span>
            </div>
            <p className="font-body-md text-body-md text-secondary">
              With Love, Pratu M.Ihsan Adi Putra &amp; Nurul Ilmy Ikbal, S.Kes — 2026
            </p>
            <div className="flex gap-stack-lg">
              <a
                className="font-body-md text-on-secondary-fixed-variant hover:text-primary transition-opacity opacity-90"
                href="#home"
                onClick={(e) => handleNavClick(e, "#home")}
              >
                Back to Top
              </a>
              <a
                className="font-body-md text-on-secondary-fixed-variant hover:text-primary transition-opacity opacity-90"
                href="#details"
                onClick={(e) => handleNavClick(e, "#details")}
              >
                Event Details
              </a>
            </div>
            <div className="mt-stack-md">
              <p className="text-[10px] text-on-surface-variant/50 tracking-tighter">
                Designed for an Eternal Beginning
              </p>
              <p className="text-[10px] text-on-surface-variant/50 tracking-tighter mt-1">
                Created by Abd rahman Ilham L
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
