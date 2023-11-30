import { Routes, Route } from "react-router-dom";
import {
  ProjectList,
  ProjectShow,
  ProjectCreate,
  ProjectEdit,
} from "./../pages/projects";

const ProjectRoutes = () => (
  <Routes>
    <Route path="/">
      <Route index element={<ProjectList />} />
      <Route path="create" element={<ProjectCreate />} />
      <Route path="edit/:id" element={<ProjectEdit />} />
      <Route path="show/:id" element={<ProjectShow />} />
    </Route>
  </Routes>
);

export default ProjectRoutes;
