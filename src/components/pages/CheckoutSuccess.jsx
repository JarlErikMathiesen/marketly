import styled from 'styled-components';
import { CircleCheckBig } from 'lucide-react';
import { CardSuccess } from '../Cards';
import { CheckoutButton } from '../../styles/buttons';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useCart } from '../../context/CartContext';

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 3rem 1rem;
`;

const CheckoutSuccessCircle = styled(CircleCheckBig)`
  color: ${({ theme }) => theme.colors.gold};
  background-color: ${({ theme }) => theme.colors.background};
  padding: 20px;
  border-radius: 50px;
  width: 40px;
  height: 40px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 20px;
    height: 20px;
  }
`;

export function CheckoutSuccess() {
  const { emptyCart } = useCart();

  useEffect(() => {
    emptyCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageWrapper>
      <CardSuccess>
        <CheckoutSuccessCircle />
        <h1>Checkout success!</h1>
        <div>
          Thank you for your purchase! Your order has been confirmed and will be
          shipped soon. You'll receive an email confirmation shortly.
        </div>
        <Link to="/">
          <CheckoutButton>Continue Shopping</CheckoutButton>
        </Link>
      </CardSuccess>
    </PageWrapper>
  );
}
