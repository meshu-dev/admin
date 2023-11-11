import { Routes, Route } from 'react-router-dom'
import {
  TypeList,
  TypeShow,
  TypeCreate,
  TypeEdit
} from './../pages/types'

const TypeRoutes = () => (
  <Routes>
    <Route path="/">
      <Route index element={<TypeList />} />
      <Route path="create" element={<TypeCreate />} />
      <Route path="edit/:id" element={<TypeEdit />} />
      <Route path="show/:id" element={<TypeShow />} />
    </Route>
  </Routes>
)

export default TypeRoutes