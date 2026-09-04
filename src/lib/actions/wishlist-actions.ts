"use server";

import { apiServer } from "@/lib/api-server";

export async function toggleWishlistAction(productId: string, userId?: string) {
  try {
    if (!userId) {
      return { success: true, isGuest: true };
    }

    const res = await apiServer.post<{ isWishlisted: boolean }>("/wish-list/toggle", {
      productRef: productId,
      userRef: userId,
    });

    return {
      success: true,
      isWishlisted: res.data?.isWishlisted ?? true,
      message: res.message || "Wishlist updated",
    };
  } catch (error: any) {
    console.error("toggleWishlistAction error:", error);
    return {
      success: false,
      message: error?.response?.data?.message || "Failed to update wishlist",
    };
  }
}

export async function fetchUserWishlistAction(userId: string) {
  try {
    const res = await apiServer.get<any[]>(`/wish-list?userId=${userId}`);
    return {
      success: true,
      data: res.data || [],
    };
  } catch (error: any) {
    console.error("fetchUserWishlistAction error:", error);
    return {
      success: false,
      data: [],
      message: error?.response?.data?.message || "Failed to fetch wishlist",
    };
  }
}
