import ProductCard from '../components/ProductCard';
import { cache } from 'react';

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  description: string;
  url: string;
}

// Using a hardcoded URL for the API endpoint. In a real-world scenario,
// this should be handled with environment variables.
const getProducts = cache(async (): Promise<Product[]> => {
  const res = await fetch('http://localhost:3000/api/products', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  return res.json();
});

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Welcome to our Store!</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
