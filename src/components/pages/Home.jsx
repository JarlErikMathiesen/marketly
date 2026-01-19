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
  align-items: stretch;

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

const SearchWrapper = styled.div`
  grid-column: 1/-1;
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  padding: 15px;
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.gold};
`;

const SearchInput = styled.input`
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.gold};
  }
`;

const SuggestionsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  margin: 5px;
`;

const SuggestionItem = styled.div`
  padding: 10px;
  margin: 5px;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.colors.gold};
  border-radius: 8px;
  &:hover {
    background: ${({ theme }) => theme.colors.gold};
    color: black;
  }
`;

function SearchBar({ value, onChange, suggestions, onSelect }) {
  return (
    <SearchWrapper>
      <label htmlFor="search-bar">Search</label>

      <SearchInput
        type="text"
        id="search-bar"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search products..."
      />

      {value && suggestions.length > 0 && (
        <SuggestionsList>
          {suggestions.map((product) => (
            <SuggestionItem
              key={product.id}
              onClick={() => onSelect(product.title)}
            >
              {product.title}
            </SuggestionItem>
          ))}
        </SuggestionsList>
      )}
    </SearchWrapper>
  );
}

function calculateDiscount(price, discountedPrice) {
  return Math.round(((price - discountedPrice) / price) * 100);
}

export function Home() {
  const [products, setProducts] = useState({ data: [], meta: {} });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.data.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const suggestions = filteredProducts.slice(0, 5);

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
      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        suggestions={suggestions}
        onSelect={setSearchTerm}
      />

      {filteredProducts.map((product) => (
        <Link
          key={product.id}
          to={`/product/${product.id}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <HomeCard>
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
