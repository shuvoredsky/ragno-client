import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { CompleteOrderPayload, IncompleteOrderPayload, Order } from "@/types";

export function useCreateIncompleteOrder() {
  return useMutation({
    mutationFn: async (payload: IncompleteOrderPayload) => {
      const res = await apiClient.post<Order>("/order/incomplete", payload);
      return res.data;
    },
  });
}

export function useCompleteOrder() {
  return useMutation({
    mutationFn: async ({ orderId, payload }: { orderId: string; payload: CompleteOrderPayload }) => {
      const res = await apiClient.patch<Order>(`/order/complete/${orderId}`, payload);
      return res;
    },
  });
}

export function useTrackOrder(orderId: string) {
  return useQuery({
    queryKey: ["track-order", orderId],
    queryFn: async () => {
      const res = await apiClient.get<Order>(`/order/track?orderId=${encodeURIComponent(orderId)}`);
      return res.data;
    },
    enabled: !!orderId,
  });
}

export function useUserOrders(userId: string) {
  return useQuery({
    queryKey: ["user-orders", userId],
    queryFn: async () => {
      const res = await apiClient.get<Order[]>(`/order/user/${userId}`);
      return res.data;
    },
    enabled: !!userId,
  });
}
