import logo from './logo.svg';
import './App.scss';

import Navbar from './components/Navbar/Navbar';
import Authpage from './pages/AuthPage/AuthPage';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Authpage />
    </div>
  );
}

export default App
