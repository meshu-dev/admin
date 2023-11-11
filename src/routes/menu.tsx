import { Authenticated, WelcomePage } from '@refinedev/core';
import { Outlet, Route, Routes } from 'react-router-dom';
import { ThemedLayoutV2, ErrorComponent } from '@refinedev/mantine';

import { Header } from './../components/header/index';

import ProjectRoutes from './projects'
import RepositoryRoutes from './repositories'
import TechnologyRoutes from './technologies'
import TypeRoutes from './types'

import { CatchAllNavigate, NavigateToResource } from '@refinedev/react-router-v6';

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
        <Route path="/projects/*" element={<ProjectRoutes />} />
        <Route path="/repositories/*" element={<RepositoryRoutes />} />
        <Route path="/technologies/*" element={<TechnologyRoutes />} />
        <Route path="/types/*" element={<TypeRoutes />} />
      <Route
        index
        element={<NavigateToResource resource="blog_posts" />}
      />
      <Route path="*" element={<ErrorComponent />} />
    </Route>
    <Route index element={<WelcomePage />} />
  </Routes>
)

export default MenuRoutes
