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
  const [state, setState] = useState({ token: null, user: "", role: true, userId:"", userName:"" });

  const getToken = () => {
    try {
      const token = localStorage.getItem("token");
      if(token){
        const user = localStorage.getItem("userEmail");
        const userId = localStorage.getItem("userId");
        const userName = localStorage.getItem("userName");
        console.log("user", user, "token", token, "role", state.role);
        setState({...state, token, user, userId, userName})
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
        {console.log("state user is: ", state.user, "token is: ", state.token)}
        {state.user ? (state.role ? <RouterProvider router={myrouter} /> : <RouterProvider router={advisorRouter} />) : <RouterProvider router={loginRouter} />}
        
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
