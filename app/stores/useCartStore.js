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

      discountedPrice: 0,

      resetDiscountedPrice: () => set({ discountedPrice: 0 }),

      calculateDiscountedTotal: (discount, amountLestDiscount) => {
        let total = get().cart.reduce(
          (sum, i) => sum + i.price * i.quantity,
          0
        );
        console.log(
          "Discount",
          discount,
          "amountLestDiscount:",
          amountLestDiscount
        );
        if (discount) {
          if (discount.type === "percentage") {
            total -= (Number(total) * Number(discount.value)) / 100;
          } else if (discount.type === "fixed") {
            total -= parseInt(total) - Number(discount.value);
          }
        }
        console.log("Discounted", total);
        set({ discountedPrice: total });
        return total < 0 ? 0 : total; // prevent negative
      },
    }),
    {
      name: "cart-storage", // key in localStorage
    }
  )
);

export default useCartStore;
