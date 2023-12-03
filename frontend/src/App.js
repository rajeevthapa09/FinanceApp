import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import { RouterProvider } from 'react-router-dom';
import myrouter from './components/Layout';


function App() {
  return (
    <div>
      <RouterProvider router={myrouter}/>
    </div>
  );
}

export default App;
