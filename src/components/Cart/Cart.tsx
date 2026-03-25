import { observer } from "mobx-react-lite";
import { productStore } from "../../store/productStore";
import type { CartItem } from "../../types/product";
import css from "./Cart.module.css";

const Cart = observer(() => {
  const { cart, totalPrice } = productStore;

  return (
    <div className={css.cartContainer}>
      <h2>Cart</h2>

      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <div className={css.trackList}>
          <div className={css.tableHeader}>
            <span>Name</span>
            <span>Qty</span>
            <span>Price</span>
            <span></span>
          </div>

          {cart.map((item: CartItem) => (
            <div key={item.id} className={css.trackItem}>
              <span className={css.title}>{item.title}</span>
              <span>x{item.quantity}</span>
              <span>{(item.price * item.quantity).toFixed(2)} $</span>
              <button
                onClick={() => productStore.removeFromCart(item.id)}
                className={css.removeBtn}
              >
                ✕
              </button>
            </div>
          ))}

          <div className={css.totalSection}>Total: {totalPrice} $</div>
        </div>
      )}
    </div>
  );
});

export default Cart;
