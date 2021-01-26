import { getOrder } from '../../api';
import { hideLoading, parseRequestUrl } from "../utils";

const OrderScreen = {
  after_render: async () => {
    hideLoading();
  },
  render: async () => {
    const request = parseRequestUrl();
    const {
      _id,
      shipping,
      payment,
      orderItems,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      isDelivered,
      deliveredAt,
      isPaid,
      paidAt,
    } = await getOrder(request.id);
    return `
    <div>
    <h1>Pedido ${_id}</h1>
      <div class="order">
        <div class="order-info">
          <div>
            <h2>Shipping</h2>
            <div>
            ${shipping.address}, ${shipping.city}, ${shipping.postalCode}, 
            ${shipping.country}
            </div>
            ${isDelivered
        ? `<div class="success">Entregue em ${deliveredAt}</div>`
        : `<div class="error">Não entregue</div>`
      }
             
          </div>
          <div>
            <h2>Pagamento</h2>
            <div>
              Método de pagamento : ${payment.paymentMethod}
            </div>
            ${isPaid
        ? `<div class="success">Pago em ${paidAt}</div>`
        : `<div class="error">Pagamento pendente</div>`
      }
          </div>
          <div>
            <ul class="cart-list-container">
              <li>
                <h2>Carrinho de compras</h2>
                <div>Preço</div>
              </li>
              ${orderItems
        .map(
          (item) => `
                <li>
                  <div class="cart-image">
                    <img src="${item.image}" alt="${item.name}" />
                  </div>
                  <div class="cart-name">
                    <div>
                      <a href="/#/product/${item.product}">${item.name} </a>
                    </div>
                    <div> Qty: ${item.qty} </div>
                  </div>
                  <div class="cart-price"> $${item.price}</div>
                </li>
                `
        )
        .join('\n')}
            </ul>
          </div>
        </div>
        <div class="order-action">
           <ul>
                <li>
                  <h2>Order Summary</h2>
                 </li>
                 <li><div>Itens</div><div>$${itemsPrice}</div></li>
                 <li><div>Entrega</div><div>$${shippingPrice}</div></li>
                 <li><div>Taxa</div><div>$${taxPrice}</div></li>
                 <li class="total"><div>Total do Pedido</div><div>$${totalPrice}</div></li> 
                 <li>
               
        </div>
      </div>
    </div>
    `;
  },
};
export default OrderScreen;