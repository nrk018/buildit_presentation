"use client"
/**
 * The "Solution" section — where you explain how you'd solve the problems. It's a grid of
 * steps that auto-highlights one by one when you scroll here, then highlights all, then
 * repeats. Good place to show your process or solution flow. Edit the `experiments` array
 * to change the steps (titles, descriptions, and grid sizes).
 */
import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

/** Your solution steps. "span" controls grid cell size (e.g. col-span-2 row-span-2 for a big card). */
const experiments = [
  {
    title: "User Registration",
    medium: "Step 1",
    description: "Students create profiles with verified campus email, listing skills they offer and skills they need.",
    span: "col-span-2 row-span-2",
  },
  {
    title: "Skill Discovery",
    medium: "Step 2",
    description: "Browse marketplace to find students offering needed skills, filtered by category and availability.",
    span: "col-span-1 row-span-1",
  },
  {
    title: "Direct Connection",
    medium: "Step 3",
    description: "Send skill exchange proposals through in-app messaging with schedule preferences.",
    span: "col-span-1 row-span-2",
  },
  {
    title: "Schedule Match",
    medium: "Step 4",
    description: "System suggests common free time slots for both parties to coordinate exchanges.",
    span: "col-span-1 row-span-1",
  },
  {
    title: "Skill Exchange",
    medium: "Step 5",
    description: "Meet online or in-person to trade skills: 1 hour of help for 1 hour received.",
    span: "col-span-2 row-span-1",
  },
  {
    title: "Review & Rate",
    medium: "Step 6",
    description: "Both parties rate the exchange quality, building trust scores for future matches.",
    span: "col-span-1 row-span-1",
  },
  {
    title: "Track Progress",
    medium: "Step 7",
    description: "Dashboard shows exchange history, skills learned, and community contribution level.",
    span: "col-span-1 row-span-1",
  },
  {
    title: "Community Growth",
    medium: "Step 8",
    description: "Active users unlock premium features and get priority matching with verified partners.",
    span: "col-span-1 row-span-1",
  },
]

export function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  /** Which step is currently highlighted (0-based index), or null when we're in "highlight all" phase. */
  const [highlightedStep, setHighlightedStep] = useState<number | null>(0)
  /** When true, every card is highlighted at once (after cycling through each step). */
  const [highlightAll, setHighlightAll] = useState(false)

  /** Scroll-in animation: header and grid cards animate in when the section enters view. */
  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !gridRef.current) return

    const ctx = gsap.context(() => {
      // Header slide in from left
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
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      )

      const cards = gridRef.current?.querySelectorAll("article")
      if (cards && cards.length > 0) {
        gsap.set(cards, { y: 60, opacity: 0 })
        gsap.to(cards, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  /**
   * Auto-highlight cycling: when you scroll this section into view, we highlight step 0,
   * then 1, 2, … then "highlight all", then start over. ScrollTrigger's onEnter / onLeaveBack
   * start the cycle; onLeave pauses it so we don't run timers when you're not looking.
   */
  useEffect(() => {
    if (!sectionRef.current) return

    let currentStep = 0
    let timeoutId: NodeJS.Timeout | null = null
    let isActive = false

    const cycleSteps = () => {
      if (!isActive) return
      
      if (currentStep < experiments.length) {
        // Highlight current step
        setHighlightedStep(currentStep)
        setHighlightAll(false)
        currentStep++
        timeoutId = setTimeout(cycleSteps, 5000) // 5 seconds per step
      } else {
        // After last step, highlight all for 5 seconds
        setHighlightAll(true)
        setHighlightedStep(null)
        currentStep = 0
        timeoutId = setTimeout(() => {
          // Restart cycle
          cycleSteps()
        }, 5000)
      }
    }

    const startCycle = () => {
      if (!isActive) {
        isActive = true
        currentStep = 0
        cycleSteps()
      }
    }

    // Use ScrollTrigger to detect when section enters viewport
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        onEnter: () => {
          startCycle()
        },
        once: false, // Allow it to restart if user scrolls away and back
        onLeave: () => {
          // Pause when leaving
          if (timeoutId) {
            clearTimeout(timeoutId)
            timeoutId = null
          }
          isActive = false
          setHighlightedStep(null)
          setHighlightAll(false)
        },
        onEnterBack: () => {
          // Resume when coming back
          startCycle()
        },
      })
    }, sectionRef)

    return () => {
      ctx.revert()
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [])

  return (
    <section ref={sectionRef} id="work" className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12">
      {/* Section header — id="work" is used by the side nav to scroll here. */}
      <div ref={headerRef} className="mb-16 flex items-end justify-between">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">02 / SOLUTION</span>
          <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">
            HOW SKILLSWAP <span className="text-accent">SOLVES</span> THESE <span className="text-red-500">PROBLEMS</span>
          </h2>
        </div>
        <p className="hidden md:block max-w-xs font-mono text-xs text-muted-foreground text-right leading-relaxed">
          peer-to-peer skill exchange platform
        </p>
      </div>

      {/* Asymmetric grid — each WorkCard gets its size from experiment.span (e.g. col-span-2 row-span-2). */}
      <div
        ref={gridRef}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[180px] md:auto-rows-[200px]"
      >
        {experiments.map((experiment, index) => (
          <WorkCard
            key={index}
            experiment={experiment}
            index={index}
            isHighlighted={highlightAll || highlightedStep === index}
          />
        ))}
      </div>
    </section>
  )
}

/** One step card. isHighlighted comes from the auto-cycle or from hover; when true the card gets accent border and shows description. */
function WorkCard({
  experiment,
  index,
  isHighlighted = false,
}: {
  experiment: {
    title: string
    medium: string
    description: string
    span: string
  }
  index: number
  isHighlighted?: boolean
}) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLElement>(null)

  /** Card looks "active" when either the user hovers it or the auto-highlight picked it. */
  const isActive = isHovered || isHighlighted

  return (
    <article
      ref={cardRef}
      className={cn(
        "group relative border border-border/40 p-5 flex flex-col justify-between transition-all duration-500 cursor-pointer overflow-hidden",
        experiment.span,
        isActive && "border-accent/60",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background layer */}
      <div
        className={cn(
          "absolute inset-0 bg-accent/5 transition-opacity duration-500",
          isActive ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Content */}
      <div className="relative z-10">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {experiment.medium}
        </span>
        <h3
          className={cn(
            "mt-3 font-[var(--font-bebas)] text-2xl md:text-4xl tracking-tight transition-colors duration-300",
            isActive ? "text-accent" : "text-foreground",
          )}
        >
          {experiment.title}
        </h3>
      </div>

      {/* Description - reveals on hover */}
      <div className="relative z-10">
        <p
          className={cn(
            "font-mono text-xs text-muted-foreground leading-relaxed transition-all duration-500 max-w-[280px]",
            isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
          )}
        >
          {experiment.description}
        </p>
      </div>

      {/* Index marker */}
      <span
        className={cn(
          "absolute bottom-4 right-4 font-mono text-[10px] transition-colors duration-300",
          isActive ? "text-accent" : "text-muted-foreground/40",
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Corner line */}
      <div
        className={cn(
          "absolute top-0 right-0 w-12 h-12 transition-all duration-500",
          isActive ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="absolute top-0 right-0 w-full h-[1px] bg-accent" />
        <div className="absolute top-0 right-0 w-[1px] h-full bg-accent" />
      </div>
    </article>
  )
}