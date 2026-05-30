import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "50vh"]);

  return (
    <div
      ref={container}
      className="relative flex items-center justify-center h-screen overflow-hidden"
    >
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src="https://cdn.poehali.dev/projects/fd49ce86-e4b7-4598-baca-4f0cc0f9a6d1/bucket/8e8b4d8c-3781-4364-aec3-427be8173523.jpg"
          alt="3D визуализация парковки"
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="relative z-10 text-center text-white px-6" style={{ textShadow: "0 2px 24px rgba(0,0,0,0.7)" }}>
        <p className="text-sm md:text-base uppercase tracking-widest mb-4 opacity-80">
          Портфолио работ
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 leading-tight">
          3D Визуализатора
        </h1>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-wide">
          Сорокиной А.С.
        </h2>
      </div>
    </div>
  );
}