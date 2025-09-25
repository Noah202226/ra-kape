// src/stores/useCartStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],

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

      increaseQty: (id, size) => {
        set({
          cart: get().cart.map((i) =>
            i.$id === id && i.size === size
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        });
      },

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

      removeFromCart: (id, size) =>
        set({
          cart: get().cart.filter((i) => !(i.$id === id && i.size === size)),
        }),

      clearCart: () => set({ cart: [] }),

      totalPrice: () =>
        get().cart.reduce((sum, i) => sum + i.price * i.quantity, 0),

      totalQuantity: () => get().cart.reduce((sum, i) => sum + i.quantity, 0),

      // discount store value = discount amount (money to subtract)
      discountedPrice: 0,

      resetDiscountedPrice: () => set({ discountedPrice: 0 }),

      /**
       * calculateDiscountedTotal:
       *  - discount: { type: 'percentage'|'fixed', value: number }
       *  - subtotal: number
       * returns discountAmount (a number)
       */
      // cartStore.js
      calculateDiscountedTotal: (discount, subtotal) => {
        let discountAmount = 0;

        if (discount) {
          if (discount.type === "percentage") {
            discountAmount = (subtotal * Number(discount.value)) / 100;
          } else if (discount.type === "fixed") {
            discountAmount = Number(discount.value);
          }
        }

        // Save discount amount in state
        set({ discountedPrice: discountAmount });

        return discountAmount;
      },
    }),
    {
      name: "cart-storage",
    }
  )
);

export default useCartStore;
