import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "@/components/ui/icon";

const images = [
  {
    src: "https://cdn.poehali.dev/projects/fd49ce86-e4b7-4598-baca-4f0cc0f9a6d1/bucket/8e8b4d8c-3781-4364-aec3-427be8173523.jpg",
    title: "Паркинг",
    category: "Экстерьер",
  },
  {
    src: "https://cdn.poehali.dev/projects/fd49ce86-e4b7-4598-baca-4f0cc0f9a6d1/bucket/a1e33dcf-d030-4f74-8eda-6edc1488df3e.jpg",
    title: "Двор зимой",
    category: "Экстерьер",
  },
  {
    src: "https://cdn.poehali.dev/projects/fd49ce86-e4b7-4598-baca-4f0cc0f9a6d1/bucket/02e24f2b-8dae-4430-b94c-f1dd09b7044b.jpg",
    title: "Двор, вид 1",
    category: "Экстерьер",
  },
  {
    src: "https://cdn.poehali.dev/projects/fd49ce86-e4b7-4598-baca-4f0cc0f9a6d1/bucket/cc26db69-ea55-4257-80a7-0f9d4f4a58c2.jpg",
    title: "Двор с высоты, день",
    category: "Экстерьер",
  },
  {
    src: "https://cdn.poehali.dev/projects/fd49ce86-e4b7-4598-baca-4f0cc0f9a6d1/bucket/c16761ab-8ec3-48fa-88cd-7a707a05c2a2.jpg",
    title: "Двор с высоты, ночь",
    category: "Экстерьер",
  },
];

export default function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);

  const handlePrev = () => {
    if (selected === null) return;
    setSelected((selected - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    if (selected === null) return;
    setSelected((selected + 1) % images.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
    if (e.key === "Escape") setSelected(null);
  };

  return (
    <section className="bg-neutral-950 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="uppercase text-xs tracking-widest text-neutral-500 mb-3">Портфолио</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Избранные работы</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <motion.div
              key={i}
              className={`relative overflow-hidden cursor-pointer group ${i === 0 ? "sm:col-span-2 lg:col-span-2 aspect-[16/9]" : "aspect-[4/3]"}`}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelected(i)}
            >
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end p-5">
                <div className="translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-xs uppercase tracking-widest text-neutral-400 mb-1">{img.category}</p>
                  <p className="text-white font-semibold text-lg">{img.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            <button
              className="absolute top-5 right-5 text-white hover:text-neutral-400 transition-colors z-10"
              onClick={() => setSelected(null)}
            >
              <Icon name="X" size={32} />
            </button>

            <button
              className="absolute left-4 md:left-8 text-white hover:text-neutral-400 transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            >
              <Icon name="ChevronLeft" size={40} />
            </button>

            <motion.div
              key={selected}
              className="max-w-6xl max-h-[90vh] w-full px-16"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[selected].src}
                alt={images[selected].title}
                className="w-full h-full object-contain max-h-[80vh]"
              />
              <div className="mt-4 text-center">
                <p className="text-xs uppercase tracking-widest text-neutral-500 mb-1">{images[selected].category}</p>
                <p className="text-white text-xl font-semibold">{images[selected].title}</p>
              </div>
            </motion.div>

            <button
              className="absolute right-4 md:right-8 text-white hover:text-neutral-400 transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
            >
              <Icon name="ChevronRight" size={40} />
            </button>

            <div className="absolute bottom-6 flex gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all ${i === selected ? "bg-white w-6" : "bg-neutral-600"}`}
                  onClick={(e) => { e.stopPropagation(); setSelected(i); }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
