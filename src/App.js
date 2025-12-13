import { React, useState, useEffect } from 'react';
import styled from 'styled-components';
import Layout from './components/Layout';
import {
  Card,
  CardImage,
  CardImageWrapper,
  CardText,
  DiscountBadge,
} from './components/Cards';

const url = 'https://v2.api.noroff.dev/online-shop';

function calculateDiscount(price, discountedPrice) {
  return Math.round(((price - discountedPrice) / price) * 100);
}

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

const ProductPrice = styled.span`
  font-weight: bold;
  font-size: 25px;
`;

const OldPrice = styled(ProductPrice)`
  text-decoration: line-through;
  opacity: 0.6;
`;

function App() {
  const [products, setProducts] = useState({ data: [], meta: {} });

  // State for holding our loading state
  const [isLoading, setIsLoading] = useState(false);
  // State for holding our error state
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        // Reset the error state in case there as an error previously
        setIsError(false);
        // Turn on the loading state each time we do an API call
        setIsLoading(true);
        const response = await fetch(url);
        const json = await response.json();
        setProducts(json);
        // Clear the loading state once we've successfully got our data
        setIsLoading(false);
      } catch (error) {
        // Clear the loading state if we get an error and then
        // set our error state to true
        setIsLoading(false);
        setIsError(true);
      }
    }

    getData();
  }, []);

  if (isLoading) {
    return <div>Loading products</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <div>
      {console.log(products.data)}
      <Layout>
        <Grid>
          {products.data.map((product) => (
            <Card key={product.id}>
              <CardImageWrapper>
                <CardImage src={product.image.url} />
                {product.price !== product.discountedPrice && (
                  <DiscountBadge>
                    -{calculateDiscount(product.price, product.discountedPrice)}
                    %
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
            </Card>
          ))}
        </Grid>
      </Layout>
    </div>
  );
}

export default App;
