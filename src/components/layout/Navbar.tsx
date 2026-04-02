"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Search, User, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/store";
import { motion } from "framer-motion";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const items = useCart((state) => state.items);
    const [cartCount, setCartCount] = useState(0);
    const toggleCart = useCart((state) => state.toggleCart);

    // Efek transisi saat scroll
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setCartCount(items.reduce((acc, item) => acc + item.quantity, 0));
    }, [items]);

    const navLinks = [
        { name: "Katalog", href: "#katalog" },
        { name: "Tentang Kami", href: "#tentang-kami" },
        { name: "Kontak", href: "#kontak" },
    ];

    return (
        <nav
            className={cn(
                "fixed top-0 w-full z-[100] transition-all duration-500",
                isScrolled
                    ? "bg-white/90 backdrop-blur-lg border-b border-slate-200 py-3 shadow-sm"
                    : "bg-transparent py-6"
            )}
        >
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex items-center justify-between">

                    {/* --- LOGO AREA --- */}
                    <Link href="/" className="group flex items-center gap-3">
                        <div className="relative w-10 h-10 md:w-12 md:h-12 transition-transform duration-300 group-hover:scale-110">
                            <Image
                                src="/logo.webp"
                                alt="Ziyadbooks Logo"
                                fill
                                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                                className="h-8 md:h-10 w-auto object-contain"
                                priority
                            />
                        </div>
                        <div className="hidden sm:flex flex-col justify-center">
                            <div className="flex font-black text-xl tracking-tighter uppercase leading-none">
                                <span className="text-[#43a047]">ziyad</span>
                                <span className="text-[#fb8c00]">books</span>
                            </div>
                            <span className="text-[9px] font-bold text-slate-400 tracking-[0.3em] uppercase mt-1">
                                Official Store
                            </span>
                        </div>
                    </Link>

                    {/* --- DESKTOP NAVIGATION --- */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-bold text-slate-600 hover:text-[#43a047] transition-colors relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#43a047] transition-all group-hover:w-full"></span>
                            </Link>
                        ))}
                    </div>

                    {/* --- RIGHT ACTIONS --- */}
                    <div className="flex items-center gap-2 md:gap-4">

                        {/* Cart Button */}
                        <motion.button
                            id="cart-icon"
                            key={cartCount} // Memicu animasi setiap kali angka berubah
                            initial={{ scale: 1 }}
                            animate={cartCount > 0 ? {
                                scale: [1, 1.2, 1],
                                rotate: [0, -10, 10, -10, 0]
                            } : {}}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="relative cursor-pointer p-2.5 text-slate-600 hover:bg-[#f1f8e9] hover:text-[#43a047] rounded-full transition-colors group"
                            onClick={toggleCart}
                        >
                            <ShoppingCart size={22} strokeWidth={2.2} />

                            {cartCount > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute top-1 right-1 w-5 h-5 bg-[#fb8c00] text-[10px] font-black text-white flex items-center justify-center rounded-full border-2 border-white shadow-sm"
                                >
                                    {cartCount}
                                </motion.span>
                            )}
                        </motion.button>

                        <div className="h-8 w-[1px] bg-slate-200 mx-1 hidden lg:block"></div>

                        {/* Login Button */}
                        <button className="hidden cursor-pointer lg:flex items-center gap-2 px-6 py-2.5 bg-[#43a047] text-white text-sm font-bold rounded-xl hover:bg-[#388e3c] transition-all shadow-md shadow-green-100 active:scale-95">
                            <User size={18} />
                            Masuk
                        </button>

                        {/* MOBILE MENU TOGGLE */}
                        <button
                            className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* --- MOBILE OVERLAY MENU --- */}
            <div
                className={cn(
                    "lg:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 overflow-hidden transition-all duration-300 ease-in-out",
                    isMobileMenuOpen ? "max-h-[400px] opacity-100 shadow-xl" : "max-h-0 opacity-0"
                )}
            >
                <div className="p-6 space-y-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="block text-lg font-bold text-slate-700 hover:text-[#43a047] py-2 border-b border-slate-50"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="pt-4 flex flex-col gap-3">
                        <button className="w-full py-3.5 bg-[#43a047] text-white font-bold rounded-xl shadow-lg shadow-green-50">
                            Masuk / Daftar
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}