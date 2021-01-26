import DashboardMenu from "../components/DashboardMenu";

const DashboardScreen = {
  after_render: () => { },
  render: () => {
    return `
    <div class="dashboard">
      ${DashboardMenu.render({ selected: 'dashboard' })}
      <div class="dashboard-content">
        <h1>Painel de Controle</h1>
        <div>
          Informações sobre seus produtos
        </div>
      </div>
    </div>
    `;
  },
};
export default DashboardScreen;