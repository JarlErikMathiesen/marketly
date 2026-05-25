# Marketly

Marketly is a modern online shop built for a JavaScript Frameworks course. Browse products from the Noroff Online Shop API, search with live suggestions, view rich product details and reviews, manage a cart with discounts, and complete a checkout success flow—all in a responsive, accessible React application.

## Features

- Product catalogue fetched from Noroff Online Shop API
- Search with live suggestions on the home page
- Responsive layout with styled-components theme
- Product detail pages with images, pricing, discount badge, and reviews
- Add to cart from product pages
- Cart page with quantity controls, per-item subtotals, and order summary
- Discount handling (strike-through original price and percentage off)
- Checkout success page that clears the cart
- Contact form with validation (React Hook Form + Yup)
- Client-side routing and Netlify SPA redirect

## Live Demo

Try the live version here:
https://marketly-react.netlify.app/

## Technologies Used

- React (Create React App / react-scripts)
- React Router
- styled-components
- lucide-react (icons)
- React Hook Form + Yup (form validation)
- REST API (Noroff Online Shop API v2)
- Git and GitHub
- VS Code

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (v18 or newer recommended)
- Git
- A code editor (VS Code recommended)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/JarlErikMathiesen/marketly.git
   cd marketly
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Build for production (optional):

   ```bash
   npm run build
   ```
