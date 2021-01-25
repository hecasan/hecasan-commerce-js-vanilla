import { register } from '../../api';
import { setUserInfo, getUserInfo } from '../localStorage';
import { hideLoading, showLoading, showMessage } from '../utils';

const registerScreen = {
  after_render: () => {
    document
      .getElementById('register-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault();
        showLoading();
        const data = await register({
          name: document.getElementById('name').value,
          email: document.getElementById('email').value,
          password: document.getElementById('password').value,
          repassword: document.getElementById('repassword').value,
        });
        hideLoading();
        if (data.error) {
          showMessage(data.error);
        } else {
          setUserInfo(data);
          document.location.hash = '/';
        }
      });
  },
  render: () => {
    if (getUserInfo().name) {
      document.location.hash = '/';
    }
    return `
    <div class="form-container">
      <form id="register-form">
        <ul class="form-items">
          <li>
            <h1>Criar uma Conta <i class="fa fa-user"></i></h1>
          </li>
          <li>
            <label for="name"><i class="fa fa-user"></i> Informe seu nome </label>
            <input type="name" name="name" id="name" />
          </li>
          <li>
            <label for="email"><i class="fa fa-envelope"></i> Informe seu e-mail </label>
            <input type="email" name="email" id="email" />
          </li>
          <li>
            <label for="password"><i class="fa fa-lock"></i> Crie uma senha</label>
            <input type="password" name="password" id="password" />
          </li>
          <li>
            <label for="repassword"><i class="fa fa-lock"></i> Digite novamente a senha</label>
            <input type="password" name="repassword" id="repassword" />
          </li>
          <li>
            <button type="submit" class="primary">Criar conta</button>
          </li>
          <li>
            <div>
              <p class="novoPorAqui">Já tem uma conta?</p>
              <p class="crieUmaConta"><a href="/#/signin">Clique aqui e faça login </a></p>
            </div>
          </li>
        </ul>
      </form>
    </div>
    `;
  },
};
export default registerScreen;