import "./AdminDashboard.css";
import CreateIngredient from "../../components/CreateIngredient/CreateIngredient";
import CreateRecipe from "../../components/CreateRecipe/CreateRecipe";
import ToggleInfo from "../../components/ToggleInfo/ToggleInfo";

const AdminDashboard = () => {

  return (
    <section className="admin-dashboard">
      <div>
        <h1>Panel de Administración</h1>
        <p>Gestiona ingredientes, recetas y más</p>
        <ToggleInfo
          C1={{ reference: "Ingredientes", Component: <CreateIngredient /> }}
          C2={{ reference: "Recetas", Component: <CreateRecipe /> }}
        />
      </div>
    </section>
  );
};

export default AdminDashboard;
