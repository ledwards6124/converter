import React, { useState } from 'react';
import './css/Converter.css';

function Converter(props) {

    const charToDecimal = {
        'A': 10,
        'B': 11,
        'C': 12,
        'D': 13,
        'E': 14,
        'F': 15
    };
    
    const decimalToChar = {
        10: 'A',
        11: 'B',
        12: 'C',
        13: 'D',
        14: 'E',
        15: 'F'
    };


    const [binaryInput, setBinaryInput] = useState('');
    const [decimalInput, setDecimalInput] = useState('');
    const [hexInput, setHexInput] = useState('');

    const [binaryOutput, setBinaryOutput] = useState('');
    const [decimalOutput, setDecimalOutput] = useState('');
    const [hexOutput, setHexOutput] = useState('');


const handleBinaryChange = (event) => {
        const binaryValue = String(event.target.value);

        if (binaryValue.match(/[^01]/)) {
            return;    
        }

        setDecimalInput('');
        setHexInput('');
        setBinaryInput(binaryValue);
        const decimalValue = convertBinaryToDecimal(binaryValue);
        const hexValue = convertBinaryToHex(binaryValue);

        setDecimalOutput(decimalValue);
        setBinaryOutput(binaryValue);
        setHexOutput(hexValue);
    }

    const handleDecimalChange = (event) => {
        const decimalValue = event.target.value;
      
        if (decimalValue.match(/[^0-9]/)) {
          return;
        }
        setBinaryInput('');
        setHexInput('');
        setDecimalInput(decimalValue);
      
        if (decimalValue === '') {
          setHexOutput('');
          setDecimalOutput('');
          setBinaryOutput('');
        } else {
          const binaryValue = convertDecimalToBinary(decimalValue);
          const hexValue = convertDecimalToHex(decimalValue);
      
          setDecimalOutput(decimalValue);
          setBinaryOutput(binaryValue);
          setHexOutput(hexValue);
        }
      }

    const handleHexChange = (event) => {
        const hexValue = event.target.value;

        
        if (hexValue.match(/^[^0-9A-F]{1,}$/)) {
            return;    
        }



        const newHex = hexValue.toUpperCase();
        setHexInput(newHex);


        setBinaryInput('');
        setDecimalInput('');
        setHexInput(newHex);

        const binaryValue = convertHexToBinary(newHex);
        const decimalValue = convertHexToDecimal(newHex);

        setDecimalOutput(decimalValue);
        setBinaryOutput(binaryValue);
        setHexOutput(newHex);
    }

    const updateHistory = () => {
        const savedInput = binaryInput || decimalInput || hexInput;
        if (!savedInput) {
            return;
        }
        const entry = {
            input: savedInput,
            date: new Date().toLocaleDateString(Intl.DateTimeFormat().resolvedOptions().locale),
            time: new Date().toLocaleTimeString(Intl.DateTimeFormat().resolvedOptions().locale),
            output: {
                binary: binaryOutput,
                decimal: decimalOutput,
                hex: hexOutput
            }
        }
        saveToBrowser(entry);
        props.onSave(entry);

    }

    const saveToBrowser = (entry) => {
        const savedEntries = localStorage.getItem('history');
        if (savedEntries) {
            const parsedEntries = JSON.parse(savedEntries);
            for (let e of parsedEntries) {
                if (e.input === entry.input) {
                    return;
                }
            }
            parsedEntries.push(entry);
            localStorage.setItem('history', JSON.stringify(parsedEntries));
        } else {
            localStorage.setItem('history', JSON.stringify([entry]));
        }
    };

    const clearInputs = () => {
        setBinaryInput('');
        setDecimalInput('');
        setHexInput('');
        setBinaryOutput('');
        setDecimalOutput('');
        setHexOutput('');
    }

    return (
        <>
            <div className='input-div'>
                <div className='binary-input-output'>
                    <label className='input-label'>
                        <p>Binary Input</p>
                        <input placeholder='Binary Input' className='input-box' type="text" value={binaryInput} onChange={handleBinaryChange} />
                    </label>
                    <p className='output-label'>Binary Output</p>
                    <p className='output'>
                        {binaryOutput ? binaryOutput.match(/.{1,4}/g).join(' ') : 'Enter a number to convert...'}
                    </p>
                </div>
                <div className='decimal-input-output'>
                    <label className='input-label'>
                        <p>Decimal Input</p>
                        <input placeholder='Decimal Input' className='input-box' type="text" value={decimalInput} onChange={handleDecimalChange} />
                    </label>
                    <p className='output-label'>Decimal Output</p>
                    <p className='output'>{decimalOutput || 'Enter a number to convert...'}</p>
                </div>
                <div className='hex-input-output'>
                    <label className='input-label'>
                        <p>Hex Input</p>
                        <input placeholder='Hex Input' className='input-box' type="text" value={hexInput} onChange={handleHexChange} />
                    </label>
                    <p className='output-label'>Hex Output</p>
                    <p className='output'>{hexOutput || 'Enter a number to convert...'}</p>
                </div>
            </div>
            <div className='clear-inputs'>
                <input className='clear-button' type='button' value='Clear Inputs' onClick={clearInputs} />
            </div>
            <div className='save-div'>
                <input className='save-button' type="button" value="Save Conversion" onClick={updateHistory} />
            </div>
        </>
    );
}

export const convertBinaryToDecimal = (binary) => {
    const binaryString = String(binary);
    let decimal = 0;
    for (let i = 0; i < binaryString.length; i++) {
        const bit = binaryString[i];
        decimal += bit * Math.pow(2, binaryString.length - 1 - i);
    }
    return decimal;
}

export const convertBinaryToHex = (binary) => {
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

export const convertDecimalToBinary = (decimal) => {
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

export const convertDecimalToHex = (decimal) => {

    const charToDecimal = {
        'A': 10,
        'B': 11,
        'C': 12,
        'D': 13,
        'E': 14,
        'F': 15
    };


    const decimalToChar = {
        10: 'A',
        11: 'B',
        12: 'C',
        13: 'D',
        14: 'E',
        15: 'F'
    };

    
    decimal = Number(decimal);
    if (decimal < 16) {
        if (decimal > 9) {
            return decimalToChar[decimal];
        } else {
            return String(decimal);
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

export const convertHexToBinary = (hex) => {
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

export const convertHexToDecimal = (hex) => {

    const charToDecimal = {
        'A': 10,
        'B': 11,
        'C': 12,
        'D': 13,
        'E': 14,
        'F': 15
    };
    
    let decimal = 0;
    const hexString = String(hex);
    for (let i = 0; i < hexString.length; i++) {
        let digit = hexString[i];
        if (digit >= 'A' && digit <= 'F') {
            digit = charToDecimal[digit];
        }
        decimal += Number(digit) * Math.pow(16, hexString.length - i - 1);
    }
    return decimal;
}

export default Converter;


