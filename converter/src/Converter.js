import React, { useState } from 'react';
import './css/Converter.css';
import CopyButton from './CopyButton';

function Converter(props) {
    const [binaryInput, setBinaryInput] = useState('');
    const [decimalInput, setDecimalInput] = useState('');
    const [hexInput, setHexInput] = useState('');
    const [octalInput, setOctalInput] = useState('');

    const [binaryOutput, setBinaryOutput] = useState('');
    const [decimalOutput, setDecimalOutput] = useState('');
    const [hexOutput, setHexOutput] = useState('');
    const [octalOutput, setOctalOutput] = useState('');



    const handleOctalChange = (event) => {
        const octalValue = String(event.target.value);

        if (octalValue.match(/[^0-7]/)) {
            return;    
        }

        setDecimalInput('');
        setBinaryInput('');
        setHexInput('');
        setOctalInput(octalValue);

        const decimalValue = convertOctalToDecimal(octalValue);
        const binaryValue = convertOctalToBinary(octalValue);
        const hexValue = convertOctalToHex(octalValue);

        setDecimalOutput(decimalValue);
        setBinaryOutput(binaryValue);
        setHexOutput(hexValue);
        setOctalOutput(octalValue);

    }

    const handleBinaryChange = (event) => {
            const binaryValue = String(event.target.value);

            if (binaryValue.match(/[^01]/)) {
                return;    
            }

            setDecimalInput('');
            setHexInput('');
            setOctalInput('');
            setBinaryInput(binaryValue);
            const decimalValue = convertBinaryToDecimal(binaryValue);
            const hexValue = convertBinaryToHex(binaryValue);
            const octalValue = convertBinaryToOctal(binaryValue);

            setDecimalOutput(decimalValue);
            setBinaryOutput(binaryValue);
            setHexOutput(hexValue);
            setOctalOutput(octalValue);
        }

    const handleDecimalChange = (event) => {
        const decimalValue = event.target.value;
      
        if (decimalValue.match(/[^0-9]/)) {
          return;
        }
        setBinaryInput('');
        setHexInput('');
        setOctalInput('');
        setDecimalInput(decimalValue);
      
        if (decimalValue === '') {
          setHexOutput('');
          setDecimalOutput('');
          setBinaryOutput('');
          setOctalInput('');
        } else {
          const binaryValue = convertDecimalToBinary(decimalValue);
          const hexValue = convertDecimalToHex(decimalValue);
          const octalValue = convertDecimalToOctal(decimalValue);

          setDecimalOutput(decimalValue);
          setBinaryOutput(binaryValue);
          setHexOutput(hexValue);
          setOctalOutput(octalValue);
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
        setOctalInput('');
        setHexInput(newHex);

        const binaryValue = convertHexToBinary(newHex);
        const decimalValue = convertHexToDecimal(newHex);
        const octalValue = convertHexToOctal(newHex);

        setOctalOutput(octalValue);
        setDecimalOutput(decimalValue);
        setBinaryOutput(binaryValue);
        setHexOutput(newHex);
    }

    const updateHistory = () => {
        const savedInput = binaryInput || decimalInput || hexInput || octalInput;
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
                hex: hexOutput,
                octal: octalInput
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
                    <CopyButton dataType='Binary' toCopy={binaryOutput}/>
                </div>
                <div className='decimal-input-output'>
                    <label className='input-label'>
                        <p>Decimal Input</p>
                        <input placeholder='Decimal Input' className='input-box' type="text" value={decimalInput} onChange={handleDecimalChange} />
                    </label>
                    <p className='output-label'>Decimal Output</p>
                    <p className='output'>{decimalOutput || 'Enter a number to convert...'}</p>
                    <CopyButton dataType='Decimal' toCopy={decimalOutput}/>
                </div>
                <div className='hex-input-output'>
                    <label className='input-label'>
                        <p>Hex Input</p>
                        <input placeholder='Hex Input' className='input-box' type="text" value={hexInput} onChange={handleHexChange} />
                    </label>
                    <p className='output-label'>Hex Output</p>
                    <p className='output'>{hexOutput || 'Enter a number to convert...'}</p>
                    <CopyButton dataType='Hex' toCopy={hexOutput}/>

                </div>
                <div className='octal-input-output'>
                    <label className='input-label'>
                        <p>Octal Input</p>
                        <input placeholder='Octal Input' className='input-box' type="text" value={octalInput} onChange={handleOctalChange} />
                    </label>
                    <p className='output-label'>Octal Output</p>
                    <p className='output'>{octalOutput || 'Enter a number to convert...'}</p>
                    <CopyButton dataType='Octal' toCopy={octalOutput}/>

                </div>
            </div>
            <div className='clear-inputs'>
                <input className='clear-button' type='button' value='Clear Inputs' onClick={clearInputs} />
            </div>
            <div className='save-inputs'>
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

export const convertOctalToDecimal = (octal) => {
    let decimal = 0;
    const octalString = String(octal);
    for (let i = 0; i < octalString.length; i++) {
        const digit = octalString[i];
        decimal += Number(digit) * Math.pow(8, octalString.length - i - 1);
    }
    return decimal;
}

export const convertOctalToBinary = (octal) => {
    let binary = '';
    const values = {
        0: '000',
        1: '001',
        2: '010',
        3: '011',
        4: '100',
        5: '101',
        6: '110',
        7: '111',
    }
    const octalString = String(octal);
    for (let i = 0; i < octalString.length; i++) {
        const digit = octalString[i];
        binary += values[digit];
    }
    return binary;
}

export const convertOctalToHex = (octal) => {
    return convertDecimalToHex(convertOctalToDecimal(octal))
}

export const convertBinaryToOctal = (binary) => {
    return convertDecimalToOctal(convertBinaryToDecimal(binary))
}

export const convertHexToOctal = (hex) => {
    return convertBinaryToOctal(convertHexToBinary(hex));
}

export const convertDecimalToOctal = (decimal) => {
    let octal = '';
    let decNum = Number(decimal);
    while (decNum > 0) {
        const remainder = decNum % 8;
        decNum = Math.floor(decNum / 8);
        octal = remainder.toString() + octal;
    }
    return octal;
}

export default Converter;


