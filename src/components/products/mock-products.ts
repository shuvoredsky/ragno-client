export interface ProductSizeOption {
  size: string;
  availableQuantity: number;
  barcode?: string;
}

export interface DetailedProduct {
  _id: string;
  name: string;
  slug: string;
  price: number;
  mrpPrice?: number;
  thumbnailImage: string;
  images: string[];
  categoryName: string;
  categorySlug: string;
  fabric?: string;
  sku: string;
  isSale?: boolean;
  isOutOfStock?: boolean;
  sizeOptions: ProductSizeOption[];
  description: string;
  detailsAndCare: string[];
  shippingAndReturns: string;
}

export interface ShopProduct {
  _id?: string;
  name: string;
  slug: string;
  price: number;
  mrpPrice?: number;
  thumbnailImage: string;
  categorySlug?: string;
  fabric?: string;
  isSale?: boolean;
  isOutOfStock?: boolean;
}

export const detailedProducts: Record<string, DetailedProduct> = {
  "full-sleeve-check-shirt-extra-discount-offer": {
    _id: "prod-detail-01",
    name: "Full sleeve check shirt extra discount offer",
    slug: "full-sleeve-check-shirt-extra-discount-offer",
    price: 550,
    mrpPrice: 800,
    thumbnailImage: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=1000&auto=format&fit=crop",
    ],
    categoryName: "premium-quality-at-a-fair-price",
    categorySlug: "fair-price",
    fabric: "waffle-cotton",
    sku: "SKU FSCS-9537",
    isSale: true,
    sizeOptions: [
      { size: "S", availableQuantity: 0 },
      { size: "M", availableQuantity: 2 },
      { size: "L", availableQuantity: 0 },
      { size: "XL", availableQuantity: 0 },
    ],
    description:
      "Engineered from high-density, breathable woven yarn, this full-sleeve check shirt provides a tailored yet effortless drape. Perfect for versatile casual-to-semi-formal layering across all seasons. Features reinforced seams, durable resin buttons, and a structured spread collar.",
    detailsAndCare: [
      "100% Pre-shrunk Combed Cotton Yarn",
      "Spread collar with buttoned front placket",
      "Single patch chest pocket",
      "Double-button adjustable barrel cuffs",
      "Machine wash cold inside out with like colors",
      "Do not bleach, warm iron if necessary",
    ],
    shippingAndReturns:
      "Standard delivery in Dhaka within 24-48 hours. Nationwide delivery across Bangladesh in 3-5 business days. Cash on delivery available. Hassle-free 7-day exchange policy for unworn items with original tags intact.",
  },
};

export const youMayAlsoLikeProducts: ShopProduct[] = [
  {
    _id: "rel-01",
    name: "Stripe full sleeve shirt",
    slug: "stripe-full-sleeve-shirt",
    price: 650,
    mrpPrice: 800,
    thumbnailImage: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=800&auto=format&fit=crop",
    isSale: true,
    isOutOfStock: true,
  },
  {
    _id: "rel-02",
    name: "Regular Fit Textured Shirt",
    slug: "regular-fit-textured-shirt",
    price: 450,
    thumbnailImage: "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?q=80&w=800&auto=format&fit=crop",
    isSale: false,
    isOutOfStock: true,
  },
  {
    _id: "rel-03",
    name: "Grey & White Striped Boxy Fit Shirt",
    slug: "grey-white-striped-boxy-fit-shirt",
    price: 800,
    thumbnailImage: "https://images.unsplash.com/photo-1589310243389-96a5483213a8?q=80&w=800&auto=format&fit=crop",
    isSale: false,
    isOutOfStock: false,
  },
  {
    _id: "rel-04",
    name: "Rust Orange Textured Boxy Fit Shirt",
    slug: "rust-orange-textured-boxy-fit-shirt",
    price: 800,
    thumbnailImage: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop",
    isSale: false,
    isOutOfStock: true,
  },
];

