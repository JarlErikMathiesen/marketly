import { React, useState, useEffect } from 'react';
import styled from 'styled-components';
import Layout from './components/Layout';
import { theme } from './styles/theme';

const url = 'https://v2.api.noroff.dev/online-shop';

function calculateDiscount(price, discountedPrice) {
  return Math.round(((price - discountedPrice) / price) * 100);
}

const Card = styled.div`
  border-radius: 20px;
  border: 3px solid #ddd;
  margin-bottom: 16px;
  max-width: 300px;
  min-width: 150px;
`;

const CardText = styled.div`
  padding: 16px;
`;

const CardImage = styled.img`
  border-radius: 15px;
  width: 100%;
  height: 12rem;
  object-fit: cover;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 14rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    height: 16rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    height: 20rem;
  }
`;

const Grid = styled.div`
  margin: 3rem;
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr; /* mobile default */
  justify-self: center;

  /* sm: ≥ 640px → 2 columns */
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }

  /* md: ≥ 768px → 3 columns */
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }

  /* xl: ≥ 1280px → 4 columns */
  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    grid-template-columns: repeat(4, 1fr);
  }
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
              <CardImage src={product.image.url} />
              <CardText>
                <h2>{product.title}</h2>
                {product.price !== product.discountedPrice ? (
                  <div>
                    <span
                      style={{ textDecoration: 'line-through', opacity: 0.6 }}
                    >
                      {product.price}
                    </span>
                    <span style={{ marginLeft: '8px', fontWeight: 'bold' }}>
                      {product.discountedPrice}
                    </span>
                    <span
                      style={{
                        marginLeft: '8px',
                        fontWeight: 'bold',
                        color: 'green',
                      }}
                    >
                      -
                      {calculateDiscount(
                        product.price,
                        product.discountedPrice
                      )}
                      %
                    </span>
                  </div>
                ) : (
                  <p>{product.price}</p>
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
