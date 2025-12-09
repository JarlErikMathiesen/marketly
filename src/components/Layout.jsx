import styled from 'styled-components';
import { ShoppingCart } from 'lucide-react';
import logo from '../assets/images/logo/marketly.svg';

const HeaderWrapper = styled.header`
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.m} ${({ theme }) => theme.spacing.l};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
`;

const Logo = styled.img`
  height: 24px;
  cursor: pointer;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 18px;
  }
`;

const CartIcon = styled(ShoppingCart)`
  color: ${({ theme }) => theme.colors.gold};
  width: 40px;
  height: 40px;
  cursor: pointer;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 20px;
    height: 20px;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.l};
`;

const NavContacts = styled.h2`
  color: ${({ theme }) => theme.colors.gold};
`;

const FooterWrapper = styled.footer`
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.l};
  text-align: center;
`;

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
`;

function Header() {
  return (
    <HeaderWrapper>
      <Logo src={logo} alt="marketly logo" />
      <Nav>
        <NavContacts>Contact</NavContacts>
        <CartIcon />
      </Nav>
    </HeaderWrapper>
  );
}

function Footer() {
  return (
    <FooterWrapper>
      <Logo src={logo} alt="marketly logo" />
    </FooterWrapper>
  );
}

export default function Layout({ children }) {
  return (
    <PageWrapper>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </PageWrapper>
  );
}
