/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../services/wishlistService";

const WishlistContext = createContext(null);
export const useWishlist = () => useContext(WishlistContext);

export function WishlistProvider({ children }) {
  const { user } = useAuth();
  const [wishlistIds, setWishlistIds] = useState(new Set());
  const [loading, setLoading] = useState(false);

  // Load wishlist IDs on login
  useEffect(() => {
    if (!user || user.role !== "customer") {
      setWishlistIds(new Set());
      return;
    }
    setLoading(true);
    getWishlist()
      .then((res) => {
        const ids = res.data.data.map((c) => String(c._id));
        setWishlistIds(new Set(ids));
      })
      .catch(() => setWishlistIds(new Set()))
      .finally(() => setLoading(false));
  }, [user]);

  const isWishlisted = (courseId) => wishlistIds.has(String(courseId));

  const toggleWishlist = async (courseId) => {
    if (!user || user.role !== "customer") return;
    const id = String(courseId);
    const wasAdded = wishlistIds.has(id);

    // Optimistic update
    setWishlistIds((prev) => {
      const next = new Set(prev);
      wasAdded ? next.delete(id) : next.add(id);
      return next;
    });

    try {
      if (wasAdded) {
        await removeFromWishlist(id);
      } else {
        await addToWishlist(id);
      }
    } catch {
      // Rollback on error
      setWishlistIds((prev) => {
        const next = new Set(prev);
        wasAdded ? next.add(id) : next.delete(id);
        return next;
      });
    }
  };

  return (
    <WishlistContext.Provider
      value={{ wishlistIds, isWishlisted, toggleWishlist, loading }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
