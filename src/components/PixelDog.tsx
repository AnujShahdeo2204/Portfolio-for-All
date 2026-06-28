import React, { useEffect, useState, useRef } from "react";
import { MessageSquare } from "lucide-react";

// Interactive custom speech library
const DOG_QUOTES = [
  "Woof! Welcome to the gallery. ❤️",
  "Are you looking for a Senior Frontend Engineer? Let's talk!",
  "Double click me to make me jump! 🚀",
  "Aura Dashboard is built with React and D3.js! Super snappy!",
  "Hover over Technical Arsenal chips to see skill details!",
  "I love clean typography and spacious margins! 📐",
  "Did you know the resume viewer has direct printing options?",
  "Zzz... catching up on my server code. 😴",
  "Let's build something epic! Send us a message below!"
];

interface FlatDogSVGProps {
  state: "idle" | "happy" | "wag" | "jump" | "sleep";
  animFrame: number;
}

function FlatDogSVG({ state, animFrame }: FlatDogSVGProps) {
  // Eye drawing
  const renderEyes = () => {
    if (state === "sleep") {
      // Curved sleeping line eyes
      return (
        <>
          <path d="M 36,36 Q 40,40 44,36" stroke="#453027" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M 56,36 Q 60,40 64,36" stroke="#453027" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </>
      );
    }
    if (state === "happy") {
      // Happy arches ^ ^
      return (
        <>
          <path d="M 36,38 Q 40,32 44,38" stroke="#161316" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M 56,38 Q 60,32 64,38" stroke="#161316" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </>
      );
    }
    // Idle/Wag/Jump: Open round eyes with white highlights
    return (
      <>
        {/* Left Eye */}
        <circle cx="40" cy="36" r="4.5" fill="#161316" />
        <circle cx="38.5" cy="34.5" r="1.5" fill="#FFFFFF" />
        {/* Right Eye */}
        <circle cx="60" cy="36" r="4.5" fill="#161316" />
        <circle cx="58.5" cy="34.5" r="1.5" fill="#FFFFFF" />
      </>
    );
  };

  // Mouth/Snout
  const renderSnout = () => {
    return (
      <>
        <rect x="42" y="39" width="16" height="13" rx="6" fill="#FFB085" />
        <ellipse cx="50" cy="42" rx="4.5" ry="3" fill="#161316" />
        {state === "happy" ? (
          <path d="M 47,48 Q 50,54 53,48 Z" fill="#FF8A9F" />
        ) : (
          <path d="M 50,44 L 50,47" stroke="#161316" strokeWidth="1.5" strokeLinecap="round" />
        )}
      </>
    );
  };

  // Ears
  const renderEars = () => {
    const leftEarRotation = state === "jump" ? "rotate(25, 30, 24)" : "rotate(10, 30, 24)";
    const rightEarRotation = state === "jump" ? "rotate(-25, 70, 24)" : "rotate(-10, 70, 24)";
    return (
      <>
        <rect x="25" y="24" width="9" height="22" rx="4.5" transform={leftEarRotation} fill="#453027" />
        <rect x="66" y="24" width="9" height="22" rx="4.5" transform={rightEarRotation} fill="#453027" />
      </>
    );
  };

  // Tail
  const renderTail = () => {
    let tailD = "M 64,58 C 74,53 77,38 75,32"; // default idle tail
    if (state === "wag") {
      tailD = animFrame === 0 
        ? "M 64,58 C 76,50 79,34 77,26" 
        : "M 64,58 C 70,62 76,55 79,48"; 
    } else if (state === "sleep") {
      tailD = "M 64,58 C 70,64 74,68 76,72"; 
    } else if (state === "happy") {
      tailD = animFrame === 0 
        ? "M 64,58 C 76,46 80,32 78,24" 
        : "M 64,58 C 74,54 78,48 76,42";
    }

    return (
      <path 
        d={tailD} 
        stroke="#FF6D29" 
        strokeWidth="5" 
        strokeLinecap="round" 
        fill="none" 
        className="transition-all duration-200"
      />
    );
  };

  // Legs and Paws (All 4 legs clearly visible)
  const renderLegs = () => {
    const legY = state === "jump" ? 76 : 72; 
    const legH = state === "jump" ? 18 : 15;
    const pawY = legY + legH - 1;

    return (
      <>
        {/* Back Leg 2 (far side) */}
        <rect x="59" y={legY - 2} width="6" height={legH} rx="3" fill="#B34B19" />
        <rect x="59" y={pawY} width="6" height="4" rx="2" fill="#FFFFFF" />

        {/* Back Leg 1 (far side) */}
        <rect x="35" y={legY - 2} width="6" height={legH} rx="3" fill="#B34B19" />
        <rect x="35" y={pawY} width="6" height="4" rx="2" fill="#FFFFFF" />

        {/* Front Leg 2 */}
        <rect x="51" y={legY} width="6" height={legH} rx="3" fill="#FF6D29" />
        <rect x="51" y={pawY} width="6" height="4" rx="2" fill="#FFFFFF" />

        {/* Front Leg 1 */}
        <rect x="43" y={legY} width="6" height={legH} rx="3" fill="#FF6D29" />
        <rect x="43" y={pawY} width="6" height="4" rx="2" fill="#FFFFFF" />
      </>
    );
  };

  const jumpOffset = state === "jump" ? -10 : 0;

  return (
    <svg 
      viewBox="0 0 100 100" 
      width="100%" 
      height="100%" 
      className="w-24 h-24 select-none pointer-events-none transition-transform duration-200"
      style={{ transform: `translateY(${jumpOffset}px)` }}
    >
      {/* 1. Tail */}
      {renderTail()}

      {/* 2. Legs and paws */}
      {renderLegs()}

      {/* 3. Body */}
      <rect x="36" y="50" width="28" height="28" rx="12" fill="#FF6D29" />
      
      {/* Chest highlights */}
      <path d="M 40,54 Q 50,62 60,54 Q 50,72 40,54 Z" fill="#FFFFFF" opacity="0.9" />

      {/* 4. Collar */}
      <rect x="42" y="48" width="16" height="3" rx="1.5" fill="#161316" />
      <circle cx="50" cy="51" r="1.5" fill="#FFB085" />

      {/* 5. Head */}
      <circle cx="50" cy="33" r="15" fill="#FF6D29" />

      {/* 6. Ears */}
      {renderEars()}

      {/* 7. Eyes */}
      {renderEyes()}

      {/* 8. Snout & Nose */}
      {renderSnout()}
    </svg>
  );
}

