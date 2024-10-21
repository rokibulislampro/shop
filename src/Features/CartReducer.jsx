export const totalItem = (cart) => {
  return cart.reduce((total, item) => total + item.quantity, 0);
};

export const totalPrice = cart => {
  return cart.reduce((total, item) => {
    const priceToUse =
      item.discountPrice && item.discountPrice > 0
        ? item.discountPrice
        : item.price;
    return total + priceToUse * item.quantity;
  }, 0);
};


const CartReducer = (state, action) => {
  switch (action.type) {
    case 'Add':
      const productIndex = state.findIndex(
        item => item.id === action.product.id
      );
      const quantityToAdd = action.product.quantity || 1; // Default to 1 if no quantity is provided

      if (productIndex >= 0) {
        return state.map((item, index) =>
          index === productIndex
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item
        );
      } else {
        return [...state, { ...action.product, quantity: quantityToAdd }];
      }

    case 'Increase':
      return state.map(item =>
        item.id === action.id ? { ...item, quantity: item.quantity + 1 } : item
      );

    case 'Decrease':
      return state.map(item =>
        item.id === action.id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );

    case 'Remove':
      return state.filter(item => item.id !== action.id);

    case 'CLEAR_CART':
      return [];

    default:
      return state;
  }
};

export default CartReducer;

