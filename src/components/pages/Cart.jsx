import { useCart } from '../../context/CartContext';
import styled from 'styled-components';
import { Trash2 } from 'lucide-react';

const CartContainer = styled.div`
  max-width: 800px;
  margin: 3rem auto;
  padding: 0 1rem;
`;

const CartItem = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: 100px 1fr auto;
  gap: 1.5rem;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 80px 1fr;
    gap: 1rem;
  }
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
`;

const ProductPrice = styled.span`
  font-weight: bold;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const OldPrice = styled.span`
  text-decoration: line-through;
  opacity: 0.6;
  font-size: 1rem;
`;

const DiscountBadge = styled.span`
  background: ${({ theme }) => theme.colors.discount};
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-weight: bold;
  font-size: 0.75rem;
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

const QuantityButton = styled.button`
  background: white;
  border: 1px solid #ddd;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: all 0.2s;

  &:hover {
    background: #f5f5f5;
    border-color: #999;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
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

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #e74c3c;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  transition: color 0.2s;

  &:hover {
    color: #c0392b;
  }
`;

const OrderSummary = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-top: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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

const CheckoutButton = styled.button`
  width: 100%;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.gold};
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  margin-top: 1.5rem;
  transition: background 0.3s;

  &:hover {
    background: ${({ theme }) => theme.colors.gold};
    color: ${({ theme }) => theme.colors.background};
  }
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
        <CartItem key={item.id}>
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
                  <DiscountBadge>
                    {calculateDiscount(item.price, item.discountedPrice)}% OFF
                  </DiscountBadge>
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
        </CartItem>
      ))}

      <OrderSummary>
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
      </OrderSummary>
    </CartContainer>
  );
}
