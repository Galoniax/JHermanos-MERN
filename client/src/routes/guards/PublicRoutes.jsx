import { useAuth } from "@/hooks/useAuth";
import { Outlet, useNavigate } from "react-router-dom";
import { ROUTES } from "../paths";
import { useEffect } from "react";

export default function PublicRoutes() {
  const { isAuthenticated } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.HOME, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return !isAuthenticated ? <Outlet /> : null;
}
