import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import { removeFromCart, clearCart } from '../store/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleRemoveFromCart = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {cartItems.map(item => (
              <div key={item.id} className="border p-4 rounded-lg">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <button 
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button 
            onClick={handleClearCart}
            className="bg-gray-700 text-white px-4 py-2 rounded"
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
