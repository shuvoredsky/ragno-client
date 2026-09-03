import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface AddressData {
  fullName: string;
  email?: string;
  phone: string;
  fullAddress: string;
  city?: string;
}

export interface ShippingData {
  methodId: string;
  methodName: string;
  description: string;
  rate: number;
  agreedToTerms: boolean;
}

export type PaymentOption = "delivery_charge" | "full_payment";
export type PaymentMethod = "bkash" | "nagad" | "rocket" | "sslcommerz";

export interface PaymentData {
  paymentOption: PaymentOption;
  paymentMethod: PaymentMethod;
  senderNumber: string;
  transactionId?: string;
}

interface CheckoutState {
  currentStep: 1 | 2 | 3;
  incompleteOrderId: string | null;
  address: AddressData;
  shipping: ShippingData;
  payment: PaymentData;
  couponCode: string;
  couponDiscount: number;

  // Actions
  setStep: (step: 1 | 2 | 3) => void;
  nextStep: () => void;
  prevStep: () => void;
  setAddress: (data: Partial<AddressData>) => void;
  setShipping: (data: Partial<ShippingData>) => void;
  setPayment: (data: Partial<PaymentData>) => void;
  setIncompleteOrderId: (orderId: string | null) => void;
  setCoupon: (code: string, discount: number) => void;
  resetCheckout: () => void;
}

const initialAddress: AddressData = {
  fullName: "",
  email: "",
  phone: "",
  fullAddress: "",
  city: "Dhaka",
};

const initialShipping: ShippingData = {
  methodId: "steadfast",
  methodName: "Steadfast Courier",
  description: "Home delivery nationwide",
  rate: 115,
  agreedToTerms: true,
};

const initialPayment: PaymentData = {
  paymentOption: "delivery_charge",
  paymentMethod: "bkash",
  senderNumber: "",
  transactionId: "",
};

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set) => ({
      currentStep: 1,
      incompleteOrderId: null,
      address: initialAddress,
      shipping: initialShipping,
      payment: initialPayment,
      couponCode: "",
      couponDiscount: 0,

      setStep: (step) => set({ currentStep: step }),
      nextStep: () =>
        set((state) => ({
          currentStep: (Math.min(3, state.currentStep + 1) as 1 | 2 | 3),
        })),
      prevStep: () =>
        set((state) => ({
          currentStep: (Math.max(1, state.currentStep - 1) as 1 | 2 | 3),
        })),
      setAddress: (data) =>
        set((state) => ({ address: { ...state.address, ...data } })),
      setShipping: (data) =>
        set((state) => ({ shipping: { ...state.shipping, ...data } })),
      setPayment: (data) =>
        set((state) => ({ payment: { ...state.payment, ...data } })),
      setIncompleteOrderId: (incompleteOrderId) => set({ incompleteOrderId }),
      setCoupon: (couponCode, couponDiscount) =>
        set({ couponCode, couponDiscount }),
      resetCheckout: () =>
        set({
          currentStep: 1,
          incompleteOrderId: null,
          address: initialAddress,
          shipping: initialShipping,
          payment: initialPayment,
          couponCode: "",
          couponDiscount: 0,
        }),
    }),
    {
      name: "ragno_checkout_store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
