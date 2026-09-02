interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900">Product Details: {slug}</h1>
      <p className="text-sm text-gray-500 mt-1">Single product details page placeholder.</p>
    </div>
  );
}
