"use client";

import { use, useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ChevronRight } from "lucide-react";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { SearchModal } from "@/components/layout/search-modal";
import {
  ProductGallery,
  ProductInfo,
  SizeSelector,
  QuantitySelector,
  AddToCartActions,
  ProductAccordion,
  RelatedProducts,
  ProductDetailSkeleton,
  detailedProducts,
  youMayAlsoLikeProducts,
  DetailedProduct,
} from "@/components/products";
import { useCartStore } from "@/store/cart-store";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();
  const { addItem, openCart } = useCartStore();

  // Find product from mock dataset (fallback to default detail product if custom slug)
  const product: DetailedProduct = useMemo(() => {
    return (
      detailedProducts[slug] ||
      detailedProducts["full-sleeve-check-shirt-extra-discount-offer"]
    );
  }, [slug]);

  // Selected Size State (Defaults to first available in-stock size, or first size option)
  const defaultAvailableSize =
    product.sizeOptions.find((s) => s.availableQuantity > 0)?.size ||
    product.sizeOptions[0]?.size ||
    "";
  const [selectedSize, setSelectedSize] = useState<string>(defaultAvailableSize);
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  // Determine available stock for current size
  const currentSizeOption = product.sizeOptions.find(
    (s) => s.size === selectedSize
  );
  const availableQuantity = currentSizeOption?.availableQuantity ?? 0;
  const isOutOfStock = availableQuantity <= 0;

  // Handler: Add to Cart
  const handleAddToCart = () => {
    if (isOutOfStock) {
      toast.error("Selected size is currently out of stock");
      return;
    }

    setIsAdding(true);
    addItem(
      {
        _id: product._id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        mrpPrice: product.mrpPrice,
        thumbnailImage: product.thumbnailImage,
      } as any,
      quantity,
      {
        _id: `inv-${product._id}-${selectedSize}`,
        size: selectedSize,
        availableQuantity,
      } as any
    );

    toast.success(`Added ${product.name} (Size: ${selectedSize}) to your cart.`);
    setIsAdding(false);
    openCart();
  };

  // Handler: Buy Now (Add to cart and proceed directly to checkout)
  const handleBuyNow = () => {
    if (isOutOfStock) {
      toast.error("Selected size is currently out of stock");
      return;
    }

    addItem(
      {
        _id: product._id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        mrpPrice: product.mrpPrice,
        thumbnailImage: product.thumbnailImage,
      } as any,
      quantity,
      {
        _id: `inv-${product._id}-${selectedSize}`,
        size: selectedSize,
        availableQuantity,
      } as any
    );

    router.push("/checkout");
  };

  if (!product) {
    return <ProductDetailSkeleton />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#090407] text-white selection:bg-rose-600 selection:text-white">
      {/* 1. Top Announcement Bar */}
      <AnnouncementBar text="FREE SHIPPING ON ORDERS OVER ৳5000" />

      {/* 2. Global Navbar */}
      <Navbar brandName="HEEMS" />

      {/* Main Product Container */}
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-6 sm:py-10 max-w-7xl">
        {/* 3. Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center flex-wrap gap-2 text-xs text-zinc-400 mb-8 sm:mb-12 font-medium"
        >
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span className="text-zinc-600">/</span>
          <Link href="/products" className="hover:text-white transition-colors">
            Shop
          </Link>
          <span className="text-zinc-600">/</span>
          <Link
            href={`/products?category=${product.categorySlug}`}
            className="hover:text-white transition-colors"
          >
            {product.categoryName}
          </Link>
          <span className="text-zinc-600">/</span>
          <span className="text-white font-semibold truncate max-w-[200px] sm:max-w-md">
            {product.name}
          </span>
        </nav>

        {/* 4. Two-Column Showcase Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left Column: Image Gallery (6 cols) */}
          <div className="lg:col-span-6 lg:sticky lg:top-24">
            <ProductGallery
              images={product.images}
              productName={product.name}
              isSale={product.isSale}
            />
          </div>

          {/* Right Column: Product Info & Actions (6 cols) */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            {/* Header, Price & Stock Info */}
            <ProductInfo
              categoryName={product.categoryName}
              categorySlug={product.categorySlug}
              name={product.name}
              price={product.price}
              mrpPrice={product.mrpPrice}
              sku={product.sku}
              availableQuantity={availableQuantity}
            />

            {/* Size Selector */}
            <SizeSelector
              sizeOptions={product.sizeOptions}
              selectedSize={selectedSize}
              onSelectSize={(size) => {
                setSelectedSize(size);
                setQuantity(1);
              }}
            />

            {/* Quantity Selector */}
            <QuantitySelector
              quantity={quantity}
              maxQuantity={availableQuantity}
              onChange={setQuantity}
            />

            {/* Add to Cart & Buy Now Actions */}
            <AddToCartActions
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
              isOutOfStock={isOutOfStock}
              isLoading={isAdding}
            />

            {/* Product Accordion (Description, Care, Shipping) */}
            <div className="pt-4">
              <ProductAccordion
                description={product.description}
                detailsAndCare={product.detailsAndCare}
                shippingAndReturns={product.shippingAndReturns}
              />
            </div>
          </div>
        </div>

        {/* 5. "You may also like" Section */}
        <div className="mt-16 sm:mt-24">
          <RelatedProducts products={youMayAlsoLikeProducts} />
        </div>
      </main>

      {/* 6. Footer */}
      <Footer brandName="HEEMS" />

      {/* Global Interactive Drawers */}
      <CartDrawer />
      <SearchModal />
    </div>
  );
}
