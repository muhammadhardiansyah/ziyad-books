"use client";
import { useCart } from "@/lib/store";
import { X, Plus, Minus, Trash2, ShoppingCart, Send, ChevronRight } from "lucide-react";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";

export default function CartDrawer() {
    const { items, isCartOpen, toggleCart, removeItem, updateQuantity, checkoutWhatsApp } = useCart();

    if (!isCartOpen) return null;

    const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="fixed inset-0 z-[200] flex justify-end">
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={toggleCart} />

            {/* Drawer Content */}
            <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">

                {/* Header */}
                <div className="p-6 border-b flex items-center justify-between bg-[#f1f8e9]">
                    <div className="flex items-center gap-2">
                        <ShoppingCart className="text-[#43a047]" />
                        <h2 className="text-xl font-black text-slate-900 tracking-tight">Keranjang Belanja</h2>
                    </div>
                    <button onClick={toggleCart} className="p-2 hover:bg-white rounded-full transition-colors text-slate-400">
                        <X size={24} />
                    </button>
                </div>

                {/* List Items */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                                <ShoppingCart size={32} />
                            </div>
                            <p className="font-bold">Wah, keranjangmu masih kosong!</p>
                            <button onClick={toggleCart} className="mt-4 text-[#43a047] font-black underline italic cursor-pointer">Ayo cari buku seru!</button>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item.id} className="flex gap-4 group">
                                <div className="relative w-20 h-24 rounded-2xl overflow-hidden bg-slate-50 border shrink-0">
                                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                                </div>
                                <div className="flex-1 flex flex-col justify-between py-1">
                                    <div>
                                        <h3 className="font-black text-slate-800 leading-tight mb-1 line-clamp-2">
                                            {item.name}
                                        </h3>
                                        <p className="text-[#43a047] font-bold text-sm">
                                            {formatPrice(item.price)}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between mt-4">
                                        {/* KONTROL QUANTITY YANG LEBIH JELAS */}
                                        <div className="flex items-center gap-3">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                                Jumlah:
                                            </span>
                                            <div className="flex items-center bg-slate-100 rounded-xl p-1 shadow-inner border border-slate-200/50">
                                                <button
                                                    onClick={() => updateQuantity(item.id, -1)}
                                                    className="p-2 hover:bg-white hover:text-rose-500 text-slate-600 rounded-lg shadow-sm transition-all active:scale-90 cursor-pointer flex items-center justify-center min-w-[32px]"
                                                >
                                                    <Minus size={12} strokeWidth={3} />
                                                </button>

                                                {/* ANGKA QUANTITY UTAMA */}
                                                <span className="font-black text-sm px-3 min-w-[32px] text-center text-slate-700">
                                                    {item.quantity}
                                                </span>

                                                <button
                                                    onClick={() => updateQuantity(item.id, 1)}
                                                    className="p-2 hover:bg-white hover:text-[#43a047] text-slate-600 rounded-lg shadow-sm transition-all active:scale-90 cursor-pointer flex items-center justify-center min-w-[32px]"
                                                >
                                                    <Plus size={12} strokeWidth={3} />
                                                </button>
                                            </div>
                                        </div>

                                        {/* TOMBOL HAPUS */}
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="p-2 text-slate-300 hover:text-rose-500 transition-colors cursor-pointer"
                                            title="Hapus dari keranjang"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer (Total & Checkout) */}
                {items.length > 0 && (
                    <div className="p-6 border-t bg-slate-50 space-y-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-bold text-slate-500 uppercase tracking-widest text-xs">Total Pembayaran</span>
                            <span className="text-2xl font-black text-[#fb8c00]">{formatPrice(totalPrice)}</span>
                        </div>
                        <button
                            className="w-full py-4 bg-[#43a047] text-white font-black rounded-2xl shadow-xl shadow-green-100 hover:bg-[#388e3c] transition-all flex items-center justify-center gap-2 group cursor-pointer"
                            onClick={checkoutWhatsApp}
                        >
                            <span className="tracking-wide text-lg">Checkout Sekarang</span>

                            {/* Panah pemberitahuan di Kanan sebagai pengganti titik */}
                            <ChevronRight
                                size={20}
                                strokeWidth={3}
                                className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                            />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}