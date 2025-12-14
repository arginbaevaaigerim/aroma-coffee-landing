export const Footer = () => {
  return (
    <footer className="py-8 px-4 md:px-8 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-between items-center gap-4 text-sm text-muted-foreground">
          <div>© 2025 Aroma. Все права защищены.</div>
          <div className="flex gap-4">
            <button className="hover:text-foreground transition-colors">
              Политика конфиденциальности
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
