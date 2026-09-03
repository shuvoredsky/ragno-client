"use server";

import { cookies } from "next/headers";
import { User, ApiResponse, AuthResponse } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8002/api/v1";

interface LoginCredentials {
  email?: string;
  phone?: string;
  password: string;
}

interface RegisterPayload {
  name: string;
  email?: string;
  phone: string;
  password: string;
}

interface ActionResult<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  user?: User;
}

/**
 * Server Action: Authenticate user, set HttpOnly JWT cookie
 */
export async function loginAction(credentials: LoginCredentials): Promise<ActionResult> {
  try {
    const response = await fetch(`${BASE_URL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(credentials),
      cache: "no-store",
    });

    const data: ApiResponse<AuthResponse> = await response.json().catch(() => ({
      success: false,
      statusCode: response.status,
      message: "Invalid response from authentication server",
    }));

    if (!response.ok || !data.success || !data.data) {
      return {
        success: false,
        message: data.message || "Invalid email/phone or password.",
      };
    }

    const { accessToken, refreshToken, user } = data.data;
    const cookieStore = await cookies();

    // Clean "Bearer " prefix for cookie storage
    const cleanAccessToken = accessToken.replace(/^Bearer\s+/i, "").trim();

    // 1. Store accessToken in HttpOnly, Secure cookie (30 days)
    cookieStore.set("accessToken", cleanAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    // 2. Store refreshToken if provided (365 days)
    if (refreshToken) {
      const cleanRefreshToken = refreshToken.replace(/^Bearer\s+/i, "").trim();
      cookieStore.set("refreshToken", cleanRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 365 * 24 * 60 * 60, // 365 days
      });
    }

    // 3. Store non-sensitive user profile data for immediate UI rendering (No sensitive tokens!)
    cookieStore.set("user_session", JSON.stringify(user), {
      httpOnly: false, // Read-only user name/avatar for client UI
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 30 * 24 * 60 * 60,
    });

    return {
      success: true,
      message: data.message || "Login successful",
      user,
    };
  } catch (error: any) {
    console.error("loginAction error:", error);
    return {
      success: false,
      message: error.message || "Failed to connect to authentication server. Please try again.",
    };
  }
}

/**
 * Server Action: Register new user
 */
export async function registerAction(payload: RegisterPayload): Promise<ActionResult> {
  try {
    const response = await fetch(`${BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const data: ApiResponse = await response.json().catch(() => ({
      success: false,
      statusCode: response.status,
      message: "Invalid response from server",
    }));

    if (!response.ok || !data.success) {
      return {
        success: false,
        message: data.message || "Registration failed. Email or phone may already exist.",
      };
    }

    return {
      success: true,
      message: data.message || "Account created successfully!",
      data: data.data,
    };
  } catch (error: any) {
    console.error("registerAction error:", error);
    return {
      success: false,
      message: error.message || "Failed to complete registration. Please try again.",
    };
  }
}

/**
 * Server Action: Clear HttpOnly auth cookies and session
 */
export async function logoutAction(): Promise<ActionResult> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    cookieStore.delete("user_session");

    return {
      success: true,
      message: "Logged out successfully",
    };
  } catch (error: any) {
    console.error("logoutAction error:", error);
    return {
      success: false,
      message: "Error clearing session cookies",
    };
  }
}

/**
 * Server Action: Read current session from cookies
 */
export async function getSessionAction(): Promise<{
  isAuthenticated: boolean;
  user: User | null;
}> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    const sessionCookie = cookieStore.get("user_session")?.value;

    if (!token) {
      return { isAuthenticated: false, user: null };
    }

    let user: User | null = null;
    if (sessionCookie) {
      try {
        user = JSON.parse(sessionCookie);
      } catch (e) {
        user = null;
      }
    }

    return {
      isAuthenticated: true,
      user,
    };
  } catch (error) {
    return { isAuthenticated: false, user: null };
  }
}
