// Standard API Response Structure
export interface ApiResponse<T = any> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  url?: string;
  errors?: string[];
}

// Pagination Metadata
export interface PaginationMeta {
  currentPage: number;
  currentPageLimit?: number;
  total: number;
  totalPage: number;
  prevPage?: number | null;
  prevPageLimit?: number;
  nextPage?: number | null;
  nextPageLimit?: number;
}

export interface PaginatedResult<T> {
  result: T[];
  pagination: PaginationMeta;
  filterOptions?: {
    priceRange?: {
      minPrice: number;
      maxPrice: number;
    };
  };
}

// User Model
export interface User {
  _id: string;
  userId?: string;
  name: string;
  email: string;
  phone?: string;
  role?: string;
  roleRef?: string;
  isVerified?: boolean;
  image?: string;
  address?: string;
  city?: string;
  state?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken?: string;
  user: User;
}

// Category Hierarchy (4 Tiers)
export interface SubChildCategory {
  _id: string;
  name: string;
  slug: string;
  childCategoryRef: string;
  status?: boolean;
}

export interface ChildCategory {
  _id: string;
  name: string;
  slug: string;
  subCategoryRef: string;
  subChildCategories?: SubChildCategory[];
  showProductsOnHome?: boolean;
  status?: boolean;
}

export interface SubCategory {
  _id: string;
  name: string;
  slug: string;
  categoryRef: string;
  childCategories?: ChildCategory[];
  showProductsOnHome?: boolean;
  status?: boolean;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  logo?: string;
  bannerImage?: string;
  orderBy?: number;
  landingPageStatus?: boolean;
  status?: boolean;
  subCategories?: SubCategory[];
  createdAt?: string;
}

// Brand Model
export interface Brand {
  _id: string;
  name: string;
  slug: string;
  logo?: string;
  status?: boolean;
}

// Inventory Variant Model
export interface Inventory {
  _id: string;
  inventoryID: string;
  productRef: string;
  inventoryType: "colorInventory" | "sizeInventory" | "colorSizeInventory" | "inventory";
  quantity: number;
  availableQuantity: number;
  soldQuantity: number;
  holdQuantity: number;
  colorCode?: string;
  colorName?: string;
  size?: string;
  chest?: number;
  lengthInch?: number;
  barcode?: string;
}

// Product Model
export interface Product {
  _id: string;
  productId: string;
  name: string;
  slug: string;
  description: string;
  mrpPrice: number;
  price: number;
  discount?: number;
  discountType?: "flat" | "percent";
  discountAmount?: number;
  freeShipping?: boolean;
  isSpecialOffer?: boolean;
  isNew?: boolean;
  priority?: boolean;
  thumbnailImage: string;
  thumbnailImagePublicId?: string;
  backViewImage?: string;
  backViewImagePublicId?: string;
  optionalImages?: string[];
  optionalImagesPublicIds?: string[];
  videoUrl?: string;
  specifications?: {
    colour?: string;
    fabric?: string;
    fit?: string;
    sleeve?: string;
    collar?: string;
    pocket?: string;
    length?: string;
    care?: string;
    [key: string]: string | undefined;
  };
  inventoryType: "colorInventory" | "sizeInventory" | "colorSizeInventory" | "inventory";
  mainInventory?: number;
  inventoryRef: Inventory[];
  categoryRef?: Category;
  subCategoryRef?: SubCategory;
  childCategoryRef?: ChildCategory;
  subChildCategoryRef?: SubChildCategory;
  brandRef?: Brand;
  totalSales?: number;
  totalOrders?: number;
  createdAt?: string;
  updatedAt?: string;
}

// Product Query Filters
export interface ProductFilterParams {
  page?: number;
  limit?: number;
  order?: "ASC" | "DESC";
  sortBy?: "createdAt" | "price" | "name" | "totalSales";
  minPrice?: number;
  maxPrice?: number;
  categoryId?: string;
  categorySlug?: string;
  subCategoryId?: string;
  subCategorySlug?: string;
  childCategoryId?: string;
  childCategorySlug?: string;
  subChildCategoryId?: string;
  subChildCategorySlug?: string;
  brandId?: string;
  brandSlug?: string;
  isNewArrival?: boolean;
  color?: string;
  size?: string;
  popular?: boolean;
  bestSell?: boolean;
  featured?: boolean;
  search?: string;
  viewType?: "top" | "middle" | "lowerMiddle" | "buttom";
}

// Cart Item Model
export interface CartItem {
  _id?: string;
  productRef: Product;
  inventoryRef?: Inventory;
  quantity: number;
  price: number;
  mrpPrice: number;
  userRef?: string;
}

// Order Model
export type OrderStatus =
  | "Incomplete"
  | "OrderPlaced"
  | "InReview"
  | "Hold"
  | "Delivered"
  | "Return"
  | "Cancelled";

export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED" | "CANCELLED";

export type PaymentMethod = "CashOnDelivery" | "Online" | "MobileBanking";

export interface OrderItem {
  productRef: string | Product;
  inventoryRef?: string | Inventory;
  quantity: number;
  price: number;
  mrpPrice: number;
}

export interface Order {
  _id: string;
  orderId: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  customerCity: string;
  customerAddress: string;
  customerHouse?: string;
  customerRoad?: string;
  customerThana?: string;
  customerAltPhone?: string;
  subTotalPrice: number;
  shippingCost: number;
  couponDiscount?: number;
  totalPrice: number;
  couponRef?: string;
  userRef?: any;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  transactionId?: string;
  note?: string;
  products: OrderItem[];
  createdAt?: string;
  updatedAt?: string;
}

export interface IncompleteOrderPayload {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  customerCity: string;
  customerAddress: string;
  customerHouse?: string;
  customerRoad?: string;
  customerThana?: string;
  customerAltPhone?: string;
  paymentMethod?: PaymentMethod;
  subTotalPrice: number;
  shippingCost: number;
  totalPrice: number;
  userRef?: string;
  note?: string;
  products: {
    productRef: string;
    inventoryRef?: string;
    quantity: number;
    price: number;
    mrpPrice: number;
  }[];
}

export interface CompleteOrderPayload {
  totalPrice: number;
  shippingCost: number;
  customerCity: string;
  couponDiscount?: number;
  couponRef?: string | null;
  transactionId?: string | null;
  eventId?: string;
}

// Banner Model
export interface Banner {
  _id: string;
  title?: string;
  bannerType: "MAIN BANNER" | "ADS BANNER";
  image: string;
  imagePublicId?: string;
  url?: string;
  status?: boolean;
}

// Campaign Model
export interface Campaign {
  _id: string;
  name: string;
  slug: string;
  bannerImage?: string;
  discountPercentage?: number;
  startDate?: string;
  endDate?: string;
  status?: boolean;
}

// Shipping Method Model
export interface ShippingMethod {
  _id: string;
  name: string;
  cost: number;
  duration?: string;
  status?: boolean;
}

// Product Review Model
export interface ProductReview {
  _id: string;
  productRef: string;
  customerName: string;
  customerEmail?: string;
  rating: number;
  review: string;
  images?: string[];
  status: boolean;
  createdAt?: string;
}

// Branding & Settings
export interface Branding {
  _id?: string;
  name?: string;
  logo?: string;
  favicon?: string;
  description?: string;
}

export interface SocialMedia {
  _id?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  whatsapp?: string;
  phone?: string;
  email?: string;
  address?: string;
}

export interface Policy {
  _id?: string;
  title: string;
  slug: string;
  content: string;
  type: "privacy-policy" | "return-policy" | "terms-condition";
}
