import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

export const Menu = () => {
  const { addItem } = useCart();

  const menuItems = [
    { id: 1, name: "Латте", description: "Кремовая текстура, мягкий вкус", price: "220 сом", icon: "L" },
    { id: 2, name: "Капучино", description: "Пенка и насыщенный эспрессо", price: "200 сом", icon: "C" },
    { id: 3, name: "Эспрессо", description: "Крепкий, чистый вкус", price: "150 сом", icon: "E" },
    { id: 4, name: "Матча латте", description: "Яркий зелёный чай с молоком", price: "260 сом", icon: "M" },
    { id: 5, name: "Айс-латте", description: "Освежающий холодный латте", price: "240 сом", icon: "I" },
    { id: 6, name: "Чай", description: "Чёрный, зелёный, травяной", price: "120 сом", icon: "T" },
  ];

  return (
    <section className="py-16 px-4 md:px-8" id="menu">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-between items-start gap-6 mb-12">
          <div>
            <div className="text-primary font-semibold tracking-wide mb-2 text-sm uppercase">
              Наше меню
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Популярные напитки</h2>
            <p className="text-muted-foreground">
              Классика и авторские рецепты — все готовится на профессиональной технике.
            </p>
          </div>
          <div className="text-sm text-muted-foreground">
            Веганские & безлактозные опции
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="glass-effect rounded-2xl p-4 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-xl gradient-warm flex items-center justify-center font-bold text-2xl text-primary flex-shrink-0">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                  <div className="font-bold text-primary mt-1">
                    {item.price}
                  </div>
                </div>
              </div>
              <Button 
                onClick={() => {
                  addItem({
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    price: parseInt(item.price.replace(' сом', '')),
                    icon: item.icon
                  });
                  toast.success(`${item.name} добавлен в корзину`);
                }}
                className="w-full"
                size="sm"
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Добавить в корзину
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
