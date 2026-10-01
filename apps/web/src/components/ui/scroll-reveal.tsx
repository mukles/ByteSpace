"use client";

import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const FROM: Record<string, gsap.TweenVars> = {
  up: { y: 48 },
  left: { x: -64 },
  right: { x: 64 },
  scale: { scale: 0.92, y: 24 },
};

const trigger = (el: Element) => ({
  trigger: el,
  start: "top 85%",
  once: true,
});

export function ScrollReveal() {
  const pathname = usePathname();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            ...(FROM[el.dataset.reveal ?? ""] ?? FROM.up),
            autoAlpha: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: trigger(el),
          });
        });

        gsap.utils
          .toArray<HTMLElement>("[data-reveal-stagger]")
          .forEach((list) => {
            gsap.from(list.children, {
              y: 40,
              autoAlpha: 0,
              duration: 0.7,
              ease: "power3.out",
              stagger: 0.08,
              scrollTrigger: trigger(list),
            });
          });
      });

      return () => mm.revert();
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
