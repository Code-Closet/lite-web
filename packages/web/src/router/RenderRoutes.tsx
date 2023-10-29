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
            if (route.children?.length ?? 0 > 0) {
              return (
                <Route key={index} path={route.path} element={route.element}>
                  {route.children?.map((child, index) => {
                    return (
                      <Route
                        key={index}
                        path={child.path}
                        element={child.element}
                      />
                    );
                  })}
                </Route>
              );
            }
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
