import { styled, css } from 'styled-components';

export const BaseButton = styled.button`
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
`;

const primaryButtonStyles = css`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.gold};

  &:hover {
    background: ${({ theme }) => theme.colors.gold};
    color: ${({ theme }) => theme.colors.background};
  }
`;

export const AddToCartButton = styled(BaseButton)`
  ${primaryButtonStyles};

  padding: 1rem 2rem;
  font-size: 1rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

export const CheckoutButton = styled(BaseButton)`
  ${primaryButtonStyles};

  width: 100%;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  margin-top: 1.5rem;
`;

export const SubmitButton = styled(BaseButton)`
  ${primaryButtonStyles};

  margin-top: 1rem;
  padding: 0.9rem;
  font-size: 1rem;
`;

export const ViewItemButton = styled(SubmitButton)`
  ${primaryButtonStyles};
  margin-top: auto;
`;

export const QuantityButton = styled(BaseButton)`
  background: white;
  border: 1px solid #ddd;
  width: 32px;
  height: 32px;
  border-radius: 4px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 1.2rem;

  &:hover {
    background: #f5f5f5;
    border-color: #999;
  }
`;

export const RemoveButton = styled(BaseButton)`
  background: none;
  color: #e74c3c;
  font-size: 0.9rem;

  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: #a31303ff;
  }
`;
