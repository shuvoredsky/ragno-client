"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCheckoutStore } from "@/store/checkout-store";
import { useCartStore } from "@/store/cart-store";
import { createIncompleteOrderAction } from "@/lib/actions/order-actions";

const addressSchema = z.object({
  fullName: z.string().min(2, "Full Name is required (at least 2 characters)"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  phone: z
    .string()
    .min(10, "Phone number is required")
    .regex(/^(?:\+88|88)?(01[3-9]\d{8})$/, "Enter a valid Bangladeshi phone number (e.g. 01712345678)"),
  fullAddress: z
    .string()
    .min(5, "Full address is required (House, Road, Area, District)"),
});

type AddressFormValues = z.infer<typeof addressSchema>;

export function AddressStepForm() {
  const { address, setAddress, nextStep, setIncompleteOrderId, incompleteOrderId } =
    useCheckoutStore();
  const { items, getSubtotal } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      fullName: address.fullName || "",
      email: address.email || "",
      phone: address.phone || "",
      fullAddress: address.fullAddress || "",
    },
  });

  const onSubmit = async (values: AddressFormValues) => {
    setIsSubmitting(true);
    // 1. Update checkout store
    setAddress(values);

    // 2. Prepare payload for abandoned cart / incomplete order
    const subtotal = getSubtotal() || 800;
    const shippingCost = 115;
    const total = subtotal + shippingCost;

    const payload = {
      customerName: values.fullName,
      customerPhone: values.phone,
      customerEmail: values.email || "",
      customerCity: "Dhaka",
      customerAddress: values.fullAddress,
      paymentMethod: "bKash",
      products:
        items.length > 0
          ? items.map((item) => ({
              productRef: item.product._id,
              inventoryRef: item.inventory?._id,
              quantity: item.quantity,
              price: item.product.price,
              mrpPrice: item.product.mrpPrice,
              name: item.product.name,
              selectedSize: item.inventory?.size,
            }))
          : [
              {
                productRef: "demo-item-1",
                quantity: 1,
                price: 800,
                name: "Grey & White Striped Boxy Fit Shirt",
                selectedSize: "XL",
              },
            ],
      totalPrice: total,
      subTotalPrice: subtotal,
      shippingCost,
      note: "Checkout Step 1 Lead Captured",
    };

    // 3. Trigger Incomplete Order Server Action in background (non-blocking)
    createIncompleteOrderAction(payload as any).then((res) => {
      if (res.success && res.orderId) {
        setIncompleteOrderId(res.orderId);
      }
    });

    setIsSubmitting(false);
    // 4. Smoothly advance to Step 2
    nextStep();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
        Delivery Address
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-zinc-300">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            {...register("fullName")}
            type="text"
            placeholder="Enter your full name"
            className={`w-full bg-zinc-900/90 border rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder:text-zinc-600 focus:outline-none transition-colors ${
              errors.fullName
                ? "border-rose-500 focus:border-rose-400"
                : "border-white/10 focus:border-white/30"
            }`}
          />
          {errors.fullName && (
            <p className="text-[11px] text-rose-400 font-medium">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email (Optional) */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-zinc-300">
            Email (Optional)
          </label>
          <input
            {...register("email")}
            type="email"
            placeholder="your@email.com"
            className={`w-full bg-zinc-900/90 border rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder:text-zinc-600 focus:outline-none transition-colors ${
              errors.email
                ? "border-rose-500 focus:border-rose-400"
                : "border-white/10 focus:border-white/30"
            }`}
          />
          {errors.email && (
            <p className="text-[11px] text-rose-400 font-medium">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-zinc-300">
            Phone Number <span className="text-rose-500">*</span>
          </label>
          <input
            {...register("phone")}
            type="tel"
            placeholder="+880 1234-567890"
            className={`w-full bg-zinc-900/90 border rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder:text-zinc-600 focus:outline-none transition-colors ${
              errors.phone
                ? "border-rose-500 focus:border-rose-400"
                : "border-white/10 focus:border-white/30"
            }`}
          />
          {errors.phone && (
            <p className="text-[11px] text-rose-400 font-medium">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Full Address */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-zinc-300">
            Full Address <span className="text-rose-500">*</span>
          </label>
          <textarea
            {...register("fullAddress")}
            rows={3}
            placeholder="House, road, area, district — full delivery address"
            className={`w-full bg-zinc-900/90 border rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder:text-zinc-600 focus:outline-none resize-none transition-colors ${
              errors.fullAddress
                ? "border-rose-500 focus:border-rose-400"
                : "border-white/10 focus:border-white/30"
            }`}
          />
          {errors.fullAddress && (
            <p className="text-[11px] text-rose-400 font-medium">
              {errors.fullAddress.message}
            </p>
          )}
        </div>

        {/* Continue Button (Gradient Purple/Teal Glow as in Screenshot) */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-auto min-w-[150px] py-3.5 px-8 rounded-xl bg-gradient-to-r from-purple-950/60 via-zinc-900 to-teal-950/60 hover:from-purple-900/70 hover:to-teal-900/70 border border-teal-500/50 hover:border-teal-400 text-white font-black text-xs uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(20,184,166,0.25)] hover:shadow-[0_0_25px_rgba(20,184,166,0.4)] active:scale-95 disabled:opacity-50"
          >
            {isSubmitting ? "PROCESSING..." : "CONTINUE"}
          </button>
        </div>
      </form>
    </div>
  );
}
