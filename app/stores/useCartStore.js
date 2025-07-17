import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],

      // ✅ Add to cart or increase quantity if item exists
      addToCart: (item) => {
        const existingItem = get().cart.find((i) => i.id === item.$id);
        if (existingItem) {
          set({
            cart: get().cart.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          });
        } else {
          set({
            cart: [...get().cart, { ...item, quantity: 1 }],
          });
        }
      },

      // ✅ Increase quantity
      increaseQty: (id) => {
        set({
          cart: get().cart.map((i) =>
            i.$id === id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        });
      },

      // ✅ Decrease quantity (remove if qty <=1)
      decreaseQty: (id) => {
        set({
          cart: get()
            .cart.map((i) =>
              i.$id === id ? { ...i, quantity: i.quantity - 1 } : i
            )
            .filter((i) => i.quantity > 0),
        });
      },

      // ✅ Remove item
      removeFromCart: (id) =>
        set({ cart: get().cart.filter((i) => i.$id !== id) }),

      // ✅ Clear cart
      clearCart: () => set({ cart: [] }),

      // ✅ Total price
      totalPrice: () =>
        get().cart.reduce((sum, i) => sum + i.price * i.quantity, 0),

      totalQuantity: () => get().cart.reduce((sum, i) => sum + i.quantity, 0),
    }),
    {
      name: "cart-storage", // key in localStorage
    }
  )
);

export default useCartStore;
