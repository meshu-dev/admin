import { Routes, Route } from "react-router-dom";
import {
  RepositoryList,
  RepositoryShow,
  RepositoryCreate,
  RepositoryEdit,
} from "./../pages/repositories";

const RepositoryRoutes = () => (
  <Routes>
    <Route path="/">
      <Route index element={<RepositoryList />} />
      <Route path="create" element={<RepositoryCreate />} />
      <Route path="edit/:id" element={<RepositoryEdit />} />
      <Route path="show/:id" element={<RepositoryShow />} />
    </Route>
  </Routes>
);

export default RepositoryRoutes;
