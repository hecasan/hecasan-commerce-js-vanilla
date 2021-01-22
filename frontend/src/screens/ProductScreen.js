import { getProduct } from '../../api';
import RatingComponent from '../components/Rating';
import { parseRequestUrl } from "../utils";

const ProductScreen = {
  after_render: () => {
    const request = parseRequestUrl()
    document.getElementById('add-button').addEventListener('click', () => {
      document.location.hash = `/cart/${request.id}`;
    })

  },
  render: async () => {
    const request = parseRequestUrl();
    const product = await getProduct(request.id);
    if (product.error) {
      return `<div>${product.error}</div>`;
    }
    return `
    <div class="content">
      <div class="back-to-result">
        <a href="/#/">Voltar para produtos </a>
      </div>
      <div class="details">
        <div class="details-image">
          <img src="${product.image}" alt="${product.name}" />
        </div>
        <div class="details-info">
          <ul>
            <li>
              <h1>${product.name}</h1>
            </li>
            <li>
            ${RatingComponent.render({
      value: product.rating,
      text: `${product.numReviews} visualizações`,
    })}
            </li>
            <li>
              Preço: <strong>R$ ${product.price}</strong>
            </li>
            <li>
              Descrição:
              <div>
              <p class="shortDescription">${product.shortDescription}</p>
                
              </div>
            </li>
          </ul>
        </div>
        <div class="details-action">
            <ul>
              <li>
                Preço: R$ ${product.price}
              </li>
              <li>
                Estoque: 
                  ${product.countInStock > 0
        ? `<span class="success">Produto em estoque - Qtde: ${product.countInStock}</span>`
        : `<span class="error">Produto indisponivel</span>`
      }
              </li>
              <li>
                  <button id="add-button" class="fw primary">Add to Cart </div>
            </ul>
        </div>
      </div>
    </div>`;
  },
};
export default ProductScreen;