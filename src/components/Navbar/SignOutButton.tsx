import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN_KEY, CODE_VERIFIER_KEY } from "@/constants/storageKeys";
import { Button } from "@/components/ui/Button/Button";

export const SignOutButton = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(CODE_VERIFIER_KEY);
    navigate(0);
  };

  return <Button onClick={handleSignOut}>Sign Out</Button>;
};
