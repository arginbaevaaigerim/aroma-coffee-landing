import { Button } from "@/components/ui/button";
import { Coffee, Cake, Home } from "lucide-react";

export const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-16 px-4 md:px-8" id="home">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-stretch">
          <div className="glass-effect rounded-2xl p-8 md:p-10 shadow-coffee h-full">
            <div className="text-primary font-semibold tracking-wide mb-2 text-sm uppercase">
              Новая кофейня в центре
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Аромат свежего кофе и уюта — каждый день
            </h1>
            <p className="text-muted-foreground mb-6 text-lg">
              Быстрая подача, лучшие обжарки и уютное пространство для работы и встреч. 
              Латте, эспрессо, авторские напитки и свежая выпечка.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <Button
                onClick={() => scrollToSection("contact")}
                size="lg"
                className="gradient-coffee shadow-coffee text-white hover:opacity-90 transition-opacity"
              >
                Забронировать стол
              </Button>
              <div className="text-sm text-muted-foreground">
                Открыты: 08:00 — 22:00
              </div>
            </div>

            <div className="space-y-3" id="about">
              <p className="text-sm text-muted-foreground font-medium">Почему нас выбирают</p>
              
              <div className="grid gap-3">
                <div className="flex items-center gap-3 bg-card rounded-xl p-3 shadow-sm">
                  <div className="w-11 h-11 rounded-lg gradient-warm flex items-center justify-center">
                    <Coffee className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">Лучшие зерна</div>
                    <div className="text-sm text-muted-foreground">Отборная обжарка, свежие поставки</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-card rounded-xl p-3 shadow-sm">
                  <div className="w-11 h-11 rounded-lg gradient-warm flex items-center justify-center">
                    <Cake className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">Свежая выпечка</div>
                    <div className="text-sm text-muted-foreground">Каждый день — из собственной пекарни</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-card rounded-xl p-3 shadow-sm">
                  <div className="w-11 h-11 rounded-lg gradient-warm flex items-center justify-center">
                    <Home className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">Комфорт</div>
                    <div className="text-sm text-muted-foreground">Удобные столики и розетки для ноутбуков</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-secondary/30 border border-border">
                <div className="font-bold mb-2">Специальное предложение</div>
                <div className="text-sm text-muted-foreground mb-3">
                  Каждое утро — утреннее комбо: кофе + булочка со скидкой 15%
                </div>
                <div className="text-sm text-muted-foreground">
                  Адрес: ул. Теңір-Too, 12
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-coffee bg-card h-full">
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <img
                src="https://i.pinimg.com/736x/7c/a6/db/7ca6db8dfdab8e9d6650355d16eddbd2.jpg"
                alt="Капучино с насыщенным кремовым слоем"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
