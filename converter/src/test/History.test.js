import React from 'react';
import { render, fireEvent, getByPlaceholderText, getByText } from '@testing-library/react';
import App from '../App';
import { jest } from '@jest/globals';



describe('local storage', () => {
    it('saves correctly formatted data', () => {
       //render app
       const app = render(<App />);
       //input decimal
       const decimalInput = getByPlaceholderText(app.container, 'Decimal Input');
       fireEvent.change(decimalInput, { target: { value: '572' } });
       //click convert
       const convertButton = getByText(app.container, 'Save Conversion');
       fireEvent.click(convertButton);
       //check local storage
       const history = localStorage.getItem('history');
       const parsedHistory = JSON.parse(history);
       const entry = parsedHistory[0];
       expect(entry.input).toBe('572');
       expect(entry.date).toBeDefined();
       expect(entry.time).toBeDefined();
       expect(entry.output.binary).toBe('1000111100');
       expect(entry.output.decimal).toBe('572');
       expect(entry.output.hex).toBe('23C');
    })

    // it('can delete history', () => {
    //     //render app
    //    const app = render(<App />);
    //    //input decimal
    //    const decimalInput = getByPlaceholderText(app.container, 'Decimal Input');
    //    fireEvent.change(decimalInput, { target: { value: '572' } });
    //    //click convert
    //    const convertButton = getByText(app.container, 'Save Conversion');
    //    fireEvent.click(convertButton);

    //    const clearButton = getByText(app.container, 'Clear History');
    //    fireEvent.click(clearButton);


    //    expect(localStorage.getItem('history')).toBe('[]');

    // })


    it('saves the right date and time', () => {
        localStorage.setItem('history', '[]');
               //render app
       const app = render(<App />);
       //input decimal
       const decimalInput = getByPlaceholderText(app.container, 'Decimal Input');
       fireEvent.change(decimalInput, { target: { value: '572' } });
       //click convert
       const convertButton = getByText(app.container, 'Save Conversion');
       fireEvent.click(convertButton);
       //check local storage
       const history = localStorage.getItem('history');
       const parsedHistory = JSON.parse(history);
       const entry = parsedHistory[0];

       const nowTime = new Date().toLocaleTimeString(Intl.DateTimeFormat().resolvedOptions().locale).slice(0,5);
       const now = new Date().toLocaleDateString(Intl.DateTimeFormat().resolvedOptions().locale);
       const date = entry.date;
       const time = entry.time.slice(0,5);
       expect(time).toBe(nowTime);
       expect(date).toBe(now);
    })
})
