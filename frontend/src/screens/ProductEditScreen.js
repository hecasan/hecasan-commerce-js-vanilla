import { getProduct } from '../../api';
import { parseRequestUrl } from '../utils';

const ProductEditScreen = {
  after_render: () => { },
  render: async () => {
    const request = parseRequestUrl();
    const product = await getProduct(request.id);
    return `
    <div class="content">
      <div>
        <a href="/#/productlist">Voltar para produtos</a>
      </div>
      <div class="form-container">
        <form id="edit-product-form">
          <ul class="form-items">
            <li>
              <h1>Editar Produto ${product._id.substring(0, 8)}</h1>
            </li>
            <li>
              <label for="name">Nome</label>
              <input type="text" name="name" value="${product.name
      }" id="name" />
            </li>
            <li>
              <label for="price">Preço</label>
              <input type="number" name="price" value="${product.price
      }" id="price" />
            </li>
            <li>
              <label for="image">Imagem</label>
              <input type="text" name="image" value="${product.image
      }" id="image" />
            </li>
            <li>
              <label for="brand">Marca</label>
              <input type="text" name="brand" value="${product.brand
      }" id="brand" />
            </li>
            <li>
              <label for="countInStock">Total no estoque</label>
              <input type="text" name="countInStock" value="${product.countInStock
      }" id="countInStock" />
            </li>
            <li>
              <label for="category">Categoria</label>
              <input type="text" name="category" value="${product.category
      }" id="category" />
            </li>
            <li>
              <label for="description">Descrição</label>
              <input type="text" name="description" value="${product.description
      }" id="description" />
            </li>
            <li>
              <button type="submit" class="primary">Atualizar</button>
            </li>
          </ul>
        </form>
      </div>
    </div>
    `;
  },
};
export default ProductEditScreen;