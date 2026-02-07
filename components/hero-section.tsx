"use client"
/**
 * Hmm, well — you have entered the main section of the website. See how it works.
 * This is the Hero: the first thing visitors see. In Next.js, each big chunk of the
 * page is often its own "component" like this. We use "use client" here because
 * this section uses React hooks (useEffect, useRef) and animations that run in the
 * browser; Next.js needs to know this isn’t just static HTML.
 */
import { useEffect, useRef } from "react"
import { ScrambleTextOnHover } from "@/components/scramble-text"
import { SplitFlapText, SplitFlapMuteToggle, SplitFlapAudioProvider } from "@/components/split-flap-text"
import { AnimatedNoise } from "@/components/animated-noise"
import { BitmapChevron } from "@/components/bitmap-chevron"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

/** Tell GSAP we want to use ScrollTrigger — it ties animations to scroll position. */
gsap.registerPlugin(ScrollTrigger)

/**
 * This is the component function. When Next.js renders the page, it calls HeroSection()
 * and whatever we return is what shows up. The "export" makes it available to import
 * in app/page.tsx (that’s where the full page is assembled).
 */
export function HeroSection() {
  /** useRef gives us a handle to a DOM element so we can animate it or measure it. No re-render when .current changes. */
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  /**
   * useEffect runs after the component is on the screen. We use it to set up the
   * "scroll away" animation: as you scroll, the hero content moves up and fades out.
   * The return () => ctx.revert() cleans up when the component unmounts so we don’t leave
   * listeners or animations running.
   */
  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return

    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        y: -100,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  /**
   * What we return is JSX — HTML-like syntax that React turns into real DOM.
   * ref={sectionRef} attaches our ref to this <section> so the code above can use it.
   * id="hero" is used by the side nav to scroll here when you click "BUILDIT".
   */
  return (
    <section ref={sectionRef} id="hero" className="relative min-h-screen flex items-center pl-6 md:pl-28 pr-6 md:pr-12">
      {/* Subtle animated grain overlay so it doesn’t look flat. */}
      <AnimatedNoise opacity={0.03} />

      {/* Left vertical labels — that small "SIGNAL" text on the side. */}
      <div className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground -rotate-90 origin-left block whitespace-nowrap">
          SIGNAL
        </span>
      </div>

      {/* Main content — ref={contentRef} is what we animate (move up / fade out) on scroll. */}
      <div ref={contentRef} className="flex-1 w-full">
        {/* Wraps the flip-board title and mute button so they can share audio state. */}
        <SplitFlapAudioProvider>
          <div className="relative">
            <SplitFlapText text="UNISYNC" speed={80} />
            <div className="mt-4">
              <SplitFlapMuteToggle />
            </div>
          </div>
        </SplitFlapAudioProvider>

        {/* Tagline — change this to match your project. */}
        <h2 className="font-[var(--font-bebas)] text-muted-foreground/60 text-[clamp(1rem,3vw,2rem)] mt-4 tracking-wide">
          ONE PLATFORM, ONE UNIVERSITY, COMPLETE SYNC  .
        </h2>

        {/* Short description. Replace with your own pitch. */}
        <p className="mt-12 max-w-lg font-mono text-sm text-muted-foreground leading-relaxed text-justify">
          UniSync is a centralized university platform designed to streamline communication, manage events, and keep students connected in one place.

        </p>

        {/* Buttons: #signals scrolls to the Problems section on the same page; /lean-canvas is another route. */}
        <div className="mt-16 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-4 sm:gap-8">
          <a
            href="#signals"
            className="group inline-flex items-center justify-center gap-3 border border-foreground/20 px-6 py-3 font-mono text-xs uppercase tracking-widest text-foreground hover:border-accent hover:text-accent transition-all duration-200"
          >
            <ScrambleTextOnHover text="EXPLORE UNISYNC" as="span" duration={0.6} />
            <BitmapChevron className="transition-transform duration-[400ms] ease-in-out group-hover:rotate-45" />
          </a>
          <a
            href="/lean-canvas"
            className="group inline-flex items-center justify-center gap-3 border border-foreground/20 px-6 py-3 font-mono text-xs uppercase tracking-widest text-foreground hover:border-accent hover:text-accent transition-all duration-200"
          >
            <ScrambleTextOnHover text="LEAN CANVAS" as="span" duration={0.6} />
            <BitmapChevron className="transition-transform duration-[400ms] ease-in-out group-hover:rotate-45" />
          </a>
          <a
            href="https://swj.builditmuj.club"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-3 border border-foreground/20 px-6 py-3 font-mono text-xs uppercase tracking-widest text-foreground hover:border-accent hover:text-accent transition-all duration-200"
          >
            <ScrambleTextOnHover text="PROTOTYPE" as="span" duration={0.6} />
            <BitmapChevron className="transition-transform duration-[400ms] ease-in-out group-hover:rotate-45 shrink-0" />
          </a>
        </div>
      </div>

      {/* Floating info tag — event name / label, you can change the text. */}
      <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12">
        <div className="border border-border px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          BUILDIT | UNISYNC PROJECT 
        </div>
      </div>
    </section>
  )
}
