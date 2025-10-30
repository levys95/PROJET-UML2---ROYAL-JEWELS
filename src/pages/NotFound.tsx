import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Crown } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center gradient-hero relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border-4 border-accent rounded-full animate-float" />
        <div className="absolute bottom-20 right-20 w-24 h-24 border-4 border-accent rounded-full animate-float" style={{ animationDelay: "1s" }} />
      </div>

      <div className="text-center relative z-10 px-4">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <h1 className="text-9xl font-serif font-bold gradient-gold bg-clip-text text-transparent animate-shimmer">
              404
            </h1>
            <div className="absolute -top-8 -right-8">
              <Crown className="h-16 w-16 text-accent animate-glow" />
            </div>
          </div>
        </div>
        
        <h2 className="mb-4 text-3xl font-serif text-primary-foreground">
          Page Royale Introuvable
        </h2>
        
        <p className="mb-8 text-lg text-primary-foreground/80 max-w-md mx-auto">
          Il semblerait que cette page ait disparu de notre collection impériale...
        </p>
        
        <div className="flex gap-4 justify-center">
          <a 
            href="/" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition-royal shadow-gold hover:shadow-gold hover:scale-105"
          >
            <Crown className="h-5 w-5" />
            Retour à la Collection
          </a>
          <a 
            href="/catalog" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary-hover transition-royal shadow-royal"
          >
            Explorer le Catalogue
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
