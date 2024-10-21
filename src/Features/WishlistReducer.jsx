// WishlistReducer.js
const WishlistReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_WISHLIST':
      if (state.some(item => item.id === action.product.id)) {
        return state; // If the product is already in the wishlist, do nothing
      }
      return [...state, action.product];

    case 'REMOVE_FROM_WISHLIST':
      return state.filter(item => item.id !== action.id);

    default:
      return state;
  }
};

export default WishlistReducer;
