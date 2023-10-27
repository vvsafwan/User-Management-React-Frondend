import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AddUser from './components/AddUser';
import EditUser from './components/EditUser';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/adduser' element={<AddUser/>}/>
          <Route path='/edituser/:id' element={<EditUser/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
