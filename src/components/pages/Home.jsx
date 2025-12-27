import { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  HomeCard,
  CardImage,
  CardImageWrapper,
  CardText,
  DiscountBadge,
} from '../Cards';
import { fetchProducts } from '../api/products';
import { Link } from 'react-router-dom';
import { ProductPrice, OldPrice } from '../../styles/fonts';

const Grid = styled.div`
  margin: 3rem;
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
  justify-self: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const PriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`;

function calculateDiscount(price, discountedPrice) {
  return Math.round(((price - discountedPrice) / price) * 100);
}

export function Home() {
  const [products, setProducts] = useState({ data: [], meta: {} });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        setIsError(false);

        const data = await fetchProducts();
        setProducts(data);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, []);

  if (isLoading) return <div>Loading products</div>;
  if (isError) return <div>Error loading data</div>;

  return (
    <Grid>
      {products.data.map((product) => (
        <Link
          key={product.id}
          to={`/product/${product.id}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <HomeCard key={product.id}>
            <CardImageWrapper>
              <CardImage src={product.image.url} />
              {product.price !== product.discountedPrice && (
                <DiscountBadge>
                  -{calculateDiscount(product.price, product.discountedPrice)}%
                </DiscountBadge>
              )}
            </CardImageWrapper>
            <CardText>
              <h2>{product.title}</h2>
              {product.price !== product.discountedPrice ? (
                <PriceContainer>
                  <OldPrice>{product.price} kr</OldPrice>
                  <ProductPrice>{product.discountedPrice} kr</ProductPrice>
                </PriceContainer>
              ) : (
                <ProductPrice>{product.price} kr</ProductPrice>
              )}
            </CardText>
          </HomeCard>
        </Link>
      ))}
    </Grid>
  );
}
