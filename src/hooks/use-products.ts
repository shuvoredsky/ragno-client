import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { PaginatedResult, Product, ProductFilterParams } from "@/types";

export function useProducts(params: ProductFilterParams = {}) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: async () => {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          queryParams.append(key, String(value));
        }
      });

      const res = await apiClient.get<PaginatedResult<Product>>(
        `/product/pagination?${queryParams.toString()}`
      );
      return res.data;
    },
  });
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: async () => {
      const res = await apiClient.get<Product>(`/product/${slug}`);
      return res.data;
    },
    enabled: !!slug,
  });
}

export function useProductSearch(searchQuery: string) {
  return useQuery({
    queryKey: ["product-search", searchQuery],
    queryFn: async () => {
      const res = await apiClient.get<Product[]>(`/product/search?search=${encodeURIComponent(searchQuery)}`);
      return res.data;
    },
    enabled: searchQuery.length >= 2,
  });
}

export function useSpecialOffers() {
  return useQuery({
    queryKey: ["special-offers"],
    queryFn: async () => {
      const res = await apiClient.get<Product[]>("/product/special-offers");
      return res.data;
    },
  });
}

export function useNewArrivals() {
  return useQuery({
    queryKey: ["new-arrivals"],
    queryFn: async () => {
      const res = await apiClient.get<Product[]>("/product/new-arrivals");
      return res.data;
    },
  });
}

export function useProductViewType(viewType: "top" | "middle" | "lowerMiddle" | "buttom") {
  return useQuery({
    queryKey: ["product-view-type", viewType],
    queryFn: async () => {
      const res = await apiClient.get<Product[]>(`/product/view-type?viewType=${viewType}`);
      return res.data;
    },
    enabled: !!viewType,
  });
}

export function useRelatedProducts(productId: string) {
  return useQuery({
    queryKey: ["related-products", productId],
    queryFn: async () => {
      const res = await apiClient.get<Product[]>(`/product/related-product/${productId}`);
      return res.data;
    },
    enabled: !!productId,
  });
}

export function useComplementaryProducts(productId: string) {
  return useQuery({
    queryKey: ["complementary-products", productId],
    queryFn: async () => {
      const res = await apiClient.get<Product[]>(`/product/complementary-products/${productId}`);
      return res.data;
    },
    enabled: !!productId,
  });
}

export function useYouMayAlsoLikeProducts(productId: string) {
  return useQuery({
    queryKey: ["you-may-also-like", productId],
    queryFn: async () => {
      const res = await apiClient.get<Product[]>(`/product/you-may-also-like/${productId}`);
      return res.data;
    },
    enabled: !!productId,
  });
}
