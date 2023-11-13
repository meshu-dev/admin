import { Routes, Route } from 'react-router-dom'
import {
  ImageList,
  ImageShow,
  ImageCreate,
  ImageEdit
} from './../pages/images'

const ImageRoutes = () => (
  <Routes>
    <Route path="/">
      <Route index element={<ImageList />} />
      <Route path="create" element={<ImageCreate />} />
      <Route path="edit/:id" element={<ImageEdit />} />
      <Route path="show/:id" element={<ImageShow />} />
    </Route>
  </Routes>
)

export default ImageRoutes