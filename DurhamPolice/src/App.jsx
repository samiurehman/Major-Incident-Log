import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 

import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Home from './Components/Home';
import Profile from './Components/Profile';
import NewLog from './Components/NewLog';
import AllLogs from './Components/AllLogs';
import AddNewLog from './Components/AddNewLog';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/adminlogin' element={<Login />}></Route>
        <Route path='/dashboard' element={<Dashboard />}>
          <Route path='' element={<Home />}></Route>
          <Route path='/dashboard/newlog' element={<NewLog/>}></Route>
          <Route path='/dashboard/alllogs' element={<AllLogs/>}></Route>
          <Route path='/dashboard/profile' element={<Profile />}></Route>
          <Route path='/dashboard/add_newlog' element={<AddNewLog/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;