export default function PixelDog() {
  const [bubbleText, setBubbleText] = useState(DOG_QUOTES[0]);
  const [showBubble, setShowBubble] = useState(false);
  const [dogState, setDogState] = useState<"idle" | "happy" | "wag" | "jump" | "sleep">("idle");
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [animFrame, setAnimFrame] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const currentOffset = useRef({ x: 0, y: 0 });

  const sectionIds = ["work", "about", "projects", "contact"];

  // Cycle states randomly every few seconds
  useEffect(() => {
    const states: ("idle" | "happy" | "wag" | "sleep")[] = ["idle", "happy", "wag", "sleep"];
    const interval = setInterval(() => {
      if (dogState !== "jump") {
        const nextState = states[Math.floor(Math.random() * states.length)];
        setDogState(nextState);
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [dogState]);

  // Periodic attention gestures
  useEffect(() => {
    const interval = setInterval(() => {
      if (dogState === "idle" || dogState === "sleep") {
        const rand = Math.random();
        if (rand < 0.4) {
          setDogState("jump");
          setTimeout(() => setDogState("idle"), 1200);
        } else if (rand < 0.8) {
          setDogState("wag");
          setTimeout(() => setDogState("idle"), 2000);
        }
      }
    }, 12000); // Trigger every 12 seconds
    return () => clearInterval(interval);
  }, [dogState]);

  // Handle animation frames for tail wagging
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (dogState === "wag" || dogState === "happy") {
      interval = setInterval(() => {
        setAnimFrame((prev) => (prev === 0 ? 1 : 0));
      }, 200);
    } else {
      setAnimFrame(0);
    }
    return () => clearInterval(interval);
  }, [dogState]);

  // Click/tap handler to say something and navigate to the next section
  const handleDogClick = (e: React.MouseEvent) => {
    if (isDragging) return;
    e.stopPropagation();

    // Say something
    const randomQuote = DOG_QUOTES[Math.floor(Math.random() * DOG_QUOTES.length)];
    setBubbleText(randomQuote);
    setShowBubble(true);
    setDogState("happy");

    // Scroll to next section
    let closestSectionIdx = 0;
    let minDistance = Infinity;

    sectionIds.forEach((id, idx) => {
      const el = document.getElementById(id);
      if (el) {
        const distance = Math.abs(el.getBoundingClientRect().top);
        if (distance < minDistance) {
          minDistance = distance;
          closestSectionIdx = idx;
        }
      }
    });

    const nextIdx = (closestSectionIdx + 1) % sectionIds.length;
    const nextSectionId = sectionIds[nextIdx];
    const targetEl = document.getElementById(nextSectionId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
    }

    setTimeout(() => {
      setDogState("idle");
    }, 2000);
  };

  // Double click handler to jump
  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDogState("jump");
    setBubbleText("Wheeeee! Woof! 🐕💨");
    setShowBubble(true);
    
    setTimeout(() => {
      setDogState("idle");
    }, 1200);
  };

  // Dragging event handlers for mouse
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    dragStartPos.current = {
      x: e.clientX - currentOffset.current.x,
      y: e.clientY - currentOffset.current.y
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const newX = e.clientX - dragStartPos.current.x;
      const newY = e.clientY - dragStartPos.current.y;
      currentOffset.current = { x: newX, y: newY };
      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  // Dragging event handlers for touch (Mobile support)
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    const touch = e.touches[0];
    dragStartPos.current = {
      x: touch.clientX - currentOffset.current.x,
      y: touch.clientY - currentOffset.current.y
    };
  };

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      const touch = e.touches[0];
      const newX = touch.clientX - dragStartPos.current.x;
      const newY = touch.clientY - dragStartPos.current.y;
      currentOffset.current = { x: newX, y: newY };
      setPosition({ x: newX, y: newY });
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("touchmove", handleTouchMove, { passive: false });
      document.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging]);

  const getDogIconStyle = () => {
    let classes = "w-20 h-20 transition-transform duration-300 ";
    if (dogState === "jump") {
      classes += "dog-jumping ";
    } else if (dogState === "wag") {
      classes += "dog-wagging ";
    } else if (dogState === "sleep") {
      classes += "opacity-60 scale-95 ";
    }
    return classes;
  };

  return (
    <div 
      ref={containerRef}
      id="draggable-dog"
      style={{ 
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        touchAction: "none"
      }}
      className="fixed bottom-32 right-8 z-40 flex flex-col items-end transition-shadow"
    >
      {/* Dynamic Bubble text */}
      <div 
        className={`mb-3 bg-surface-theme/90 backdrop-blur-md px-4 py-3 rounded-2xl font-sans text-xs font-semibold text-text-theme shadow-lg max-w-[225px] transition-all duration-300 text-left border border-border-theme ${
          showBubble 
            ? "opacity-100 scale-100 translate-y-0" 
            : "opacity-0 scale-95 translate-y-2 pointer-events-none"
        }`}
      >
        <div className="flex items-start gap-1.5">
          <MessageSquare className="w-4 h-4 text-secondary-theme flex-shrink-0 mt-0.5" />
          <p className="leading-normal text-[11px] font-medium tracking-wide">
            {bubbleText}
          </p>
        </div>
      </div>

      {/* Floating Snoring Zzz Effect when sleeping */}
      {dogState === "sleep" && (
        <div className="absolute top-2 left-6 pointer-events-none font-sans font-bold select-none text-secondary-theme flex flex-col text-left leading-none h-8 w-12 z-50">
          <span className="text-[12px] snore-z1 absolute">Z</span>
          <span className="text-[9px] snore-z2 absolute ml-2.5 mt-1">z</span>
          <span className="text-[7px] snore-z3 absolute ml-4.5 mt-2">z</span>
        </div>
      )}

      {/* Actual Dog Body directly on desk (No bounding box, background or borders) */}
      <div 
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onMouseEnter={() => setShowBubble(true)}
        onMouseLeave={() => setShowBubble(false)}
        onClick={handleDogClick}
        onDoubleClick={handleDoubleClick}
        className={`w-24 h-24 flex items-center justify-center bg-transparent transition-all duration-200 select-none ${
          isDragging ? "cursor-grabbing scale-105" : "cursor-grab"
        }`}
        title="I'm interactive! Click/tap to scroll to the next section, drag anywhere, double-click to jump."
      >
        {/* Render flat vector dog SVG based on state */}
        <div className={getDogIconStyle()}>
          <FlatDogSVG state={dogState} animFrame={animFrame} />
        </div>
      </div>
    </div>
  );
}
