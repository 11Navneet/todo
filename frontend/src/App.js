import './App.css';
import Todo from './pages/todo/Todo';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Navigate } from 'react-router-dom';
import { useAuthContext } from './context/AuthContext';
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';

function App() {
  const {authUser} = useAuthContext();
  console.log("app.jsx",authUser);

  const routes = (
    <Router>
      <Routes>
        <Route path="/"  element={authUser ? <Todo /> : <Navigate to={"/login"} />} />
        <Route path="/login"  element={authUser ? <Navigate to='/' /> : <Login />} />
        <Route path="/signup"  element={authUser ? <Navigate to='/' /> : <Signup />} />
      </Routes>
    </Router>
  );
  return (
    <div>
      {routes}
    </div>
  );
}

export default App;
