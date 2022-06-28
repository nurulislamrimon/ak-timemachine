import logo from './logo.svg';
import './App.css';
import Header from './Pages/Shared/Header';
import Home from './Pages/Home/Home';
import 'material-icons/iconfont/material-icons.css';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Home></Home>
    </div>
  );
}

export default App;
