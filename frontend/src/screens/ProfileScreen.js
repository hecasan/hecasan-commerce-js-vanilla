
import { update } from '../../api';
import { setUserInfo, getUserInfo, clearUser } from '../localStorage';
import { hideLoading, showLoading, showMessage } from '../utils';

const ProfileScreen = {
  after_render: () => {
    document.getElementById('signout-button').addEventListener('click', () => {
      clearUser();
      document.location.hash = '/';
    });
    document
      .getElementById('profile-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault();
        showLoading();
        const data = await update({
          name: document.getElementById('name').value,
          email: document.getElementById('email').value,
          password: document.getElementById('password').value,
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
    const { name, email } = getUserInfo();
    if (!name) {
      document.location.hash = '/';
    }
    return `
    <div class="form-container">
      <form id="profile-form">
        <ul class="form-items">
          <li>
            <h1>Sua Conta</h1>
          </li>
          <li>
            <label for="name">Nome</label>
            <input type="name" name="name" id="name" value="${name}" />
          </li>
          <li>
            <label for="email">E-mail</label>
            <input type="email" name="email" id="email" value="${email}" />
          </li>
          <li>
            <label for="password">Senha</label>
            <input type="password" name="password" id="password" />
          </li>
          <li>
            <button type="submit" class="primary">Atualizar dados</button>
          </li>
          <li>
          <button type="button" id="signout-button" >Sair</button>
        </li>
        
        </ul>
      </form>
    </div>
    `;
  },
};
export default ProfileScreen;