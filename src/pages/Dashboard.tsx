import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Package, Clock, CheckCircle, Truck, XCircle, User, Mail, Phone } from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  items: OrderItem[];
  total_amount: number;
  created_at: string;
  status: string;
  delivery_type: string;
  delivery_address: string | null;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
}

const statusConfig: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
  pending: { label: "Ожидает подтверждения", icon: <Clock className="h-4 w-4" />, color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20" },
  confirmed: { label: "Подтверждён", icon: <CheckCircle className="h-4 w-4" />, color: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
  preparing: { label: "Готовится", icon: <Package className="h-4 w-4" />, color: "bg-orange-500/10 text-orange-600 border-orange-500/20" },
  ready: { label: "Готов", icon: <CheckCircle className="h-4 w-4" />, color: "bg-green-500/10 text-green-600 border-green-500/20" },
  delivering: { label: "Доставляется", icon: <Truck className="h-4 w-4" />, color: "bg-purple-500/10 text-purple-600 border-purple-500/20" },
  completed: { label: "Выполнен", icon: <CheckCircle className="h-4 w-4" />, color: "bg-green-500/10 text-green-600 border-green-500/20" },
  cancelled: { label: "Отменён", icon: <XCircle className="h-4 w-4" />, color: "bg-red-500/10 text-red-600 border-red-500/20" },
};

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.email) return;

      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("customer_email", user.email)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setOrders(data as unknown as Order[]);
      }
      setLoadingOrders(false);
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) return null;

  const getStatusInfo = (status: string) => {
    return statusConfig[status] || statusConfig.pending;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          На главную
        </Button>

        <div className="space-y-8">
          {/* Profile Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Мой профиль
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{user.email}</span>
              </div>
              {user.user_metadata?.full_name && (
                <div className="flex items-center gap-3 text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>{user.user_metadata.full_name}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Orders Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Package className="h-6 w-6" />
              История заказов
            </h2>

            {loadingOrders ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : orders.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">У вас пока нет заказов</p>
                  <Button
                    onClick={() => navigate("/")}
                    className="mt-4 gradient-coffee text-white"
                  >
                    Перейти к меню
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => {
                  const statusInfo = getStatusInfo(order.status);
                  return (
                    <Card key={order.id} className="overflow-hidden">
                      <CardHeader className="pb-3">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Заказ от {format(new Date(order.created_at), "d MMMM yyyy, HH:mm", { locale: ru })}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              #{order.id.slice(0, 8)}
                            </p>
                          </div>
                          <Badge variant="outline" className={`${statusInfo.color} flex items-center gap-1.5`}>
                            {statusInfo.icon}
                            {statusInfo.label}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-sm">
                              <span>
                                {item.name} × {item.quantity}
                              </span>
                              <span className="text-muted-foreground">
                                {item.price * item.quantity} ₽
                              </span>
                            </div>
                          ))}
                        </div>

                        <Separator />

                        <div className="flex justify-between font-medium">
                          <span>Итого</span>
                          <span>{order.total_amount} ₽</span>
                        </div>

                        <div className="text-sm text-muted-foreground space-y-1">
                          <div className="flex items-center gap-2">
                            <Truck className="h-4 w-4" />
                            <span>
                              {order.delivery_type === "delivery" ? "Доставка" : "Самовывоз"}
                              {order.delivery_address && `: ${order.delivery_address}`}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            <span>{order.customer_phone}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
