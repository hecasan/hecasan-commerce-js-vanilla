import { deleteOrder, getOrders } from '../../api';
import DashboardMenu from '../components/DashboardMenu';
import { hideLoading, rerender, showLoading, showMessage } from '../utils';

const OrderListScreen = {
  after_render: () => {
    const deleteButtons = document.getElementsByClassName('delete-button');
    Array.from(deleteButtons).forEach((deleteButton) => {
      deleteButton.addEventListener('click', async () => {
        if (confirm('Tem certeza que deseja deleta  esse pedido?')) {
          showLoading();
          const data = await deleteOrder(deleteButton.id);
          if (data.error) {
            showMessage(data.error);
          } else {
            rerender(OrderListScreen);
          }
          hideLoading();
        }
      });
    });
  },
  render: async () => {
    const orders = await getOrders();
    return `
    <div class="dashboard">
    ${DashboardMenu.render({ selected: 'orders' })}
    <div class="dashboard-content">
      <h1>Pedidos</h1>
       
      <div class="order-list">
        <table>
          <thead>
            <tr>
              <th>ID DO PEDIDO</th>
              <th>DATA</th>
              <th>TOTAL</th>
              <th>USUÁRIO</th>
              <th>PAGO EM</th>
              <th>ENTREGUE EM</th>
              <th class="tr-action">AÇÃO</th>
            <tr>
          </thead>
          <tbody>
            ${orders
        .map(
          (order) => `
            <tr>
              <td>${order._id}</td>
              <td>${order.createdAt}</td>
              <td>${order.totalPrice}</td>
              <td>${order.user.name}</td>
              <td>${order.paidAt || 'Não Pago'}</td>
              <td>${order.deliveredAt || 'Não Entregue'}</td>
              <td>

              <button id="${order._id}" class="edit-button"><i class="fa fa-edit"></i></button>
              <button id="${order._id}" class="delete-button"><i class="fa fa-trash"></i></button>
              </td>
            </tr>
            `
        )
        .join('\n')}
          </tbody>
        </table>
      </div>
    </div>
  </div>
    `;
  },
};
export default OrderListScreen;