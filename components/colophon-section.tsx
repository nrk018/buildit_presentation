"use client"
/**
 * Credits / Colophon — the last main section. Who’s on the team, who reviewed the video,
 * special thanks, and a link to your feedback form. In publishing, "colophon" is the
 * bit at the end of a book that says who made it; same idea here. Replace the placeholder
 * names and the form URL with your own.
 */
import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function ColophonSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  /**
   * Scroll animations: header slides in, then the grid columns stagger in, then the
   * footer (copyright line) fades in. Each ref is used by GSAP to know what to animate
   * and when (based on scroll position).
   */
  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      /* Header slide in */
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          x: -60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })
      }

      /* Grid columns (Team, Reviewers, Special Thanks) fade up with a small stagger. */
      if (gridRef.current) {
        const columns = gridRef.current.querySelectorAll(":scope > div")
        gsap.from(columns, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })
      }

      /* Footer (copyright line) fades in last. */
      if (footerRef.current) {
        gsap.from(footerRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="colophon"
      className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12 border-t border-border/30"
    >
      {/* Section header — id="colophon" is used by the side nav for "CREDITS". */}
      <div ref={headerRef} className="mb-16">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">BUILDIT</span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">CREDITS</h2>
      </div>

      {/* Multi-column layout — Team, Reviewers, Special Thanks. Add more columns or list items as needed. */}
      <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 md:gap-12">
        {/* Team — replace "joe doe" with your team member names. */}
        <div className="col-span-1">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Team</h4>
          <ul className="space-y-2">
            <li className="font-mono text-xs text-foreground/80">Reet Raj</li>
          </ul>
        </div>

        {/* Reviewers (in video) — people who gave feedback in your review video. */}
        <div className="col-span-1">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Project: Smart Campus Lost & Found</h4>
          <ul className="space-y-2">
            <li className="font-mono text-xs text-foreground/80"></li>
          </ul>
        </div>

        {/* Special Thanks — mentors, professors, facilitators. */}
        <div className="col-span-1">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">SPECIAL THANKS TO</h4>
          <ul className="space-y-2">
            <li className="font-mono text-xs text-foreground/80">Nirmal Rajkumar</li>
            <li className="font-mono text-[8px] uppercase tracking-[0.2em] text-muted-foreground/60 mt-2">meet a professor for ideation (mandatory)</li>
          </ul>
        </div>
      </div>

      {/* Bottom copyright — change the text to your team name and tagline. */}
      <div
        ref={footerRef}
        className="mt-24 pt-8 border-t border-border/20 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
          Tech Stack: Next.js, Tailwind CSS, TypeScript
        </p>
        <p className="font-mono text-[10px] text-muted-foreground">lets BUILDIT</p>
      </div>

      {/* Feedback Form — replace the href with your actual form link and the label with something like "Give feedback". */}
      <div className="mt-12 text-center">
        <ag
          href="https://forms.gle/aiyJBKZ4ZMV4EJqS8"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block font-mono text-sm text-foreground hover:text-accent transition-colors duration-200 border border-border/40 px-6 py-3 hover:border-accent"
        >
          add a form in this button.
        </a>
      </div>
    </section>
  )
}
