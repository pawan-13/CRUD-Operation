import 'bootstrap/dist/css/bootstrap.min.css';
import AllUser from './components/allUser';
import CreateUser from './components/createUser';
import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';
import EditUser from './components/editUser';
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<CreateUser />} />
        <Route path='/alluser' element={<AllUser />} />
        <Route path='/edituser/:id' element={<EditUser />} />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App