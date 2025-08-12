import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  description: string;
  url: string;
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const filePath = path.join(process.cwd(), 'data', 'products.json');
  const jsonData = await fs.readFile(filePath, 'utf-8');
  const products: Product[] = JSON.parse(jsonData);
  const product = products.find((p) => p.id === params.id);

  if (product) {
    return NextResponse.json(product);
  } else {
    return new Response(JSON.stringify({ message: 'Product not found' }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
