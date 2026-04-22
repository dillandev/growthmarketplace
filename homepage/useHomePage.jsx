import { useNavigate } from "react-router-dom";

export function useHomePage() {
  const navigate = useNavigate();

  const goToLogin = () => navigate("/login");
  const goToSharerSignup = () => navigate("/signup/sharer");
  const goToProviderSignup = () => navigate("/signup/provider");

  return {
    goToLogin,
    goToSharerSignup,
    goToProviderSignup,
  };
}