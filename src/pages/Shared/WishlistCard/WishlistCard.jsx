import { useContext } from 'react';
import {
  CartContext,
  WishlistContext,
} from '../../../Features/ContextProvider';
import { toast } from 'react-toastify'; // Import toast from react-toastify

const WishlistCard = ({ product }) => {
  const { wishlistDispatch } = useContext(WishlistContext);
  const { cartDispatch } = useContext(CartContext);

  const handleRemoveFromWishlist = id => {
    wishlistDispatch({
      type: 'REMOVE_FROM_WISHLIST',
      id: id,
    });
    return true; // Indicate removal was successful
  };

  const handleRemoveWishlist = id => {
    wishlistDispatch({
      type: 'REMOVE_FROM_WISHLIST',
      id: id,
    });
    toast.info('Item Removed from Wishlist!'); // Show success message for removal
  };

  const addToCart = product => {
    const isRemoved = handleRemoveFromWishlist(product.id);
    if (isRemoved) {
      cartDispatch({
        type: 'Add',
        product: { ...product, id: product._id },
      });
      toast.success(`${product.name} Added to Cart!`); // Show success message for adding to cart
    }
  };

  const handlePreOrder = product => {
    const isRemoved = handleRemoveFromWishlist(product.id);
    if (isRemoved) {
      cartDispatch({
        type: 'Add',
        product: { ...product, id: product._id },
      });
      toast.success(`${product.name} Added to Cart for Pre Order!`); // Show success message for pre-ordering
    }
  };

  return (
    <section className="text-sm">
      <div className="flex justify-center">
        <div className="md:flex w-full justify-center">
          <div className="flex w-full items-center justify-center">
            <div className="flex w-full items-center justify-around gap-4">
              <button
                className="font-bold text-xl"
                onClick={() => handleRemoveWishlist(product.id)}
              >
                ×
              </button>
              <div className="flex w-full items-center justify-around gap-4">
                <img
                  src={product.image}
                  alt="Product Photo"
                  className="w-16 h-16 object-cover rounded"
                />
                <p className="w-full text-[#15161d]">{product.name}</p>
              </div>
            </div>
            <div className="flex w-full items-center justify-around gap-4">
              <p className="">
                ৳{' '}
                {product.discountPrice > 0
                  ? product.discountPrice
                  : product.price}
              </p>
              <p
                className={`font-semibold ${
                  product.status === 'Available'
                    ? 'text-[#4c9e16]'
                    : 'text-[#ff5a00]'
                }`}
              >
                {product.status}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-end w-full">
            {product.status === 'Out of Stock' ? (
              <button
                className="w-fit bg-[#1e1f29] text-white font-semibold py-2 px-6 rounded-full transition-all"
                onClick={() => handlePreOrder(product)}
              >
                Pre-Order
              </button>
            ) : (
              <button
                className="w-fit bg-[#ff5a00] hover:bg-[#1e1f29] text-white font-semibold py-2 px-4 rounded-full transition-all"
                onClick={() => addToCart(product)}
              >
                Add To Cart
              </button>
            )}
          </div>
        </div>
      </div>
      <hr className="my-3" />
    </section>
  );
};

export default WishlistCard;
