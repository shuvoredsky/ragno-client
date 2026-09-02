import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { Category, SubCategory, ChildCategory } from "@/types";

export function useCategoryNavbar() {
  return useQuery({
    queryKey: ["category-navbar"],
    queryFn: async () => {
      const res = await apiClient.get<Category[]>("/category/navbar");
      return res.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes cache for navigation tree
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await apiClient.get<Category[]>("/category");
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useCategory(slug: string) {
  return useQuery({
    queryKey: ["category", slug],
    queryFn: async () => {
      const res = await apiClient.get<Category>(`/category/${slug}`);
      return res.data;
    },
    enabled: !!slug,
  });
}

export function useSubCategories() {
  return useQuery({
    queryKey: ["sub-categories"],
    queryFn: async () => {
      const res = await apiClient.get<SubCategory[]>("/sub-category");
      return res.data;
    },
  });
}

export function useChildCategories() {
  return useQuery({
    queryKey: ["child-categories"],
    queryFn: async () => {
      const res = await apiClient.get<ChildCategory[]>("/child-category");
      return res.data;
    },
  });
}
