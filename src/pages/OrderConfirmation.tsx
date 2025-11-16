import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function OrderConfirmation() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center px-4">
      <div className="max-w-md w-full glass-effect rounded-2xl p-8 text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-primary" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Заказ принят!</h1>
          <p className="text-muted-foreground">
            Спасибо за ваш заказ. Мы свяжемся с вами в ближайшее время для подтверждения.
          </p>
        </div>

        <div className="glass-effect rounded-xl p-4 text-sm text-left space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Статус:</span>
            <span className="font-semibold text-primary">В обработке</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Время обработки:</span>
            <span className="font-semibold">15-30 минут</span>
          </div>
        </div>

        <div className="pt-4 space-y-3">
          <Button onClick={() => navigate('/')} className="w-full" size="lg">
            Вернуться на главную
          </Button>
          <p className="text-xs text-muted-foreground">
            Вы получите уведомление на email когда заказ будет готов
          </p>
        </div>
      </div>
    </div>
  );
}
