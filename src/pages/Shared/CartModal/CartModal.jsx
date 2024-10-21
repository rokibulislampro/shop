import { useContext } from 'react';
import deleteImg from '../../../assets/Icons/trash.png';
import { CartContext } from '../../../Features/ContextProvider';

const CartModal = ({ product }) => {
  const { cartDispatch } = useContext(CartContext);

  const Remove = id => {
    cartDispatch({ type: 'Remove', id });
  };

  return (
    <section className="overflow-auto text-sm">
      <div className="flex gap-2 items-center">
        <img src={product.image} className="w-1/6 rounded-sm" alt="" />
        <div className="ms-0">
          <p className="font-semibold">{product.name}</p>
          <p className="font-semibold">
            {product.quantity} ✕ <span className="font-semibold">৳</span>{' '}
            {product.discountPrice > 0 ? product.discountPrice : product.price}
          </p>
        </div>
        <div
          className="flex justify-center items-center ml-auto"
          onClick={() => Remove(product.id)}
        >
          <img
            src={deleteImg}
            className="w-7 h-7 hover:w-8 hover:h-8 hover:bg-slate-200 hover:p-1.5 transition-all rounded-full"
            alt="Remove"
          />
        </div>
      </div>
      <hr className="my-4" />
    </section>
  );
};

export default CartModal;
