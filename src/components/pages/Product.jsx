import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ShoppingCart, Star } from 'lucide-react';
import { useTheme } from 'styled-components';
import { useCart } from '../../context/CartContext';

const BASE_URL = 'https://v2.api.noroff.dev/online-shop';

const ProductContainer = styled.div`
  max-width: 1200px;
  margin: 3rem auto;
  padding: 0 1rem;
`;

const ProductGrid = styled.div`
  display: grid;
  gap: 3rem;
  grid-template-columns: 1fr;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ImageWrapper = styled.div`
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: contain;
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ProductTitle = styled.h1`
  font-size: 2rem;
  margin: 0;
`;

const PriceSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ProductPrice = styled.span`
  font-weight: bold;
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.discount};
`;

const OldPrice = styled.span`
  text-decoration: line-through;
  opacity: 0.6;
  font-size: 1.2rem;
`;

const DiscountBadge = styled.span`
  background: ${({ theme }) => theme.colors.discount};
  color: white;
  padding: 5px 12px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 0.9rem;
`;

const DescriptionSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SectionTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
`;

const Description = styled.p`
  margin: 0;
  color: #666;
  line-height: 1.6;
`;

const AddToCartButton = styled.button`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.gold};
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background 0.3s;

  &:hover {
    background: ${({ theme }) => theme.colors.gold};
    color: ${({ theme }) => theme.colors.background};
  }
`;

const ReviewsSection = styled.div`
  margin-top: 3rem;
  grid-column: 1 / -1;
`;

const ReviewsTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
`;

const ReviewCard = styled.div`
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 1rem;
`;

const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
`;

const ReviewerName = styled.span`
  font-weight: 600;
`;

const ReviewRating = styled.div`
  display: flex;
  gap: 2px;
`;
const ReviewText = styled.p`
  margin: 0;
  color: #666;
  line-height: 1.6;
`;

function calculateDiscount(price, discountedPrice) {
  return Math.round(((price - discountedPrice) / price) * 100);
}

function renderStars(rating, theme) {
  return (
    <>
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          size={16}
          fill={index < rating ? theme.colors.gold : 'none'}
          color={index < rating ? theme.colors.gold : '#d1d5db'}
        />
      ))}
    </>
  );
}

export function Product() {
  const [products, setProducts] = useState({ data: [], meta: {} });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { id } = useParams();
  const theme = useTheme();
  const { addItem } = useCart();

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
  }, [id]);

  if (isLoading) return <div>Loading product</div>;
  if (isError) return <div>Error loading data</div>;

  return (
    <ProductContainer>
      <ProductGrid>
        <ImageWrapper>
          <ProductImage src={products.image?.url} alt={products.title} />
        </ImageWrapper>

        <ProductDetails>
          <ProductTitle>{products.title}</ProductTitle>

          <PriceSection>
            <ProductPrice>{products.discountedPrice} kr</ProductPrice>
            {products.price !== products.discountedPrice && (
              <>
                <OldPrice>{products.price} kr</OldPrice>
                <DiscountBadge>
                  {calculateDiscount(products.price, products.discountedPrice)}%
                  OFF
                </DiscountBadge>
              </>
            )}
          </PriceSection>

          <DescriptionSection>
            <SectionTitle>Description</SectionTitle>
            <Description>{products.description}</Description>
          </DescriptionSection>

          <AddToCartButton onClick={() => addItem(products)}>
            <ShoppingCart size={20} />
            Add to Cart
          </AddToCartButton>
        </ProductDetails>

        <ReviewsSection>
          <ReviewsTitle>Customer Reviews</ReviewsTitle>
          {products.reviews?.length > 0 ? (
            products.reviews.map((review) => (
              <ReviewCard key={review.id}>
                <ReviewHeader>
                  <ReviewerName>{review.username}</ReviewerName>
                  <ReviewRating>
                    {renderStars(review.rating, theme)}
                  </ReviewRating>
                </ReviewHeader>
                <ReviewText>{review.description}</ReviewText>
              </ReviewCard>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </ReviewsSection>
      </ProductGrid>
    </ProductContainer>
  );
}
