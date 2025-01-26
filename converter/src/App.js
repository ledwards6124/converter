import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function App() {

  const charToDecimal = {
    'A': 10,
    'B': 11,
    'C': 12,
    'D': 13,
    'E': 14,
    'F': 15
  }

  const decimalToChar = {
    10: 'A',
    11: 'B',
    12: 'C',
    13: 'D',
    14: 'E',
    15: 'F'
  }

  const [binaryInput, setBinaryInput] = useState('');
  const [decimalInput, setDecimalInput] = useState('');
  const [hexInput, setHexInput] = useState('');

  const [binaryOutput, setBinaryOutput] = useState('');
  const [decimalOutput, setDecimalOutput] = useState('');
  const [hexOutput, setHexOutput] = useState('');

  const handleBinaryChange = (event) => {
    const allowed = ['0', '1'];
    const binaryValue = String(event.target.value);
    if (!binaryValue.split('').every((char => allowed.includes(char)))) {
      return;
    }
    setBinaryInput(binaryValue);
    const decimalValue = binaryToDecimal(binaryValue);
    const hexValue = binaryToHex(binaryValue);


    //set outputs to new conversions
    setDecimalOutput(decimalValue);
    setBinaryOutput(binaryValue);
    setHexOutput(hexValue);
  }

  const handleDecimalChange = (event) => {
    const decimalValue = event.target.value;

    setDecimalInput(decimalValue);

    const binaryValue = decimalToBinary(decimalValue);
    const hexValue = decimalToHex(decimalValue);

    setDecimalOutput(decimalValue);
    setBinaryOutput(binaryValue);
    setHexOutput(hexValue);
  }

  const handleHexChange = (event) => {
    const hexValue = event.target.value;

    setHexInput(hexValue);

    const binaryValue = hexToBinary(hexValue);
    const decimalValue = hexToDecimal(hexValue);

    setDecimalOutput(decimalValue);
    setBinaryOutput(binaryValue);
    setHexOutput(hexValue);
  }

  const binaryToDecimal = (binary) => {
    const binaryString = String(binary);
    let decimal = 0;
    for (let i = 0; i < binaryString.length; i ++) {
      const bit = binaryString[i];
      decimal += bit * Math.pow(2, binaryString.length - 1 - i);
    }
    return decimal;
  }

  const binaryToHex = (binary) => {
    const hexValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    let hex = '';

    while (binary.length % 4 !== 0) {
      binary = '0' + binary;
    }
  
    for (let i = 0; i < binary.length; i += 4) {
      const chunk = binary.substr(i, 4);
      const value = parseInt(chunk, 2);
      const hexDigit = hexValues[value];
      hex += hexDigit;
    }
  
    return hex;
  }

  const decimalToBinary = (decimal) => {
    let binary = '';
    
    let decInt = Number(decimal);
    let remainder = 0;
    while (decInt > 0) {
      remainder = decInt % 2;
      decInt = Math.floor(decInt / 2);
      binary = remainder.toString() + binary;
    }
    return binary;
  }

  const decimalToHex = (decimal) => {
    decimal = Number(decimal);
    if (decimal <= 16) {
      if (decimal > 9) {
        return decimalToChar[decimal];
      } else {
        return decimal;
      }
    }

    let hex = '';
    let tempDecimal = decimal;
    while (tempDecimal > 0) {
      const remainder = tempDecimal % 16;
      const quotient = Math.floor(tempDecimal / 16);
      tempDecimal = quotient;
      if (remainder > 9) {
        hex = decimalToChar[remainder] + hex;
      } else {
        hex = String(remainder) + hex;
      }
    }
    return hex;
  }

  const hexToBinary = (hex) => {
    const hexValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    let binary = '';
    const hexString = String(hex);
    for (let i = 0; i < hexString.length; i++) {
      const hexDigit = hexString[i];
      const binaryChunk = hexValues.indexOf(hexDigit).toString(2).padStart(4, '0');
      binary += binaryChunk;
    }
    return binary;
  }

  const hexToDecimal = (hex) => {
    let decimal = 0;
  }

  return (
    <>
    <div className='inputs'>
      <p>Binary Input</p>
      <input type="text" value={binaryInput} onChange={handleBinaryChange} />
      <p>Decimal Input</p>
      <input type="text" value={decimalInput} onChange={handleDecimalChange} />
      <p>Hex Input</p>
      <input type="text" value={hexInput} onChange={handleHexChange} />
    </div>
    <div className='outputs'>
      <p>Binary Output</p>
      <p>{binaryOutput}</p>
      <p>Decimal Output</p>
      <p>{decimalOutput}</p>
      <p>Hex Output</p>
      <p>{hexOutput}</p>
    </div>
    </>
  );
}

export default App;
