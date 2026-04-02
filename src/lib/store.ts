import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

interface CartStore {
    items: CartItem[];
    isCartOpen: boolean; // Tambah ini
    addItem: (product: any) => void;
    removeItem: (id: number) => void;
    updateQuantity: (id: number, delta: number) => void;
    toggleCart: () => void;
    clearCart: () => void;
    checkoutWhatsApp: () => void;
}

export const useCart = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            isCartOpen: false,
            addItem: (product) =>
                set((state) => {
                    const existingItem = state.items.find(
                        (item) => item.id === product.id,
                    );
                    if (existingItem) {
                        return {
                            items: state.items.map((item) =>
                                item.id === product.id
                                    ? { ...item, quantity: item.quantity + 1 }
                                    : item,
                            ),
                        };
                    }
                    return {
                        items: [...state.items, { ...product, quantity: 1 }],
                    };
                }),
            removeItem: (id) =>
                set((state) => ({
                    items: state.items.filter((item) => item.id !== id),
                })),
            updateQuantity: (id, delta) =>
                set((state) => ({
                    items: state.items.map((item) =>
                        item.id === id
                            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                            : item,
                    ),
                })),
            toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
            clearCart: () => set({ items: [] }),
            checkoutWhatsApp: () => {
                const { items } = get(); // Ambil items dari store saat ini
                if (items.length === 0) return;

                const phoneNumber = "62895401931602";
                let message = "*PESANAN BARU*\n\n";

                items.forEach((item, index) => {
                    message += `${index + 1}. *${item.name}* (${item.quantity}x)\n`;
                });

                const total = items.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0,
                );
                message += `\n*Total: Rp ${total.toLocaleString("id-ID")}*`;

                const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                window.open(whatsappURL, "_blank");
            },
        }),
        { name: "ziyad-cart-storage" },
    ),
);
