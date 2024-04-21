import {BrowserRouter,Route,Routes} from "react-router-dom"
import './App.css';
import Login from "./components/login/index"
import Register from "./components/register";
import Home from "./components/home";
import Completed from "./components/Completed";
import Pending from "./components/Pending";

const App=() => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/completedTasks" element={<Completed/>}/>
        <Route exact path="/pendingTasks" element={<Pending/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
