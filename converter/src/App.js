import logo from './logo.svg';
import './css/App.css';
import {useState} from 'react';
import Converter from './Converter';
import History from './History';

function App() {

  const [history, setHistory] = useState([]);
  
  const addToHistory = (entry) => {
    setHistory([...history, entry]);
  }


  return (
    <div className='wrapper'>
      <h1 className='title'>Hex, Decimal, and Binary Converter</h1>
      <Converter onSave={addToHistory} />
      <History history={history} />
    </div>
  );
}

export default App;
