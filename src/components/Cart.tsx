import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

export const Cart = () => {
  const { items, removeItem, updateQuantity, total, isOpen, setIsOpen } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsOpen(false);
    navigate('/checkout');
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Корзина ({items.length})
          </SheetTitle>
        </SheetHeader>

        <div className="mt-8 flex flex-col h-[calc(100vh-180px)]">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
              <ShoppingBag className="w-16 h-16 mb-4 opacity-20" />
              <p>Корзина пуста</p>
              <p className="text-sm">Добавьте напитки из меню</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-auto space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="glass-effect rounded-xl p-4 flex items-center gap-4"
                  >
                    <div className="w-20 h-20 rounded-xl gradient-warm flex items-center justify-center font-bold text-2xl text-primary flex-shrink-0 overflow-hidden">
                      {item.icon === 'T' ? (
                        <img
                          src="https://i.pinimg.com/736x/15/51/7b/15517b7ec5f50d84530dc26e023e0b5e.jpg"
                          alt={item.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : item.icon === 'I' ? (
                        <img
                          src="https://i.pinimg.com/1200x/16/b2/9b/16b29b8cdb039436089ce0f52264a356.jpg"
                          alt={item.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        item.icon
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.price} сом</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => removeItem(item.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Итого:</span>
                  <span className="text-primary">{total} сом</span>
                </div>
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleCheckout}
                >
                  Оформить заказ
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
