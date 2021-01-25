import { signin } from '../../api';
import { setUserInfo, getUserInfo } from '../localStorage';
import { showLoading, hideLoading, showMessage, redirectUser } from '../utils';

const SigninScreen = {
  after_render: () => {
    document
      .getElementById('signin-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault();
        showLoading();
        const data = await signin({
          email: document.getElementById('email').value,
          password: document.getElementById('password').value,
        });
        hideLoading();
        if (data.error) {
          showMessage(data.error);
        } else {
          setUserInfo(data);
          redirectUser();
        }
      });
  },
  render: () => {
    if (getUserInfo().name) {
      redirectUser();
    }
    return `
    <div class="form-container">
      <form id="signin-form">
        <ul class="form-items">
          <li>
            <h1>Fazer Login <i class="fa fa-user"></i></h1>
          </li>
          <li>
            <label for="email"><i class="fa fa-envelope"></i> Informe seu e-mail </label>
            <input type="email" name="email" id="email" />
          </li>
          <li>
            <label for="password"><i class="fa fa-lock"></i> Digite sua senha</label>
            <input type="password" name="password" id="password" />
          </li>
          <li>
            <button type="submit" class="primary">Entrar</button>
          </li>
          <li>
            <div>
              <p class="novoPorAqui">Novo por aqui?</p>
              <p class="crieUmaConta"><a href="/#/register">Crie uma conta para efetuar compras </a></p>
            </div>
          </li>
        </ul>
      </form>
    </div>
    `;
  },
};
export default SigninScreen;