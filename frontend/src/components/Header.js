import { getUserInfo } from '../localStorage';

const Header = {
  render: () => {
    const { name } = getUserInfo();
    return ` 
  <div class="brand">
  <a href="/#/">hecasan +</a>
  </div>
  <div>
  ${name
        ? `<a href="/#/profile"> Olá, ${name}</a> | `
        : `<a href="/#/signin">Entrar</a> | `
      }
    
    <a href="/#/cart">Meu Carrinho</a>
  </div>`;
  },
  after_render: () => { },
};
export default Header;