import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import loginRouter from './components/SigninLayout';


function App() {
  return (
    <div>
      <RouterProvider router={loginRouter}/>
    </div>
  );
}

export default App;
