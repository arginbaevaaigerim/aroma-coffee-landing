import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingBag, User, LogOut } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { itemCount, setIsOpen } = useCart();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-3 z-50 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <nav className="flex items-center justify-between gap-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl gradient-coffee shadow-coffee flex items-center justify-center text-white font-bold text-lg">
              A
            </div>
            <div>
              <div className="font-bold text-foreground">Aroma</div>
              <div className="text-xs text-muted-foreground">Кофейня & Уют</div>
            </div>
          </div>

          <ul className="hidden md:flex gap-4 items-center">
            <li>
              <button
                onClick={() => scrollToSection("about")}
                className="px-3 py-2 rounded-lg text-foreground font-medium hover:bg-secondary/50 transition-colors"
              >
                О нас
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("menu")}
                className="px-3 py-2 rounded-lg text-foreground font-medium hover:bg-secondary/50 transition-colors"
              >
                Меню
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("gallery")}
                className="px-3 py-2 rounded-lg text-foreground font-medium hover:bg-secondary/50 transition-colors"
              >
                Галерея
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("contact")}
                className="px-3 py-2 rounded-lg text-foreground font-medium hover:bg-secondary/50 transition-colors"
              >
                Контакты
              </button>
            </li>
          </ul>

          <div className="flex items-center gap-3">
            <Button
              onClick={() => scrollToSection("menu")}
              className="gradient-coffee shadow-coffee text-white hover:opacity-90 transition-opacity hidden md:flex"
            >
              Заказать
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setIsOpen(true)}
              aria-label="Open cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge 
                  variant="default" 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {itemCount}
                </Badge>
              )}
            </Button>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    <User className="h-4 w-4 mr-2" />
                    Личный кабинет
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Выйти
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/auth')}
                className="hidden md:flex"
              >
                Войти
              </Button>
            )}
            
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>

        {isMenuOpen && (
          <div className="md:hidden absolute right-4 mt-2 bg-card rounded-xl shadow-lg p-3 space-y-1 border border-border">
            <button
              onClick={() => scrollToSection("about")}
              className="block w-full text-left px-4 py-2 rounded-lg hover:bg-secondary/50 transition-colors"
            >
              О нас
            </button>
            <button
              onClick={() => scrollToSection("menu")}
              className="block w-full text-left px-4 py-2 rounded-lg hover:bg-secondary/50 transition-colors"
            >
              Меню
            </button>
            <button
              onClick={() => scrollToSection("gallery")}
              className="block w-full text-left px-4 py-2 rounded-lg hover:bg-secondary/50 transition-colors"
            >
              Галерея
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="block w-full text-left px-4 py-2 rounded-lg hover:bg-secondary/50 transition-colors"
            >
              Контакты
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
