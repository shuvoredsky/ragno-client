import { ApiResponse } from "@/types";
import { getAccessToken } from "./utils";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8002/api/v1";

interface FetchOptions extends RequestInit {
  maxRetries?: number;
  retryDelay?: number;
  timeout?: number;
  token?: string;
}

// In-flight deduplication cache
const inFlightRequests = new Map<string, Promise<any>>();

/**
 * Sleeps for a given duration in milliseconds
 */
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Resolves localhost to 127.0.0.1 fallback for IPv4 consistency
 */
function resolveUrl(url: string): string {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  const cleanPath = url.startsWith("/") ? url : `/${url}`;
  return `${BASE_URL}${cleanPath}`;
}

/**
 * Core resilient fetch function with retry, 429 backoff & timeout
 */
export async function fetchWithRetry<T = any>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<ApiResponse<T>> {
  const {
    maxRetries = 2,
    retryDelay = 800,
    timeout = 10000,
    token,
    ...customConfig
  } = options;

  let currentUrl = resolveUrl(endpoint);

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(customConfig.headers as Record<string, string>),
  };

  // Attach token if provided or stored
  const authToken = token || getAccessToken();
  if (authToken && !headers["Authorization"]) {
    headers["Authorization"] = authToken.startsWith("Bearer ")
      ? authToken
      : `Bearer ${authToken}`;
  }

  let lastError: any = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(currentUrl, {
        ...customConfig,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Handle Rate Limiting (429)
      if (response.status === 429 && attempt < maxRetries) {
        const retryAfter = response.headers.get("Retry-After");
        const waitTime = retryAfter
          ? parseInt(retryAfter, 10) * 1000
          : Math.min(retryDelay * Math.pow(2, attempt), 8000);

        console.warn(`[RateLimit 429] Retrying ${endpoint} after ${waitTime}ms...`);
        await sleep(waitTime);
        continue;
      }

      // Handle 5xx Server Errors with exponential retry
      if (response.status >= 500 && attempt < maxRetries) {
        const waitTime = retryDelay * Math.pow(2, attempt);
        console.warn(`[Server Error ${response.status}] Retrying ${endpoint} in ${waitTime}ms...`);
        await sleep(waitTime);
        continue;
      }

      const data = await response.json().catch(() => ({
        success: false,
        statusCode: response.status,
        message: response.statusText || "Invalid server response",
      }));

      if (!response.ok) {
        throw {
          success: false,
          statusCode: response.status,
          message: data.message || "An unexpected error occurred",
          errors: data.errors,
          data: data.data,
        };
      }

      return data as ApiResponse<T>;
    } catch (error: any) {
      clearTimeout(timeoutId);
      lastError = error;

      if (error.name === "AbortError") {
        lastError = {
          success: false,
          statusCode: 408,
          message: "Request timeout. Server took too long to respond.",
        };
      }

      // If connection refused, try IPv4 fallback once
      if (
        (error?.cause?.code === "ECONNREFUSED" || error?.cause?.code === "ENOTFOUND") &&
        currentUrl.includes("localhost")
      ) {
        currentUrl = currentUrl.replace("localhost", "127.0.0.1");
        continue;
      }

      if (attempt < maxRetries) {
        await sleep(retryDelay * Math.pow(2, attempt));
        continue;
      }
    }
  }

  throw lastError || {
    success: false,
    statusCode: 500,
    message: "Network request failed after multiple retries",
  };
}

/**
 * Resilient API Client Helper
 */
export const apiClient = {
  get: <T = any>(url: string, options?: FetchOptions): Promise<ApiResponse<T>> => {
    // In-flight deduplication for GET calls
    const cacheKey = `GET:${url}:${JSON.stringify(options?.headers || {})}`;
    if (inFlightRequests.has(cacheKey)) {
      return inFlightRequests.get(cacheKey)!;
    }

    const requestPromise = fetchWithRetry<T>(url, {
      ...options,
      method: "GET",
    }).finally(() => {
      setTimeout(() => inFlightRequests.delete(cacheKey), 500);
    });

    inFlightRequests.set(cacheKey, requestPromise);
    return requestPromise;
  },

  post: <T = any>(url: string, body?: any, options?: FetchOptions): Promise<ApiResponse<T>> => {
    return fetchWithRetry<T>(url, {
      ...options,
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  put: <T = any>(url: string, body?: any, options?: FetchOptions): Promise<ApiResponse<T>> => {
    return fetchWithRetry<T>(url, {
      ...options,
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  patch: <T = any>(url: string, body?: any, options?: FetchOptions): Promise<ApiResponse<T>> => {
    return fetchWithRetry<T>(url, {
      ...options,
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  delete: <T = any>(url: string, options?: FetchOptions): Promise<ApiResponse<T>> => {
    return fetchWithRetry<T>(url, {
      ...options,
      method: "DELETE",
    });
  },
};
