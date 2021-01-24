const SigninScreen = {
  after_render: () => { },
  render: () => {
    return `
    <div class="form-container">
      <form id="signin-form">
        <ul class="form-items">
          <li>
            <h1>Sign-In</h1>
          </li>
          <li>
            <label for="email">E-mail</label>
            <input type="email" name="email" id="email" />
          </li>
          <li>
            <label for="password">Senha</label>
            <input type="password" name="password" id="password" />
          </li>
          <li>
            <button type="submit" class="primary">Entrar</button>
          </li>
          <li>
            <div>
              Novo por aqui?
              <a href="/#/register">Crie uma conta </a>
            </div>
          </li>
        </ul>
      </form>
    </div>
    `;
  },
};
export default SigninScreen;