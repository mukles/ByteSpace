"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const q = (name: string) => `[data-hero="${name}"]`;

export function HeroAnimator({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(scope.current, { autoAlpha: 1 });

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.from(q("intro"), {
          y: 40,
          autoAlpha: 0,
          duration: 0.9,
          stagger: 0.12,
        })
          .from(q("arc"), { scale: 0.6, autoAlpha: 0, duration: 1.2 }, "-=0.5")
          .from(q("student"), { y: 120, autoAlpha: 0, duration: 1.1 }, "<0.1")
          .from(
            q("shape"),
            {
              y: (i) => (i % 2 ? 160 : -160),
              rotation: (i) => (i % 2 ? 25 : -25),
              scale: 0.4,
              autoAlpha: 0,
              duration: 1.2,
              stagger: 0.08,
              ease: "back.out(1.4)",
            },
            "<0.2",
          )
          .from(
            q("card"),
            {
              y: 30,
              scale: 0.85,
              autoAlpha: 0,
              duration: 0.7,
              stagger: 0.15,
              ease: "back.out(1.7)",
            },
            "-=0.8",
          )
          .from(
            q("progress-bar"),
            { scaleX: 0, transformOrigin: "left", duration: 1.2 },
            "<0.2",
          )
          .from(
            q("avatar"),
            { x: -12, autoAlpha: 0, duration: 0.4, stagger: 0.05 },
            "<",
          );

        const value = scope.current?.querySelector<HTMLElement>(
          q("progress-value"),
        );
        if (value) {
          const target = Number(value.dataset.value);
          const counter = { n: 0 };
          tl.to(
            counter,
            {
              n: target,
              duration: 1.2,
              ease: "power2.out",
              onUpdate: () => {
                value.textContent = `${Math.round(counter.n)}%`;
              },
            },
            "<",
          );
        }

        tl.add(() => {
          gsap.utils.toArray<HTMLElement>(q("shape")).forEach((el, i) => {
            gsap.to(el, {
              y: `+=${gsap.utils.random(12, 24)}`,
              rotation: `+=${gsap.utils.random(-6, 6)}`,
              duration: gsap.utils.random(2.5, 4),
              delay: i * 0.2,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
            });
          });
          gsap.to(q("card"), {
            y: -8,
            duration: 2.4,
            ease: "sine.inOut",
            stagger: { each: 0.6, repeat: -1, yoyo: true },
          });
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(scope.current, { autoAlpha: 1 });
      });
    },
    { scope },
  );

  return (
    <div ref={scope} className="invisible">
      {children}
    </div>
  );
}
