import styled from 'styled-components';
import { ShoppingCart } from 'lucide-react';
import logo from '../assets/images/logo/marketly.svg';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';

const HeaderWrapper = styled.header`
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.m} ${({ theme }) => theme.spacing.l};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  z-index: 10;
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

const NavItem = styled(NavLink)`
  color: ${({ theme }) => theme.colors.gold};
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;

  &.active {
    text-decoration: underline;
  }

  &:hover {
    color: white;
  }
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
      <Link to="/">
        <Logo src={logo} alt="marketly logo" />
      </Link>
      <Nav>
        <NavItem to="/">Home</NavItem>
        <NavItem to="/contact">Contact</NavItem>
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
