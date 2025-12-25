import { useCart } from '../../context/CartContext';

export function Cart() {
  const { cart, addItem, decrementItem, removeItem, totalPrice } = useCart();
  function formatPrice(value) {
    return Number(value).toFixed(2);
  }

  if (cart.length === 0) {
    return (
      <div>
        <h1>Cart</h1>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Cart</h1>

      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            <strong>{item.title}</strong>
            <div>Price: {item.price} kr</div>
            <div>Quantity: {item.quantity}</div>
            <div>Subtotal: {formatPrice(item.price * item.quantity)} kr</div>
            <button onClick={() => addItem(item)}>+</button>
            <button onClick={() => decrementItem(item.id)}>-</button>
            <button onClick={() => removeItem(item.id)}>remove</button>
          </li>
        ))}
      </ul>
      <h2>Total: {formatPrice(totalPrice)} kr</h2>
    </div>
  );
}
