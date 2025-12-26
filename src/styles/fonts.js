import styled from 'styled-components';

export const ProductPrice = styled.span`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

export const OldPrice = styled(ProductPrice)`
  text-decoration: line-through;
  opacity: 0.6;
`;
