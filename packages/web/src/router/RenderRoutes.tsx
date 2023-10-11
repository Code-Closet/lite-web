import { Navigate, Route, Routes } from "react-router-dom";
import { AuthData } from "../auth/AuthGuard";
import PageOutlet from "./PageOutlet";
import navigation from "./Routes";

export const RenderRoutes = () => {
  const { user } = AuthData();

  return (
    <Routes>
      <Route path="/" element={<PageOutlet />}>
        {navigation.map((route, index) => {
          if (!route.isPrivate || (route.isPrivate && user.isAuthenticated)) {
            return (
              <Route key={index} path={route.path} element={route.element} />
            );
          }
        })}
        <Route path="*" element={<Navigate to={"/"} replace />} />
      </Route>
    </Routes>
  );
};
