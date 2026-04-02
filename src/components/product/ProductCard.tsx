"use client";
import { useRef, useState, useEffect } from "react"; // Tambahkan useEffect
import { createPortal } from "react-dom"; // Tambahkan ini
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductCard({ product }: { product: any }) {
    const imageUrl = product.image_url || "/no-image.png";
    const addItem = useCart((state) => state.addItem);
    const [isFlying, setIsFlying] = useState(false);
    const [flyCoords, setFlyCoords] = useState({ x: 0, y: 0 });
    const [startPos, setStartPos] = useState({ top: 0, left: 0 });
    const buttonRef = useRef<HTMLButtonElement>(null);

    // Pastikan portal hanya merender di client
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        const rect = buttonRef.current?.getBoundingClientRect();
        if (!rect) return;

        const cartIcon = document.getElementById("cart-icon");
        const cartRect = cartIcon?.getBoundingClientRect();

        // Kunci posisi awal agar tidak berubah saat scroll
        setStartPos({ top: rect.top, left: rect.left });

        if (cartRect) {
            setFlyCoords({
                x: cartRect.left - rect.left,
                y: cartRect.top - rect.top
            });
        } else {
            setFlyCoords({
                x: window.innerWidth - rect.left - 100,
                y: -rect.top + 20
            });
        }

        setIsFlying(true);
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image_url,
        });

        setTimeout(() => setIsFlying(false), 600);
    };

    return (
        <div className="group relative bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full">
            
            {/* PORTAL: Memindahkan animasi ke level BODY agar tidak tertutup apapun */}
            {mounted && isFlying && createPortal(
                <AnimatePresence>
                    <motion.div
                        initial={{ scale: 0.8, opacity: 1, x: 0, y: 0 }}
                        animate={{
                            scale: 0.1,
                            opacity: 0.5,
                            x: flyCoords.x,
                            y: flyCoords.y
                        }}
                        transition={{ duration: 0.7, ease: [0.45, 0, 0.55, 1] }}
                        style={{
                            position: 'fixed',
                            top: startPos.top,
                            left: startPos.left,
                            zIndex: 99999, // Angka ekstrem
                            pointerEvents: 'none',
                        }}
                        className="w-24 h-32"
                    >
                        <div className="relative w-full h-full rounded-xl overflow-hidden border-2 border-[#43a047] shadow-2xl bg-white">
                            <Image src={imageUrl} alt="flying" fill className="object-cover" unoptimized />
                        </div>
                    </motion.div>
                </AnimatePresence>,
                document.body
            )}

            {/* UI CARD SEPERTI BIASA */}
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                {product.diskon && product.diskon !== "0" && (
                    <span className="bg-rose-500 text-white text-[10px] font-black px-2 py-1 rounded-lg shadow-lg">
                        SAVE {product.diskon}%
                    </span>
                )}
            </div>

            <div className="relative aspect-[1/1] overflow-hidden bg-slate-50">
                <Image
                    src={imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
            </div>

            <div className="p-4 flex flex-col flex-1">
                <h3 className="font-bold text-slate-800 text-sm md:text-base line-clamp-2 leading-snug min-h-[2.5rem]">
                    {product.name}
                </h3>

                <div className="mt-auto pt-4 flex items-center justify-between">
                    <p className="text-indigo-600 font-black text-xl">
                        {product.final_price_formatted}
                    </p>

                    <button
                        ref={buttonRef}
                        onClick={handleAddToCart}
                        className="cursor-pointer p-3 bg-white/80 backdrop-blur-md text-[#43a047] rounded-2xl shadow-lg hover:bg-[#43a047] hover:text-white transition-all"
                    >
                        <ShoppingCart size={20} strokeWidth={2.5} />
                    </button>
                </div>
            </div>
        </div>
    );
}