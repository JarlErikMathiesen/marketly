import { createContext, useContext, useReducer } from 'react';

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const product = action.payload;

      const existingItem = state.find((item) => item.id === product.id);

      if (existingItem) {
        return state.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...state,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          discountedPrice: product.discountedPrice,
          image: product.image,
          quantity: 1,
        },
      ];
    }

    case 'DECREMENT_ITEM': {
      return state
        .map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);
    }

    case 'REMOVE_ITEM': {
      return state.filter((item) => item.id !== action.payload);
    }

    default:
      return state;
  }
}

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const addItem = (product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const decrementItem = (id) => {
    dispatch({ type: 'DECREMENT_ITEM', payload: id });
  };

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalDiscountedPrice = cart.reduce(
    (sum, item) => sum + item.discountedPrice * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        decrementItem,
        removeItem,
        totalQuantity,
        totalPrice,
        totalDiscountedPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
