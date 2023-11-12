import { Routes, Route } from 'react-router-dom'
import {
  AboutList,
  AboutShow,
  AboutEdit
} from './../pages/about'

const AboutRoutes = () => (
  <Routes>
    <Route path="/">
      <Route index element={<AboutList />} />
      <Route path="show/:id" element={<AboutShow />} />
      <Route path="edit" element={<AboutEdit />} />
    </Route>
  </Routes>
)

export default AboutRoutes
