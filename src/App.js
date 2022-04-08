import './App.css';
import Adduser from './components/adduser/Adduser';
import Header from './components/header/Header';


function App() {
  return (
    <div className="App">
      <Header/>
      <div className="crud">
      <Adduser/>
      </div>
     
      
    </div>
  );
}

export default App;
