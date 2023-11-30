import { Authenticated } from "@refinedev/core";
import { Outlet, Route, Routes } from "react-router-dom";
import { ThemedLayoutV2, ErrorComponent } from "@refinedev/mantine";

import { Header } from "./../components/header/index";

import AboutRoutes from "./about";
import ImageRoutes from "./images";
import ProjectRoutes from "./projects";
import RepositoryRoutes from "./repositories";
import TechnologyRoutes from "./technologies";
import TypeRoutes from "./types";

import { ForgotPassword } from "./../pages/forgotPassword";
import { Login } from "./../pages/login";
import { Register } from "./../pages/register";

import {
  CatchAllNavigate,
  NavigateToResource,
} from "@refinedev/react-router-v6";

const MenuRoutes = () => (
  <Routes>
    <Route
      element={
        <Authenticated
          key="authenticated-inner"
          fallback={<CatchAllNavigate to="/login" />}
        >
          <ThemedLayoutV2 Header={() => <Header />}>
            <Outlet />
          </ThemedLayoutV2>
        </Authenticated>
      }
    >
      <Route path="/about/*" element={<AboutRoutes />} />
      <Route path="/images/*" element={<ImageRoutes />} />
      <Route path="/projects/*" element={<ProjectRoutes />} />
      <Route path="/repositories/*" element={<RepositoryRoutes />} />
      <Route path="/technologies/*" element={<TechnologyRoutes />} />
      <Route path="/types/*" element={<TypeRoutes />} />
      <Route path="*" element={<ErrorComponent />} />
    </Route>
    <Route
      element={
        <Authenticated key="authenticated-outer" fallback={<Outlet />}>
          <NavigateToResource />
        </Authenticated>
      }
    >
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Route>
  </Routes>
);

export default MenuRoutes;
