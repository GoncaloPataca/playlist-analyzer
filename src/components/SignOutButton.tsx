import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN_KEY, CODE_VERIFIER_KEY } from "../constants/storageKeys";

export const SignOutButton = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(CODE_VERIFIER_KEY);
    navigate("/");
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
};
