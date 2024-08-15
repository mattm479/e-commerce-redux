import { removeFromCart, updateCartQuantity } from "../../utils/actions.js";
import { idbPromise } from "../../utils/helpers.js";
import {useDispatch} from "react-redux";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const removeItemFromCart = (item) => {
    dispatch(removeFromCart({ _id: item._id }));
    idbPromise('cart', 'delete', { ...item });
  };

  const onChange = (e) => {
    const value = parseInt(e.target.value);
    if (value === 0) {
      dispatch(removeFromCart({ _id: item._id }));
      idbPromise('cart', 'delete', { ...item });

    } else {
      dispatch(updateCartQuantity({ item: { ...item, purchaseQuantity: value } }));
      idbPromise('cart', 'put', { ...item, purchaseQuantity: value });
    }
  }

  return (
    <div className="flex-row">
      <div>
        <img
          src={`/images/${item.image}`}
          alt=""
        />
      </div>
      <div>
        <div>{item.name}, ${item.price}</div>
        <div>
          <span>Qty:</span>
          <input
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={onChange}
          />
          <span
            role="img"
            aria-label="trash"
            onClick={() => removeItemFromCart(item)}
          >
            🗑️
          </span>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
