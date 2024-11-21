import { useNavigate, useParams } from "react-router-dom";
import "./VerifyAccount.css";
import { useContext, useEffect } from "react";
import { verifyAccount } from "../../reducers/users/users.actions";
import { UsersContext } from "../../providers/UsersProvider";

const VerifyAccount = () => {
  const { id } = useParams();
  const { state, dispatch } = useContext(UsersContext);
  const navigate = useNavigate();
  const { user } = state;

  useEffect(() => {
    if (id) {
      verifyAccount(id, dispatch, navigate);
    }
  }, [id]);

  return (
    <div className="verify_account">
      {user?.verified ? (
        <h2>Se ha verificado tu cuenta con éxito</h2>
      ) : (
        <h2>Verifica tu correo electrónico para activar tu cuenta</h2>
      )}
    </div>
  );
};

export default VerifyAccount;
