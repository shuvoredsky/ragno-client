interface OrderSuccessProps {
  params: Promise<{ orderId: string }>;
}

export default async function OrderSuccessPage({ params }: OrderSuccessProps) {
  const { orderId } = await params;

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-2xl font-bold text-gray-900">Order Confirmed!</h1>
      <p className="text-sm text-gray-500 mt-2">
        Thank you for your purchase. Your Order ID is <span className="font-semibold text-black">{orderId}</span>.
      </p>
    </div>
  );
}
