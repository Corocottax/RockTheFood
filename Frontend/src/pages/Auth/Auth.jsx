import Login from "../../components/Login/Login";
import Register from "../../components/Register/Register";
import "./Auth.css";

const Auth = () => {
  return (
    <section className="auth">
      {window.location.pathname === "/login" ? <Login /> : <Register />}
      <div>
        <img src="/icons/tenedor.png" alt="tenedor y cuchillo" />
        <h1>Descubre Deliciosas Recetas</h1>
        <p>
          Únete a nuestra comunidad de amantes de la comida. Accede a recetas
          exclusivas, guarda tus favoritas y aprende de nuestro influencer
          culinario. ¡Regístrate ahora y comienza tu aventura gastronómica!
        </p>
      </div>
    </section>
  );
};

export default Auth;
