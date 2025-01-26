import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import Converter from './Converter';
import History from './History';

function App() {

  const [history, setHistory] = useState([]);
  
  const addToHistory = (entry) => {
    setHistory([...history, entry]);
  }


  return (
    <>
      <h1 className='title'>Hex, Binary, and Decimal Converter</h1>
      <Converter onSave={addToHistory} />
      <History history={history} />
    </>
  );
}

export default App;
