import { cookies } from "next/headers";
import { ApiResponse } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8002/api/v1";

interface ServerFetchOptions extends RequestInit {
  token?: string;
}

/**
 * Server-Side API Client: Automatically attaches HttpOnly JWT cookie to backend requests
 */
export async function fetchServer<T = any>(
  endpoint: string,
  options: ServerFetchOptions = {}
): Promise<ApiResponse<T>> {
  const { token, ...customConfig } = options;

  let authToken = token;
  if (!authToken) {
    try {
      const cookieStore = await cookies();
      authToken = cookieStore.get("accessToken")?.value;
    } catch (e) {
      // Called outside request context
      authToken = undefined;
    }
  }

  const cleanPath = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${BASE_URL}${cleanPath}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(customConfig.headers as Record<string, string>),
  };

  if (authToken) {
    headers["Authorization"] = authToken.startsWith("Bearer ")
      ? authToken
      : `Bearer ${authToken}`;
  }

  const response = await fetch(url, {
    ...customConfig,
    headers,
    cache: customConfig.cache || "no-store",
  });

  const data = await response.json().catch(() => ({
    success: false,
    statusCode: response.status,
    message: response.statusText || "Server communication failed",
  }));

  if (!response.ok) {
    throw {
      success: false,
      statusCode: response.status,
      message: data.message || "An error occurred during server fetch",
      errors: data.errors,
      data: data.data,
    };
  }

  return data as ApiResponse<T>;
}

export const apiServer = {
  get: <T = any>(url: string, options?: ServerFetchOptions) =>
    fetchServer<T>(url, { ...options, method: "GET" }),
  post: <T = any>(url: string, body?: any, options?: ServerFetchOptions) =>
    fetchServer<T>(url, {
      ...options,
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    }),
  put: <T = any>(url: string, body?: any, options?: ServerFetchOptions) =>
    fetchServer<T>(url, {
      ...options,
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    }),
  patch: <T = any>(url: string, body?: any, options?: ServerFetchOptions) =>
    fetchServer<T>(url, {
      ...options,
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    }),
  delete: <T = any>(url: string, options?: ServerFetchOptions) =>
    fetchServer<T>(url, { ...options, method: "DELETE" }),
};
