import { Routes, Route } from 'react-router-dom'
import {
  TechnologyList,
  TechnologyShow,
  TechnologyCreate,
  TechnologyEdit
} from './../pages/technologies'

const TechnologyRoutes = () => (
  <Routes>
    <Route path="/">
      <Route index element={<TechnologyList />} />
      <Route path="create" element={<TechnologyCreate />} />
      <Route path="edit/:id" element={<TechnologyEdit />} />
      <Route path="show/:id" element={<TechnologyShow />} />
    </Route>
  </Routes>
)

export default TechnologyRoutes
