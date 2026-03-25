import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import type { CartItem, Product } from "../types/product";
import { getProducts } from "../services/getProducts";

class ProductStore {
  @observable.ref products: Product[] = [];
  @observable cart: CartItem[] = [];
  @observable isLoading: boolean = false;

  constructor() {
    makeObservable(this);
  }

  @action fetchProducts = async () => {
    this.isLoading = true;
    try {
      const data = await getProducts();
      runInAction(() => {
        this.products = data;
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  @action addToCart = (product: Product) => {
    const existItem = this.cart.find((item) => item.id === product.id);
    if (existItem) {
      existItem.quantity += 1;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
  };

  @action removeFromCart = (id: number) => {
    this.cart = this.cart.filter((item) => item.id !== id);
  };

  @computed get totalPrice() {
    return this.cart
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2);
  }
}

export const productStore = new ProductStore();
