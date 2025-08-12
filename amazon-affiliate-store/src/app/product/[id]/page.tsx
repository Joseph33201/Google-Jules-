import Link from 'next/link';
import { cache } from 'react';

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  description: string;
  url: string;
}

const getProduct = cache(async (id: string): Promise<Product | undefined> => {
  const res = await fetch(`http://localhost:3000/api/products/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    if (res.status === 404) {
      return undefined;
    }
    throw new Error('Failed to fetch product');
  }
  return res.json();
});

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
    return (
      <main className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl font-bold">Product not found</h1>
        <Link href="/" className="text-blue-500 hover:underline mt-4 inline-block">
          Back to all products
        </Link>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={product.image} alt={product.name} className="rounded-lg w-full" />
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl text-gray-800 mb-4">${product.price}</p>
          <p className="text-gray-600 mb-8">{product.description}</p>
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 text-lg"
          >
            Buy on Amazon
          </a>
        </div>
      </div>
    </main>
  );
}
