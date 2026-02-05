"use client"
/**
 * Project review video section. Put your demo or feedback video here. Right now it’s
 * a placeholder box — when you have a YouTube (or other) embed URL, replace the inner
 * div with an <iframe> using that URL so the video actually plays on the page.
 */
import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const videoWrapperRef = useRef<HTMLDivElement>(null)

  /** Scroll-in animation: header and video area slide in when the section enters view. */
  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !videoWrapperRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      )
      gsap.fromTo(
        videoWrapperRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: videoWrapperRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="video" ref={sectionRef} className="relative py-32 pl-6 md:pl-28">
      {/* Section header — id="video" is used by the side nav. */}
      <div ref={headerRef} className="mb-12 pr-6 md:pr-12">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">02.5 / Video</span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">
          PROJECT REVIEW <span className="text-accent">VIDEO</span>
        </h2>
      </div>

      {/* Instructional text — you can change or remove this. */}
      <div className="mb-10 pr-6 md:pr-12 max-w-3xl">
      </div>

      {/* Video placeholder — replace this whole div with an <iframe> when you have your video embed URL. */}
      <div>
        <iframe 
          width="948" 
          height="535" 
          style={{ border: "1px solid white", boxShadow: "0px 0px 30px rgba(169, 118, 81, 0.5)" }}
          src="https://www.youtube.com/embed/yZjtAanN2U0" 
          title="BUILDFOLIO review video" 
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerPolicy="strict-origin-when-cross-origin" 
          allowFullScreen>
        </iframe>
      </div>
    </section>
  )
}
