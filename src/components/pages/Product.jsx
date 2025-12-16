import { useState, useEffect } from 'react';
import { fetchProducts } from '../api/products';
import { useParams } from 'react-router-dom';

const BASE_URL = 'https://v2.api.noroff.dev/online-shop';

export function Product() {
  const [products, setProducts] = useState({ data: [], meta: {} });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        setIsError(false);

        const response = await fetch(`${BASE_URL}/${id}`);
        const { data } = await response.json();
        setProducts(data);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, []);

  if (isLoading) return <div>Loading product</div>;
  if (isError) return <div>Error loading data</div>;

  return (
    <div>
      <h1>{products.title}</h1>
      {console.log(products)}
    </div>
  );
}
