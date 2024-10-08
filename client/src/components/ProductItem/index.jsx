import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers.js"
import { addProduct, updateCartQuantity } from "../../utils/actions.js";
import { idbPromise } from "../../utils/helpers.js";
import {useDispatch, useSelector} from "react-redux";

function ProductItem(item) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const {
    image,
    name,
    _id,
    price,
    quantity
  } = item;

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id)
    if (itemInCart) {
      dispatch(updateCartQuantity({ _id: _id, purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1 }));
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch(addProduct({ product: { ...item, purchaseQuantity: 1 } }));
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  }

  return (
    <div className="card px-1 py-1">
      <Link to={`/products/${_id}`}>
        <img
          alt={name}
          src={`/images/${image}`}
        />
        <p>{name}</p>
      </Link>
      <div>
        <div>{quantity} {pluralize("item", quantity)} in stock</div>
        <span>${price}</span>
      </div>
      <button onClick={addToCart}>Add to cart</button>
    </div>
  );
}

export default ProductItem;
