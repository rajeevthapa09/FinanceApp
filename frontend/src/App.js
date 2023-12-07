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
  const [state, setState] = useState({ token: null, user: "", role: true });

  useEffect(() => {
    const getToken = () => {
      try {
        const token = localStorage.getToken("token");
        if(token){
          const usr = localStorage.getToken("userEmail");
        }
        try {
         
      } catch (error) {
        
      }
    };

    getToken();
  }, []);
}

  return (
    <div>
      <GlobalContext.Provider value={{ state, setState }}>
        {state.token ? <Logout /> : ""}
        {state.user ? state.role ? <RouterProvider router={myrouter} /> : <RouterProvider router={advisorRouter} /> : <RouterProvider router={loginRouter} />}
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
