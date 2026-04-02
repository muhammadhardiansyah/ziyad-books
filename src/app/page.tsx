import { getProducts } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import Navbar from "@/components/layout/Navbar";
import { BookOpen, MapPin, CheckCircle, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Ziyadbooks | Penerbit Buku Anak & Edukasi Islam Terpercaya",
  description: "Katalog resmi Ziyadbooks Surakarta. Temukan buku anak, boardbooks, dan iqra kualitas terbaik.",
  icons: {
    icon: "/logo.webp", 
  },
};

export default async function Home() {
  const res = await getProducts();

  // ✅ NORMALIZE DATA
  const products = Array.isArray(res?.data?.data) ? res.data.data : [];

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-20 lg:pt-28 overflow-hidden">
        {/* Background Pattern Lembut */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 tracking-tight"></div>

        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 py-16">

            <div className="flex-1 text-center lg:text-left z-10">
              {/* Badge - Hijau Ziyad */}
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-bold tracking-widest text-[#43a047] uppercase bg-green-50 rounded-lg border border-green-100">
                <BookOpen size={14} />
                Penerbit Edukasi Anak #1
              </div>

              <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight mb-6">
                Bacaan <span className="text-[#fb8c00]">Berkualitas</span> <br />
                Untuk Si Kecil.
              </h1>

              <p className="text-lg text-slate-600 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Menghadirkan konten edukatif yang membentuk karakter anak muslim yang cerdas, kreatif, dan bertaqwa. Langsung dari <strong>Surakarta</strong> untuk Indonesia.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                {/* Tombol Utama - Hijau Ziyad */}
                <Link
                  href="#katalog"
                  className="group px-8 py-4 bg-[#43a047] text-white font-bold rounded-2xl shadow-xl shadow-green-100 hover:bg-[#388e3c] transition-all flex items-center justify-center gap-2"
                >
                  Jelajahi Katalog
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>

                <div className="flex items-center gap-4 px-4 text-slate-500 font-medium">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200"></div>
                    ))}
                  </div>
                  <span className="text-sm">Dipercaya 10rb+ Orang Tua</span>
                </div>
              </div>
            </div>

            <div className="flex-1 relative">
              {/* Bingkai Foto - Putih Bersih */}
              <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 border-[12px] border-white">
                <Image
                  src="/hero.png"
                  alt="Ziyadbooks Hero"
                  width={600}
                  height={600}
                  className="object-cover aspect-square"
                  priority
                />
              </div>

              {/* Floating Badge - Oranye Ziyad untuk Aksen */}
              <div className="absolute -bottom-8 -right-8 bg-white p-5 rounded-2xl shadow-2xl z-20 border border-slate-50 hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-50 text-[#fb8c00] rounded-full">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase">Pengiriman</p>
                    <p className="text-sm font-black text-slate-800">Dari Surakarta</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CATALOG SECTION --- */}
      <section id="katalog" className="py-24 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-2 italic">
                <span className="text-[#43a047]">Katalog</span> Produk
              </h2>
              <p className="text-slate-500">Menampilkan {products.length} koleksi buku terbaru untuk buah hati</p>
            </div>

            {/* SEARCH BAR - Fokus Hijau Ziyad */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Cari buku favorit..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#43a047]/20 focus:border-[#43a047] transition-all"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
              </div>
            </div>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
            {products.map((item: any) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>

          {/* EMPTY STATE */}
          {products.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
              <p className="text-slate-500 font-medium">Maaf, produk belum tersedia saat ini.</p>
            </div>
          )}
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section id="tentang-kami" className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <h2 className="text-3xl font-black text-slate-900 mb-6 italic">
                Tentang <span className="text-[#43a047]">Ziyadbooks</span>
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Ziyadbooks (CV Ziyad Visi Media) adalah penerbit buku anak dan edukasi Islam terkemuka yang berpusat di <strong>Surakarta</strong>. Kami berdedikasi untuk menghadirkan bacaan berkualitas yang memadukan nilai-nilai kreativitas, kecerdasan, dan akhlak mulia.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 bg-green-50 rounded-2xl">
                  <h4 className="font-bold text-[#43a047] mb-1 text-2xl">10th+</h4>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Pengalaman</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-2xl">
                  <h4 className="font-bold text-[#fb8c00] mb-1 text-2xl">1000+</h4>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Judul Buku</p>
                </div>
              </div>
            </div>
            <div className="flex-1 relative aspect-video rounded-[2rem] overflow-hidden shadow-2xl group border-8 border-white">
              <Image
                src="/home.webp"
                alt="Kantor Produksi Ziyadbooks Surakarta"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Overlay dekoratif tipis agar teks di atasnya (jika ada) lebih terbaca */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="kontak" className="py-24 bg-white relative overflow-hidden">
        {/* Dekorasi Background Halus */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none bg-[radial-gradient(#43a047_2px,transparent_2px)] [background-size:32px_32px]"></div>

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
              Hubungi <span className="text-[#43a047]">Kami</span>
            </h2>
            <p className="text-lg text-slate-500 font-medium">
              Tim Ziyadbooks di Surakarta siap membantu Anda dengan ramah dan cepat.
            </p>
          </div>

          {/* GRID KONTAK DENGAN WARNA KUSTOM */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">

            {/* WHATSAPP - HIJAU */}
            <Link
              href="https://wa.me/6281225514000"
              target="_blank"
              className="group p-10 bg-[#e8f5e9] rounded-[3rem] border-4 border-transparent hover:border-[#43a047] hover:bg-white transition-all duration-500 text-center shadow-xl shadow-green-100/50"
            >
              <div className="w-16 h-16 bg-[#43a047] text-white rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform shadow-lg shadow-green-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              </div>
              <h4 className="text-xl font-black text-[#2e7d32] mb-1">WhatsApp</h4>
              <p className="text-[10px] text-green-600 font-black uppercase tracking-widest mb-4">Fast Response</p>
              <span className="text-[#43a047] font-extrabold text-sm group-hover:underline">Chat Sekarang</span>
            </Link>

            {/* INSTAGRAM - PINK */}
            <Link
              href="https://instagram.com/ziyadbooks.official"
              target="_blank"
              className="group p-10 bg-[#fce4ec] rounded-[3rem] border-4 border-transparent hover:border-[#e91e63] hover:bg-white transition-all duration-500 text-center shadow-xl shadow-pink-100/50"
            >
              <div className="w-16 h-16 bg-[#e91e63] text-white rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:-rotate-12 transition-transform shadow-lg shadow-pink-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
              </div>
              <h4 className="text-xl font-black text-[#880e4f] mb-1">Instagram</h4>
              <p className="text-[10px] text-pink-600 font-black uppercase tracking-widest mb-4">@ziyadbooks</p>
              <span className="text-[#e91e63] font-extrabold text-sm group-hover:underline">Follow Us</span>
            </Link>

            {/* EMAIL - BIRU MUDA */}
            <Link
              href="mailto:cs@ziyadbooks.com"
              className="group p-10 bg-[#e3f2fd] rounded-[3rem] border-4 border-transparent hover:border-[#2196f3] hover:bg-white transition-all duration-500 text-center shadow-xl shadow-blue-100/50"
            >
              <div className="w-16 h-16 bg-[#2196f3] text-white rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-blue-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
              </div>
              <h4 className="text-xl font-black text-[#0d47a1] mb-1">Email</h4>
              <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest mb-4">Official Support</p>
              <span className="text-[#2196f3] font-extrabold text-sm group-hover:underline">Kirim Pesan</span>
            </Link>

          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-white border-t border-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center">
          <div className="mb-8 flex justify-center">
            <Image
              src="https://ziyadbooks.com/storage/ziyad/logonew.svg"
              alt="Ziyadbooks Logo"
              width={120}
              height={40}
              className="opacity-80 grayscale hover:grayscale-0 transition-all"
            />
          </div>
          <p className="text-slate-500 font-medium mb-2">CV Ziyad Visi Media</p>
          <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
            Jl. Banyuanyar Selatan No. 4, Banyuanyar, Banjarsari, <br />
            Surakarta, Jawa Tengah 57137
          </p>
          <div className="mt-8 pt-8 border-t border-slate-50">
            <p className="text-[10px] text-slate-300 uppercase tracking-widest">
              © 2026 Ziyadbooks Official Store • Solo, Indonesia
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}