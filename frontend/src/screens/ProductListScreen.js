import { getProducts } from '../../api';
import DashboardMenu from '../components/DashboardMenu';

const ProductListScreen = {
  after_render: () => { },
  render: async () => {
    const products = await getProducts();
    return `
    <div class="dashboard">
    ${DashboardMenu.render({ selected: 'products' })}
    <div class="dashboard-content">
      <h1>Produtos</h1>
      <button id="create-product-button" class="primary">
        Adicionar Produtos
      </button>
      <div class="product-list">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Preço</th>
              <th>Categoria</th>
              <th>Marca</th>
              <th class="tr-action">Ação</th>
            <tr>
          </thead>
          <tbody>
            ${products
        .map(
          (product) => `
            <tr>
              <td>${product._id}</td>
              <td>${product.name}</td>
              <td>${product.price}</td>
              <td>${product.category}</td>
              <td>${product.brand}</td>
              <td>
              <button id="${product._id}" class="edit-button"><i class="fa fa-edit"></i></button>
              <button id="${product._id}" class="delete-button"><i class="fa fa-trash"></i></button>
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
export default ProductListScreen;