import { useCart } from '../../context/CartContext';
import styled from 'styled-components';
import { Trash2 } from 'lucide-react';
import { ProductDiscountBadge, CartItemCard, OrderSummaryCard } from '../Cards';
import {
  CheckoutButton,
  QuantityButton,
  RemoveButton,
} from '../../styles/buttons';
import { ProductPrice, OldPrice } from '../../styles/fonts';

const CartContainer = styled.div`
  max-width: 800px;
  margin: 3rem auto;
  padding: 0 1rem;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  background: #f5f5f5;
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ProductName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
`;

const PriceSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  font-size: 20px;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const QuantityLabel = styled.span`
  font-size: 0.9rem;
  color: #666;
  margin-right: 0.5rem;
`;

const QuantityDisplay = styled.span`
  font-weight: 600;
  min-width: 32px;
  text-align: center;
`;

const ItemRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-column: 1 / -1;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Subtotal = styled.div`
  text-align: right;
`;

const SubtotalLabel = styled.div`
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 0.25rem;
`;

const SubtotalPrice = styled.div`
  font-weight: bold;
  font-size: 1.3rem;
`;

const SummaryTitle = styled.h2`
  font-size: 1.3rem;
  margin: 0 0 1.5rem 0;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 1rem;
`;

const SummaryLabel = styled.span`
  color: #666;
`;

const SummaryValue = styled.span`
  font-weight: 600;
`;

const DiscountValue = styled(SummaryValue)`
  color: ${({ theme }) => theme.colors.primary};
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 1.5rem 0;
`;

const TotalRow = styled(SummaryRow)`
  font-size: 1.3rem;
  font-weight: bold;
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;
`;

function calculateDiscount(price, discountedPrice) {
  return Math.round(((price - discountedPrice) / price) * 100);
}

export function Cart() {
  const {
    cart,
    addItem,
    decrementItem,
    removeItem,
    totalPrice,
    totalDiscountedPrice,
  } = useCart();

  function formatPrice(value) {
    return Number(value).toFixed(2);
  }

  if (cart.length === 0) {
    return (
      <CartContainer>
        <EmptyCart>
          <h2>Your cart is empty</h2>
          <p>Add some items to get started!</p>
        </EmptyCart>
      </CartContainer>
    );
  }

  const subtotal = totalPrice;
  const totalDiscount = cart.reduce(
    (sum, item) => sum + (item.price - item.discountedPrice) * item.quantity,
    0
  );

  return (
    <CartContainer>
      {cart.map((item) => (
        <CartItemCard key={item.id}>
          <ProductImage src={item.image?.url} alt={item.title} />

          <ProductDetails>
            <ProductName>{item.title}</ProductName>
            <PriceSection>
              <ProductPrice>
                {formatPrice(item.discountedPrice)} kr
              </ProductPrice>
              {item.price !== item.discountedPrice && (
                <>
                  <OldPrice>{formatPrice(item.price)} kr</OldPrice>
                  <ProductDiscountBadge>
                    {calculateDiscount(item.price, item.discountedPrice)}% OFF
                  </ProductDiscountBadge>
                </>
              )}
            </PriceSection>
            <QuantityControl>
              <QuantityLabel>Quantity:</QuantityLabel>
              <QuantityButton
                onClick={() => decrementItem(item.id)}
                disabled={item.quantity <= 1}
              >
                -
              </QuantityButton>
              <QuantityDisplay>{item.quantity}</QuantityDisplay>
              <QuantityButton onClick={() => addItem(item)}>+</QuantityButton>
            </QuantityControl>
          </ProductDetails>

          <ItemRight>
            <Subtotal>
              <SubtotalLabel>Subtotal</SubtotalLabel>
              <SubtotalPrice>
                {formatPrice(item.discountedPrice * item.quantity)} kr
              </SubtotalPrice>
            </Subtotal>
            <RemoveButton onClick={() => removeItem(item.id)}>
              <Trash2 size={16} />
              Remove
            </RemoveButton>
          </ItemRight>
        </CartItemCard>
      ))}

      <OrderSummaryCard>
        <SummaryTitle>Order summary</SummaryTitle>
        <SummaryRow>
          <SummaryLabel>Subtotal</SummaryLabel>
          <SummaryValue>{formatPrice(subtotal)} kr</SummaryValue>
        </SummaryRow>
        {totalDiscount > 0 && (
          <SummaryRow>
            <SummaryLabel>Discount</SummaryLabel>
            <DiscountValue>-{formatPrice(totalDiscount)} kr</DiscountValue>
          </SummaryRow>
        )}
        <Divider />
        <TotalRow>
          <SummaryLabel>Total</SummaryLabel>
          <SummaryValue>{formatPrice(totalDiscountedPrice)} kr</SummaryValue>
        </TotalRow>
        <CheckoutButton>Proceed to checkout</CheckoutButton>
      </OrderSummaryCard>
    </CartContainer>
  );
}
