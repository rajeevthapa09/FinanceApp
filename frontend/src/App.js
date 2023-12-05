import logo from './logo.svg';
import './App.css';
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
