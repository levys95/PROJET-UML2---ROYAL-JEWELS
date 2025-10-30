import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useFavorites = (userId: string | undefined) => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    loadFavorites();
  }, [userId]);

  const loadFavorites = async () => {
    if (!userId) return;

    const { data, error } = await supabase
      .from("favorites")
      .select("product_id")
      .eq("user_id", userId);

    if (error) {
      console.error("Error loading favorites:", error);
    } else {
      setFavorites(new Set(data.map(f => f.product_id)));
    }
    setLoading(false);
  };

  const toggleFavorite = async (productId: string) => {
    if (!userId) {
      toast.error("Connectez-vous pour ajouter aux favoris");
      return;
    }

    const isFavorite = favorites.has(productId);

    if (isFavorite) {
      // Retirer des favoris
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("user_id", userId)
        .eq("product_id", productId);

      if (error) {
        toast.error("Erreur lors du retrait des favoris");
        console.error(error);
      } else {
        setFavorites(prev => {
          const newSet = new Set(prev);
          newSet.delete(productId);
          return newSet;
        });
        toast.success("Retiré des favoris");
      }
    } else {
      // Ajouter aux favoris
      const { error } = await supabase
        .from("favorites")
        .insert({ user_id: userId, product_id: productId });

      if (error) {
        toast.error("Erreur lors de l'ajout aux favoris");
        console.error(error);
      } else {
        setFavorites(prev => new Set([...prev, productId]));
        toast.success("Ajouté aux favoris ❤️");
      }
    }
  };

  return {
    favorites,
    loading,
    toggleFavorite,
    isFavorite: (productId: string) => favorites.has(productId),
  };
};
