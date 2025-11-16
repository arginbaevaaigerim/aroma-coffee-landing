import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { FormEvent } from "react";

export const Contact = () => {
  const { toast } = useToast();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Спасибо!",
      description: "Мы свяжемся с вами в ближайшее время.",
    });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section className="py-16 px-4 md:px-8" id="contact">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="text-primary font-semibold tracking-wide mb-2 text-sm uppercase">
            Контакты
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Забронируйте стол или задавайте вопросы
          </h2>
          <p className="text-muted-foreground">Мы отвечаем в течение часа</p>
        </div>

        <div className="gradient-warm rounded-2xl p-6 md:p-8 grid md:grid-cols-2 gap-8 shadow-coffee">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-xl gradient-coffee flex items-center justify-center font-bold text-2xl text-white shadow-sm">
                A
              </div>
              <div>
                <h3 className="font-bold text-lg">Aroma — Кофейня</h3>
                <p className="text-sm text-muted-foreground">
                  ул. Теңір-Too, 12 · +996 555 123 456
                </p>
              </div>
            </div>

            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Открыто: 08:00 — 22:00</p>
              <p>Wi-Fi · Безналичный расчёт · Уютные места</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm text-muted-foreground">
                Имя
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Ваше имя"
                required
                className="bg-card"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm text-muted-foreground">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@email.com"
                required
                className="bg-card"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm text-muted-foreground">
                Сообщение
              </Label>
              <Textarea
                id="message"
                placeholder="Например: хочу забронировать столик на завтра, 2 человека"
                className="min-h-[120px] bg-card resize-none"
              />
            </div>

            <Button
              type="submit"
              className="gradient-coffee shadow-coffee text-white hover:opacity-90 transition-opacity"
            >
              Отправить
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};
