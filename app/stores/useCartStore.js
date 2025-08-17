import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],

      // ✅ Add to cart or increase quantity if same id + size exists
      addToCart: (item) => {
        const existingItem = get().cart.find(
          (i) => i.$id === item.$id && i.size === item.size
        );

        if (existingItem) {
          set({
            cart: get().cart.map((i) =>
              i.$id === item.$id && i.size === item.size
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          });
        } else {
          set({
            cart: [...get().cart, { ...item, quantity: 1 }],
          });
        }
      },

      // ✅ Increase quantity (specific id + size)
      increaseQty: (id, size) => {
        set({
          cart: get().cart.map((i) =>
            i.$id === id && i.size === size
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        });
      },

      // ✅ Decrease quantity (specific id + size, remove if qty <= 1)
      decreaseQty: (id, size) => {
        set({
          cart: get()
            .cart.map((i) =>
              i.$id === id && i.size === size
                ? { ...i, quantity: i.quantity - 1 }
                : i
            )
            .filter((i) => i.quantity > 0),
        });
      },

      // ✅ Remove item completely (specific id + size)
      removeFromCart: (id, size) =>
        set({
          cart: get().cart.filter((i) => !(i.$id === id && i.size === size)),
        }),

      // ✅ Clear cart
      clearCart: () => set({ cart: [] }),

      // ✅ Total price
      totalPrice: () =>
        get().cart.reduce((sum, i) => sum + i.price * i.quantity, 0),

      // ✅ Total quantity
      totalQuantity: () => get().cart.reduce((sum, i) => sum + i.quantity, 0),
    }),
    {
      name: "cart-storage", // key in localStorage
    }
  )
);

export default useCartStore;
