"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Briefcase, FolderClosed, Home, SquarePen, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { navLinks, type NavIcon } from "@/data/navigation";
import { profile } from "@/data/profile";

const icons: Record<NavIcon, LucideIcon> = {
  home: Home,
  projects: FolderClosed,
  experience: Briefcase,
  tools: Wrench,
  thoughts: SquarePen,
};

/** Position and size of the sliding pill, in pixels relative to the nav. */
interface Indicator {
  left: number;
  width: number;
  ready: boolean;
}

export default function Header() {
  const pathname = usePathname();
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [indicator, setIndicator] = useState<Indicator>({
    left: 0,
    width: 0,
    ready: false,
  });

  const activeIndex = navLinks.findIndex((link) =>
    link.href === "/" ? pathname === "/" : pathname.startsWith(link.href)
  );

  const moveIndicator = useCallback(() => {
    const node = itemRefs.current[activeIndex];
    if (!node) {
      setIndicator((current) => ({ ...current, ready: false }));
      return;
    }
    setIndicator({ left: node.offsetLeft, width: node.offsetWidth, ready: true });
  }, [activeIndex]);

  // Reposition on route change, on resize, and once webfonts settle.
  useEffect(() => {
    moveIndicator();

    const observer = new ResizeObserver(moveIndicator);
    itemRefs.current.forEach((node) => node && observer.observe(node));
    window.addEventListener("resize", moveIndicator);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", moveIndicator);
    };
  }, [moveIndicator]);

  // The admin area has its own chrome.
  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:top-6">
        <nav
          aria-label="Main"
          className="pointer-events-auto relative flex items-center gap-1 rounded-2xl border border-border/80 bg-surface/80 p-2 shadow-2xl shadow-black/60 backdrop-blur-xl sm:gap-2 sm:px-3"
        >
          {/*
            The glide. Transform-driven so it animates on the compositor,
            and hidden until measured so it never flashes at 0,0.
          */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-2 top-2 left-0 rounded-xl bg-accent transition-[transform,width,opacity] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none"
            style={{
              transform: `translateX(${indicator.left}px)`,
              width: `${indicator.width}px`,
              opacity: indicator.ready ? 1 : 0,
            }}
          />

          {navLinks.map((link, index) => {
            const Icon = icons[link.icon];
            const isActive = index === activeIndex;

            return (
              <Link
                key={link.href}
                href={link.href}
                ref={(node) => {
                  itemRefs.current[index] = node;
                }}
                aria-current={isActive ? "page" : undefined}
                className={`group relative z-10 flex h-11 w-11 items-center justify-center rounded-xl transition-colors duration-300 sm:h-12 sm:w-12 ${
                  isActive ? "text-foreground" : "text-foreground/60 hover:text-foreground"
                }`}
              >
                <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
                <span className="sr-only">{link.label}</span>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-full mt-2 hidden whitespace-nowrap rounded-md border border-border bg-surface px-2 py-1 text-xs text-foreground opacity-0 transition-opacity group-hover:opacity-100 sm:block"
                >
                  {link.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </header>

      <a
        href={`mailto:${profile.email}`}
        className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 translate-x-[calc(50%-1.25rem)] rotate-90 rounded-b-xl bg-accent px-5 py-2 text-sm font-semibold tracking-wide text-foreground transition-colors hover:bg-accent-soft lg:block"
      >
        Say hello
      </a>
    </>
  );
}
