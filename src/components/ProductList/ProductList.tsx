import { observer } from "mobx-react-lite";
import { productStore } from "../../store/productStore";
import { useEffect } from "react";
import css from "./ProductList.module.css";

const ProductList = observer(() => {
  const { products, isLoading, fetchProducts, addToCart } = productStore;

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [fetchProducts, products.length]);

  if (isLoading) {
    return <div className={css.loading}>Loading...</div>;
  }

  return (
    <div className={css.container}>
      {products.map((product) => (
        <div key={product.id} className={css.card}>
          <img
            src={product.thumbnail}
            alt={product.title}
            className={css.thumbnail}
          />
          <h3 className={css.title}>{product.title}</h3>
          <p className={css.price}>{product.price} $</p>
          <button onClick={() => addToCart(product)} className={css.addButton}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
});

export default ProductList;
