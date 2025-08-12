import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
}

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="border rounded-lg p-4 flex flex-col">
      <img src={product.image} alt={product.name} className="rounded-md mb-4 h-48 w-full object-cover" />
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-gray-500">${product.price}</p>
      <Link href={`/product/${product.id}`} className="mt-auto bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 text-center">
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;
