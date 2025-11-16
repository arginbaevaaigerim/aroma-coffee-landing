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
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="glass-effect rounded-2xl p-8 md:p-10 shadow-coffee">
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

          <div className="rounded-2xl overflow-hidden shadow-coffee min-h-[400px] gradient-warm flex items-center justify-center">
            <div className="relative w-56 h-56">
              <div className="absolute inset-0 rounded-[50%_50%_40%_40%] bg-gradient-to-b from-white via-[#f0e6de] to-[#e9d7c8] shadow-xl flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-white/85 absolute top-[35%] left-[40%] shadow-sm" />
              </div>
              <div className="absolute -right-7 top-[42%] w-12 h-16 rounded-2xl bg-gradient-to-b from-[#fff7f0] to-[#f0e6de] shadow-md transform rotate-[5deg]" 
                   style={{ boxShadow: 'inset -6px 0 8px rgba(0,0,0,0.02)' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
