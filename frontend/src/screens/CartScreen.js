import { getProduct } from '../../api';
import { getCartItems, setCartItems } from '../localStorage';
import { parseRequestUrl } from '../utils';

const addToCart = (item, forceUpdate = false) => {
  let cartItems = getCartItems();
  const existItem = cartItems.find(x => x.id === item.product);
  if (existItem) {
    cartItems = existItem.map((x) => x.product === existItem.product ? item : x);
  } else {
    cartItems = [...cartItems, item];
  }
  setCartItems(cartItems);


}

const CartScreen = {
  after_render: () => {

  },
  render: async () => {
    const request = parseRequestUrl()
    if (request.id) {
      const product = await getProduct(request.id);
      addToCart({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        countInStock: product.countInStock,
        qty: 1
      })
    }
    return `<div>CartScreen</div>
    <div>${getCartItems().length}</div>`;

  }
}
export default CartScreen;