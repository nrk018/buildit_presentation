"use client"
/**
 * This is the "Problems being addressed" section — the first content block after the hero.
 * Same idea as hero: a component that owns its own layout, data (the problems list),
 * and scroll/hover animations. Edit the `signals` array below to change the problem cards.
 */
import { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

/** Your problem statements. Each object becomes one card. Change title and note to match your project. */
const signals = [
  {
    date: "",
    title: "FRAGMENTED COMMUNICATION",
    note: "UNIVERSITEIS rely on multiple platforms like whatsapp, emails and notice boards,causing imformation to get lost ",
  },
  {
    date: "",
    title: "Missed Announcements",
    note: "Students often miss exam schedules, deadlines and event updates due tot he lak of a central system",
  },
  {
    date: "",
    title: "Inefficient Event Coordination",
    note: "Clubs and departments struggle to manage event registrations, updates, and participation effectively.",
  },
  {
    date: "",
    title: "Disconnected Stakeholders",
    note: "Students, faculty, and administration work in silos without a unified platform connecting them.",
  },
  {
    date: "",
    title: "Information Overload",
    note: "Important updates get buried under casual messages, making it hard to identify what truly matters.",
  },
  {
    date: "",
    title: "No Official Digital Hub",
    note: "Universities lack a trusted single platform for announcements, collaboration, and engagement.",
  },
]

export function SignalsSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  /** useState: when this changes, React re-renders and the cursor dot shows/hides. */
  const [isHovering, setIsHovering] = useState(false)

  /**
   * First useEffect: custom cursor. When the mouse moves over this section we move a
   * small circle to follow it. We add event listeners in the effect and remove them
   * in the return (cleanup) so we don’t leak listeners when the component unmounts.
   */
  useEffect(() => {
    if (!sectionRef.current || !cursorRef.current) return

    const section = sectionRef.current
    const cursor = cursorRef.current

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      gsap.to(cursor, {
        x: x,
        y: y,
        duration: 0.5,
        ease: "power3.out",
      })
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    section.addEventListener("mousemove", handleMouseMove)
    section.addEventListener("mouseenter", handleMouseEnter)
    section.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      section.removeEventListener("mousemove", handleMouseMove)
      section.removeEventListener("mouseenter", handleMouseEnter)
      section.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  /**
   * Second useEffect: scroll animations. When you scroll this section into view,
   * the header slides in from the left and the cards stagger in. GSAP ScrollTrigger
   * handles the "when in view" part; we clean up with ctx.revert() on unmount.
   */
  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !cardsRef.current) return

    const ctx = gsap.context(() => {
      /* Header slide in from left */
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

      const cards = cardsRef.current?.querySelectorAll("article")
      if (cards) {
        gsap.fromTo(
          cards,
          { x: -100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="signals" ref={sectionRef} className="relative py-32 pl-6 md:pl-28">
      {/* The dot that follows the mouse in this section; pointer-events-none so it doesn’t block clicks. */}
      <div
        ref={cursorRef}
        className={cn(
          "pointer-events-none absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-50",
          "w-12 h-12 rounded-full border-2 border-accent bg-accent",
          "transition-opacity duration-300",
          isHovering ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Section header — ref used by GSAP for the slide-in animation. */}
      <div ref={headerRef} className="mb-16 pr-6 md:pr-12">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">01 / PROBLEM IDENTIFICATION</span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">
          <span className="text-red-500">PROBLEMS</span> BEING ADDRESSED
        </h2>
      </div>

      {/* Horizontal scroll container — same div is used as scrollRef and cardsRef so we can animate the cards. */}
      <div
        ref={(el) => {
          scrollRef.current = el
          cardsRef.current = el
        }}
        className="flex gap-8 overflow-x-auto pb-8 pr-12 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* .map() loops over signals and renders one SignalCard per item. key helps React track which item is which. */}
        {signals.map((signal, index) => (
          <SignalCard key={index} signal={signal} index={index} />
        ))}
      </div>
    </section>
  )
}

/** Small sub-component for one problem card. Keeps the main component shorter and lets us reuse the card layout. */
function SignalCard({
  signal,
  index,
}: {
  signal: { date: string; title: string; note: string }
  index: number
}) {
  return (
    <article
      className={cn(
        "group relative flex-shrink-0 w-80 h-[400px]",
        "transition-transform duration-500 ease-out",
        "hover:-translate-y-2",
      )}
    >
      {/* Card with paper texture effect */}
      <div className="relative h-full flex flex-col bg-card border border-border/50 md:border-t md:border-l md:border-r-0 md:border-b-0 p-8">
        {/* Top torn edge effect */}
        <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />

        {/* Issue number - editorial style */}
        <div className="flex items-baseline justify-between mb-8">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            No. {String(index + 1).padStart(2, "0")}
          </span>
          {signal.date && <time className="font-mono text-[10px] text-muted-foreground/60">{signal.date}</time>}
        </div>

        {/* Title */}
        <h3 className="font-[var(--font-bebas)] text-4xl tracking-tight mb-4 group-hover:text-accent transition-colors duration-300">
          {signal.title}
        </h3>

        {/* Divider line */}
        <div className="w-12 h-px bg-accent/60 mb-6 group-hover:w-full transition-all duration-500" />

        {/* Description */}
        <p className="font-mono text-xs text-muted-foreground leading-relaxed flex-1">{signal.note}</p>

        {/* Bottom right corner fold effect */}
        <div className="absolute bottom-0 right-0 w-6 h-6 overflow-hidden">
          <div className="absolute bottom-0 right-0 w-8 h-8 bg-background rotate-45 translate-x-4 translate-y-4 border-t border-l border-border/30" />
        </div>
      </div>

      {/* Shadow/depth layer */}
      <div className="absolute inset-0 -z-10 translate-x-1 translate-y-1 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </article>
  )
}
