import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import loginRouter from './components/LayoutSignin';
import myrouter from './components/LayoutRegular';
import GlobalContext from "./components/GlobalContext"
import { useState } from 'react';
import advisorRouter from './components/LayoutAdvisor';
import Logout from './components/Logout';
import { useEffect } from 'react';


function App() {
  const [state, setState] = useState({ token: null, user: "", role: true, userId:"" });

  const getToken = () => {
    try {
      const token = localStorage.getItem("token");
      if(token){
        const user = localStorage.getItem("userEmail");
        const userId = localStorage.getItem("userId");
        console.log("user", user, "token", token);
        setState({...state, token, user, userId})
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => 
    getToken()
  , []);

  return (
    <div>
      <GlobalContext.Provider value={{ state, setState }}>
        {state.token ? <Logout /> : ""}
        {state.user ? (state.role ? <RouterProvider router={myrouter} /> : <RouterProvider router={advisorRouter} />) : <RouterProvider router={loginRouter} />}
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
