import styled from 'styled-components';

export const BaseCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const HomeCard = styled(BaseCard)`
  margin-bottom: 16px;
  max-width: 300px;
  min-width: 150px;
`;

export const CartItemCard = styled(BaseCard)`
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

export const OrderSummaryCard = styled(BaseCard)`
  padding: 2rem;
  margin-top: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const CardText = styled.div`
  display: grid;
  padding: 16px;
`;

export const CardImageWrapper = styled.div`
  position: relative;
  border-radius: 15px;
`;

export const CardImage = styled.img`
  width: 100%;
  height: 12rem;
  object-fit: cover;
  border-radius: 20px 20px 0px 0px;

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

export const DiscountBadge = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  background: ${({ theme }) => theme.colors.discount};
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  font-weight: bold;
`;

export const ProductDiscountBadge = styled(DiscountBadge)`
  position: relative;
  top: 0px;
  right: 0px;
`;
