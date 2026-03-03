import Link from 'next/link';
import Image from 'next/image';
import { cn } from '../../lib/utils';

interface Product {
    id: string;
    name: string;
    origin: string;
    description: string;
    image: string;
    history: string;
    tagline: string;
}

interface ProductCardProps {
    product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <Link
            href={`/products/${product.id}`}
            className="flex-1 relative group flex h-full"
        >
            {/* Decorative Dotted Frame (Outer) */}
            <div className="absolute inset-[-8px] border-[2px] border-[#d4af37] border-dashed rounded-[20px] opacity-40 z-0 pointer-events-none transition-opacity duration-700 group-hover:opacity-60"></div>

            <div className="relative z-10 w-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#2b0202] to-[#4a0404] border-[1px] border-[#d4af37]/40 shadow-[0_20px_60px_rgba(107,10,9,0.12)] transition-all duration-700 hover:shadow-[0_20px_60px_rgba(212,175,55,0.15)] flex flex-col h-full hover:-translate-y-1">
                {/* Decorative Lines */}
                <div className="absolute top-2 left-2 bottom-2 right-2 border border-[#d4af37]/10 pointer-events-none z-20 transition-colors group-hover:border-[#d4af37]/30"></div>

                <div className="relative w-full h-32 sm:h-64 bg-[#fdfbf7] shrink-0 border-b border-[#d4af37]/30 p-2 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.03)_100%)] pointer-events-none z-10"></div>
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-4 sm:p-8 group-hover:scale-110 transition-transform duration-[1500ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] drop-shadow-xl align-middle"
                        sizes="(max-width: 640px) 50vw, 25vw"
                    />
                </div>
                <div className="flex-1 p-3 sm:p-8 relative flex flex-col justify-center items-center text-center z-30">
                    <span className="text-[8px] sm:text-[10px] font-bold tracking-[2px] sm:tracking-[3px] text-[#ffd700] uppercase mb-1 sm:mb-2 opacity-80">
                        {product.origin}
                    </span>
                    <h3 className="text-sm sm:text-2xl font-bold text-[#fef5e7] mb-1 sm:mb-2 font-heading group-hover:text-[#ffd700] transition-colors leading-tight">
                        {product.name}
                    </h3>
                    <p className="hidden sm:block text-[#e6d5c3]/60 font-light text-[11px] sm:text-sm leading-relaxed line-clamp-2 mb-4">
                        {product.description}
                    </p>
                    <p className="text-[#ffd700] font-heading italic text-[9px] sm:text-sm mb-4 opacity-90 line-clamp-1 sm:line-clamp-none">
                        "{product.tagline}"
                    </p>
                    <div className="mt-auto flex items-center text-[#d4af37] text-[9px] sm:text-[11px] font-bold uppercase tracking-[2px] group-hover:text-[#ffd700] transition-colors">
                        <span className="border-b border-transparent group-hover:border-[#ffd700] pb-0.5 transition-all duration-300">
                            Explore Legacy
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};
