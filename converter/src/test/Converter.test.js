import React from 'react';
import { render, fireEvent, getByPlaceholderText } from '@testing-library/react';
import Converter from '../Converter';
import { convertBinaryToDecimal, convertDecimalToBinary, convertDecimalToHex, convertHexToDecimal, convertBinaryToHex, convertHexToBinary } from '../Converter';

describe('binary to decimal converter', () => {
    it('converts binary to decimal', () => {
        const result = convertBinaryToDecimal('11010101')
        expect(result).toBe(213);
        const result2 = convertBinaryToDecimal('10101010');
        expect(result2).toBe(170);
    })
})

describe('decimal to binary converter', () =>{
    it('converts decimal to binary', () => {
        const result = convertDecimalToBinary(29384);
        expect(result).toBe('111001011001000');
        const result2 = convertDecimalToBinary(5932);
        expect(result2).toBe('1011100101100');
    })
})

describe('decimal to hex converter', () => {
    it('converts decimal to hex', () => {
        const result = convertDecimalToHex(49010);
        expect(result).toBe('BF72');
        const result2 = convertDecimalToHex(4823);
        expect(result2).toBe('12D7');
    })
})

describe('hex to decimal converter', () => {
    it('converts hex to decimal', () => {
        const result = convertHexToDecimal('FF67');
        expect(result).toBe(65383);
        const result2 = convertHexToDecimal('AAAAA90');
        expect(result2).toBe(178956944);
    })
})

describe('binary to hex converter', () => {
    it('converts binary to hex', () => {
        const result = convertBinaryToHex('1111111100101');
        expect(result).toBe('1FE5');
        const result2 = convertBinaryToHex('010101011000101');
        expect(result2).toBe('2AC5');
    })
})

describe('hex to binary converter', () => {
    it('converts hex to binary', () => {
        const result = convertHexToBinary('2CE34');
        expect(result).toBe('00101100111000110100');
        const result2 = convertHexToBinary('AAAA4');
        expect(result2).toBe('10101010101010100100');
    })
})

describe('component renders correctly', () => {
    it('renders correctly', () => {
        const { getByText} = render(<Converter/>);
        expect(getByText('Binary Input')).toBeInTheDocument();
        expect(getByText('Decimal Output')).toBeInTheDocument();
        expect(getByText('Save Conversion')).toBeInTheDocument();
    })
})

describe('component shows conversions', () => {
    it('shows conversions', () => {
        const { container, getByText } = render(<Converter/>);
        const textbox = getByPlaceholderText(container, 'Binary Input');
        fireEvent.change(textbox, {target: { value: '11010101'}});
        expect(getByText('213')).toBeInTheDocument();
    })
})