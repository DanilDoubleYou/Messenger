import './App.scss';
import {BrowserRouter} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar';
import {useRoutes} from './routes'
import {authContext} from './context/AuthContext'
import {useAuth} from './hooks/AuthHook'

function App() {
  const {login, logout, token, userId, isReady} = useAuth()
  
  const isLogin = !!token
  const routes = useRoutes(isLogin)

  return (
    <authContext.Provider value={{login, logout, token, userId, isReady, isLogin}}>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          { routes }
        </BrowserRouter>
      </div>
    </authContext.Provider>
  );
}

export default App
