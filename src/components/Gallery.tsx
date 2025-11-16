import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import gallery7 from "@/assets/gallery-7.jpg";
import gallery8 from "@/assets/gallery-8.jpg";

export const Gallery = () => {
  const images = [
    { id: 1, src: gallery1, alt: "Интерьер кофейни Aroma" },
    { id: 2, src: gallery2, alt: "Латте арт" },
    { id: 3, src: gallery3, alt: "Свежая выпечка" },
    { id: 4, src: gallery4, alt: "Кофейные зерна" },
    { id: 5, src: gallery5, alt: "Бариста за работой" },
    { id: 6, src: gallery6, alt: "Уютный уголок" },
    { id: 7, src: gallery7, alt: "Айс-кофе" },
    { id: 8, src: gallery8, alt: "Терраса кофейни" },
  ];

  return (
    <section className="py-16 px-4 md:px-8" id="gallery">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-between items-start gap-6 mb-12">
          <div>
            <div className="text-primary font-semibold tracking-wide mb-2 text-sm uppercase">
              Галерея
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Немного атмосферы</h2>
            <p className="text-muted-foreground">
              Интерьер, напитки и уютные моменты наших гостей.
            </p>
          </div>
          <div className="text-sm text-muted-foreground">
            Следите за обновлениями в Instagram
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {images.map((image) => (
            <div
              key={image.id}
              className="aspect-[4/3] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
