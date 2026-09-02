export interface MockProduct {
  _id: string;
  name: string;
  slug: string;
  price: number;
  mrpPrice: number;
  thumbnailImage: string;
  isSale: boolean;
}

export interface ShowcaseData {
  title: string;
  description?: string;
  collectionHref: string;
  collectionLabel: string;
  products: MockProduct[];
}

export const homeShowcaseSections: ShowcaseData[] = [
  {
    title: "New Arrivals",
    description: "The latest drops. Fresh styles added weekly.",
    collectionHref: "/products?isNewArrival=true",
    collectionLabel: "Shop Collection",
    products: [
      {
        _id: "prod-01",
        name: "Full sleeve check shirt extra discount offer",
        slug: "full-sleeve-check-shirt-extra-discount-offer",
        price: 650,
        mrpPrice: 1200,
        thumbnailImage: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop",
        isSale: true,
      },
      {
        _id: "prod-02",
        name: "Most premium! black full sleeves shirt",
        slug: "most-premium-black-full-sleeves-shirt",
        price: 1250,
        mrpPrice: 1750,
        thumbnailImage: "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=800&auto=format&fit=crop",
        isSale: true,
      },
      {
        _id: "prod-03",
        name: "Grey & White Striped Cozy Fit Shirt",
        slug: "grey-white-striped-cozy-fit-shirt",
        price: 850,
        mrpPrice: 1400,
        thumbnailImage: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=800&auto=format&fit=crop",
        isSale: true,
      },
      {
        _id: "prod-04",
        name: "Sand Beige Classic Cotton Casual",
        slug: "sand-beige-classic-cotton-casual",
        price: 950,
        mrpPrice: 1600,
        thumbnailImage: "https://images.unsplash.com/photo-1589310243389-96a5483213a8?q=80&w=800&auto=format&fit=crop",
        isSale: true,
      },
    ],
  },
  {
    title: "premium-quality-at-a-fair-price",
    description: "Handcrafted fabrics engineered for daily comfort and durability.",
    collectionHref: "/products?category=fair-price",
    collectionLabel: "Shop Collection",
    products: [
      {
        _id: "prod-05",
        name: "Full sleeve check shirt extra discount offer",
        slug: "full-sleeve-check-shirt-extra-discount-offer-2",
        price: 650,
        mrpPrice: 1200,
        thumbnailImage: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop",
        isSale: true,
      },
      {
        _id: "prod-06",
        name: "Grey & White Striped Cozy Fit Shirt",
        slug: "grey-white-striped-cozy-fit-shirt-2",
        price: 850,
        mrpPrice: 1400,
        thumbnailImage: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=800&auto=format&fit=crop",
        isSale: true,
      },
      {
        _id: "prod-07",
        name: "Sand Beige Classic Cotton Casual",
        slug: "sand-beige-classic-cotton-casual-2",
        price: 890,
        mrpPrice: 1450,
        thumbnailImage: "https://images.unsplash.com/photo-1589310243389-96a5483213a8?q=80&w=800&auto=format&fit=crop",
        isSale: true,
      },
      {
        _id: "prod-08",
        name: "Olive Drab Minimalist Utility Shirt",
        slug: "olive-drab-minimalist-utility-shirt",
        price: 990,
        mrpPrice: 1550,
        thumbnailImage: "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?q=80&w=800&auto=format&fit=crop",
        isSale: true,
      },
    ],
  },
  {
    title: "expensive",
    description: "Exclusive luxury drops for discerning trendsetters.",
    collectionHref: "/products?category=expensive",
    collectionLabel: "Shop Collection",
    products: [
      {
        _id: "prod-09",
        name: "Most premium! black full sleeves shirt",
        slug: "most-premium-black-full-sleeves-shirt-2",
        price: 1250,
        mrpPrice: 1750,
        thumbnailImage: "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=800&auto=format&fit=crop",
        isSale: true,
      },
      {
        _id: "prod-10",
        name: "Most premium! Full sleeve shirt",
        slug: "most-premium-full-sleeve-shirt-patterned",
        price: 1350,
        mrpPrice: 1950,
        thumbnailImage: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800&auto=format&fit=crop",
        isSale: true,
      },
      {
        _id: "prod-11",
        name: "Premium Silk Blend Formal Shirt",
        slug: "premium-silk-blend-formal-shirt",
        price: 1450,
        mrpPrice: 2100,
        thumbnailImage: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=800&auto=format&fit=crop",
        isSale: true,
      },
      {
        _id: "prod-12",
        name: "Tailored Executive Linen Shirt",
        slug: "tailored-executive-linen-shirt",
        price: 1650,
        mrpPrice: 2400,
        thumbnailImage: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop",
        isSale: true,
      },
    ],
  },
];
