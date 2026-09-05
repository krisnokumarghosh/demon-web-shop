import ProductDetailsClient from "@/components/shared/ProductDetailsClient";

const DATA_URL = "https://demon-web-shop.vercel.app/data.json";

const ProductDetailsPage = async ({ params }) => {
  const { id } = await params;
  console.log(params)

  const res = await fetch(DATA_URL, { cache: "no-store" });
  const data = await res.json();
  const product = data.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="w-full py-32 flex items-center justify-center">
        <p className="text-xs font-bold uppercase tracking-widest text-black/40">
          Product not found
        </p>
      </div>
    );
  }

  return <ProductDetailsClient product={product} />;
};

export default ProductDetailsPage;