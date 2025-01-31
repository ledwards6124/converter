import React from "react";
import './css/History.css';


function SaveButton(props) {

    const method = props.method;

    const save = () => {
        const date = new Date().toLocaleDateString(Intl.DateTimeFormat().resolvedOptions().locale);
        if (props.method === 'JSON') {
            const link = document.createElement('a');
            link.href = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(JSON.parse(localStorage.getItem('history')), null, 4));
            link.download = 'conversion_history_' + date + '.json';
            link.click();
        } else if (props.method === 'CSV') {
            const link = document.createElement('a');
            link.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(jsonToCSV(JSON.parse(localStorage.getItem('history'))));
            link.download = 'conversion_history_' + date + '.csv';  
            link.click();
        }
    }

    const jsonToCSV = (json) => {
        let csv = 'input, binary_output, decimal_output, hex_output, octal_output, date, time\n';
        for (let entry of json) {
            const date = entry.date;
            const time = entry.time;
            const input = entry.input;
            const binaryOutput = entry.output.binary;
            const hexOutput = entry.output.hex;
            const decimalOutput = entry.output.decimal;
            const octalOutput = entry.output.octal;
            csv += `${input}, ${binaryOutput}, ${decimalOutput}, ${hexOutput}, ${octalOutput}, ${date}, ${time}\n`;
        }
        return csv;
        
    }

    return (
        <label className="save-history-label">
        <button  className='save-history-button' onClick={save}>
            Download {method} History
        </button>
    </label>
    );
}

export default SaveButton;