export const allMockProducts: ShopProduct[] = [
  {
    _id: "prod-all-01",
    name: "Full sleeve check shirt extra discount offer",
    slug: "full-sleeve-check-shirt-extra-discount-offer",
    price: 550,
    mrpPrice: 800,
    thumbnailImage: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop",
    categorySlug: "basic",
    fabric: "waffle-cotton",
    isSale: true,
  },
  {
    _id: "prod-all-02",
    name: "Most premium! black full sleeves shirt",
    slug: "most-premium-black-full-sleeves-shirt",
    price: 1250,
    mrpPrice: 1750,
    thumbnailImage: "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=800&auto=format&fit=crop",
    categorySlug: "premium",
    fabric: "woolen",
    isSale: true,
  },
  {
    _id: "prod-all-03",
    name: "Full sleeve luxury printed shirt offer",
    slug: "full-sleeve-luxury-printed-shirt-offer",
    price: 950,
    mrpPrice: 1550,
    thumbnailImage: "https://images.unsplash.com/photo-1589310243389-96a5483213a8?q=80&w=800&auto=format&fit=crop",
    categorySlug: "premium",
    fabric: "silk-printed",
    isSale: true,
  },
  {
    _id: "prod-all-04",
    name: "Premium Linen Summer Floral Drop",
    slug: "premium-linen-summer-floral-drop",
    price: 850,
    mrpPrice: 1400,
    thumbnailImage: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800&auto=format&fit=crop",
    categorySlug: "basic",
    fabric: "linen",
    isSale: true,
  },
  {
    _id: "prod-all-05",
    name: "Most premium! Full sleeve shirt",
    slug: "most-premium-full-sleeve-shirt",
    price: 1350,
    mrpPrice: 1950,
    thumbnailImage: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=800&auto=format&fit=crop",
    categorySlug: "premium",
    fabric: "woolen",
    isSale: true,
  },
  {
    _id: "prod-all-06",
    name: "Full sleeve check shirt",
    slug: "full-sleeve-check-shirt",
    price: 890,
    mrpPrice: 1450,
    thumbnailImage: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop",
    categorySlug: "basic",
    fabric: "waffle-cotton",
    isSale: true,
  },
  {
    _id: "prod-all-07",
    name: "Grey & White Striped Cozy Fit Shirt",
    slug: "grey-white-striped-cozy-fit-shirt",
    price: 850,
    thumbnailImage: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=800&auto=format&fit=crop",
    categorySlug: "basic",
    fabric: "linen",
  },
  {
    _id: "prod-all-08",
    name: "Sand Beige Classic Cotton Casual",
    slug: "sand-beige-classic-cotton-casual",
    price: 950,
    thumbnailImage: "https://images.unsplash.com/photo-1589310243389-96a5483213a8?q=80&w=800&auto=format&fit=crop",
    categorySlug: "basic",
    fabric: "waffle-cotton",
  },
  {
    _id: "prod-all-09",
    name: "Tailored Executive Oxford Texture",
    slug: "tailored-executive-oxford-texture",
    price: 1150,
    mrpPrice: 1650,
    thumbnailImage: "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?q=80&w=800&auto=format&fit=crop",
    categorySlug: "premium",
    fabric: "woolen",
    isSale: true,
  },
  {
    _id: "prod-all-10",
    name: "White Minimalist Relaxed Shirt",
    slug: "white-minimalist-relaxed-shirt",
    price: 790,
    thumbnailImage: "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=800&auto=format&fit=crop",
    categorySlug: "basic",
    fabric: "linen",
  },
  {
    _id: "prod-all-11",
    name: "Dark Chocolate Everyday Cotton",
    slug: "dark-chocolate-everyday-cotton",
    price: 850,
    thumbnailImage: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop",
    categorySlug: "basic",
    fabric: "waffle-cotton",
  },
  {
    _id: "prod-all-12",
    name: "Sage Green Micro Print Luxury Shirt",
    slug: "sage-green-micro-print-luxury-shirt",
    price: 1250,
    thumbnailImage: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop",
    categorySlug: "premium",
    fabric: "silk-printed",
  },
];
