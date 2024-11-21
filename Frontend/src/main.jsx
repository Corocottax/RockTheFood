import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import IngredientsProvider from "./providers/IngredientsProvider.jsx";
import RecipesProvider from "./providers/RecipesProvider.jsx";
import UsersProvider from "./providers/UsersProvider.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UsersProvider>
      <IngredientsProvider>
        <RecipesProvider>
          <App />
        </RecipesProvider>
      </IngredientsProvider>
    </UsersProvider>
  </BrowserRouter>
);
