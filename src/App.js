
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {
  QueryClientProvider,
} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import Navbar from './components/Navbar'
import Items from './components/Items'
import Login from './components/Login'
import Signup from './components/Signup'
import Cart from './components/Cart'
import useToken from './useToken'
import Product from './components/Product';
import queryClient from './react-query-client';

function App() {
  const [token, setToken] = useToken()
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          <Navbar token={token} setToken={setToken} />
          <Routes>
            <Route path='/' element={<Items />} />
            <Route path='/login' element={<Login setToken={setToken} />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/cart' element={!token ? <Navigate to='/login' /> : <Cart token={token} />} />
            <Route path='/product-detail/:productId' element={<Product />} />
          </Routes>

        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>

  );
}

export default App;
