import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Crown, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import crownPlaceholder from "@/assets/crown-placeholder.jpg";
import necklacePlaceholder from "@/assets/necklace-placeholder.jpg";
import ringPlaceholder from "@/assets/ring-placeholder.jpg";
import { useFavorites } from "@/hooks/useFavorites";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image_url?: string;
  era?: string;
  original_owner?: string;
  stock_quantity: number;
  category?: string;
}

export const ProductCard = ({ 
  id, 
  name, 
  price, 
  image_url, 
  era, 
  original_owner,
  stock_quantity,
  category 
}: ProductCardProps) => {
  const [userId, setUserId] = useState<string | undefined>();
  const { isFavorite, toggleFavorite } = useFavorites(userId);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUserId(user?.id);
    });
  }, []);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(id);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getPlaceholderImage = () => {
    if (category?.toLowerCase().includes('couronne')) return crownPlaceholder;
    if (category?.toLowerCase().includes('collier')) return necklacePlaceholder;
    if (category?.toLowerCase().includes('bague')) return ringPlaceholder;
    return crownPlaceholder;
  };

  const displayImage = image_url || getPlaceholderImage();

  return (
    <Card className="group overflow-hidden shadow-elegant hover:shadow-royal transition-royal border-border/50">
      <Link to={`/product/${id}`}>
        <CardHeader className="p-0">
          <div className="relative h-64 overflow-hidden bg-muted">
            <img 
              src={displayImage} 
              alt={name}
              className="w-full h-full object-cover group-hover:scale-110 transition-royal"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 left-3 bg-background/80 hover:bg-background backdrop-blur-sm"
              onClick={handleFavoriteClick}
            >
              <Heart 
                className={`h-5 w-5 transition-colors ${
                  isFavorite(id) ? 'fill-red-500 text-red-500' : 'text-muted-foreground'
                }`}
              />
            </Button>
            {stock_quantity === 1 && (
              <Badge className="absolute top-3 right-3 gradient-gold">
                <Crown className="h-3 w-3 mr-1" />
                Pièce Unique
              </Badge>
            )}
            {stock_quantity === 0 && (
              <Badge variant="destructive" className="absolute top-3 right-3">
                Vendu
              </Badge>
            )}
          </div>
        </CardHeader>
      </Link>

      <CardContent className="p-4">
        <Link to={`/product/${id}`}>
          <h3 className="font-serif font-bold text-lg mb-2 group-hover:text-primary transition-royal line-clamp-2">
            {name}
          </h3>
        </Link>
        
        {era && (
          <p className="text-sm text-muted-foreground mb-1">{era}</p>
        )}
        {original_owner && (
          <p className="text-xs text-muted-foreground italic">Propriétaire: {original_owner}</p>
        )}
        
        <div className="mt-3 flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">
            {formatPrice(price)}
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button 
          variant="royal" 
          className="w-full" 
          disabled={stock_quantity === 0}
          asChild
        >
          <Link to={`/product/${id}`}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            {stock_quantity === 0 ? 'Indisponible' : 'Voir Détails'}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
