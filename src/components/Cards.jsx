import styled from 'styled-components';

export const Card = styled.div`
  border-radius: 20px;
  margin-bottom: 16px;
  max-width: 300px;
  min-width: 150px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 8px 10px -6px rgba(0, 0, 0, 0.1);
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
  background: green;
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  font-weight: bold;
`;
