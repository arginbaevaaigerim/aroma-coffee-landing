import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ArrowLeft, Package, Truck } from "lucide-react";

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [deliveryType, setDeliveryType] = useState<'pickup' | 'delivery'>('pickup');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  if (items.length === 0) {
    navigate('/');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('orders')
        .insert({
          customer_email: formData.email,
          customer_name: formData.name,
          customer_phone: formData.phone,
          delivery_address: deliveryType === 'delivery' ? formData.address : null,
          delivery_type: deliveryType,
          items: items as any,
          total_amount: total,
          status: 'pending'
        });

      if (error) throw error;

      toast.success("Заказ успешно оформлен!", {
        description: "Мы свяжемся с вами в ближайшее время"
      });
      
      clearCart();
      navigate('/order-confirmation');
    } catch (error: any) {
      console.error('Order error:', error);
      toast.error("Ошибка при оформлении заказа", {
        description: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад
        </Button>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Оформление заказа</h1>
              <p className="text-muted-foreground">
                Заполните данные для доставки
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="glass-effect rounded-xl p-6 space-y-4">
                <h2 className="font-semibold text-lg">Тип получения</h2>
                <RadioGroup value={deliveryType} onValueChange={(v) => setDeliveryType(v as 'pickup' | 'delivery')}>
                  <div className="flex items-center space-x-2 glass-effect p-4 rounded-lg">
                    <RadioGroupItem value="pickup" id="pickup" />
                    <Label htmlFor="pickup" className="flex items-center gap-2 cursor-pointer flex-1">
                      <Package className="w-5 h-5 text-primary" />
                      <div>
                        <div className="font-medium">Самовывоз</div>
                        <div className="text-sm text-muted-foreground">Заберу сам из кофейни</div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 glass-effect p-4 rounded-lg">
                    <RadioGroupItem value="delivery" id="delivery" />
                    <Label htmlFor="delivery" className="flex items-center gap-2 cursor-pointer flex-1">
                      <Truck className="w-5 h-5 text-primary" />
                      <div>
                        <div className="font-medium">Доставка</div>
                        <div className="text-sm text-muted-foreground">Доставим по адресу</div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="glass-effect rounded-xl p-6 space-y-4">
                <h2 className="font-semibold text-lg">Контактные данные</h2>
                
                <div>
                  <Label htmlFor="name">Имя *</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ваше имя"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Телефон *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+996 555 123 456"
                  />
                </div>

                {deliveryType === 'delivery' && (
                  <div>
                    <Label htmlFor="address">Адрес доставки *</Label>
                    <Textarea
                      id="address"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Укажите полный адрес доставки"
                      rows={3}
                    />
                  </div>
                )}
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={loading}>
                {loading ? "Оформление..." : `Оформить заказ на ${total} сом`}
              </Button>
            </form>
          </div>

          <div className="space-y-4">
            <div className="glass-effect rounded-xl p-6 sticky top-8">
              <h2 className="font-semibold text-lg mb-4">Ваш заказ</h2>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-start gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg gradient-warm flex items-center justify-center font-bold text-sm text-primary">
                        {item.icon}
                      </div>
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground">x{item.quantity}</div>
                      </div>
                    </div>
                    <div className="font-semibold whitespace-nowrap">
                      {item.price * item.quantity} сом
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t mt-4 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Подытог</span>
                  <span>{total} сом</span>
                </div>
                {deliveryType === 'delivery' && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Доставка</span>
                    <span>Бесплатно</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                  <span>Итого</span>
                  <span className="text-primary">{total} сом</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
