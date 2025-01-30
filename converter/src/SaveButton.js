import React from "react";
import './css/SaveButton.css';

function SaveButton(props) {

    const method = props.method;

    const save = () => {
        const date = new Date().toLocaleDateString(Intl.DateTimeFormat().resolvedOptions().locale);
        if (props.method === 'JSON') {
            const link = document.createElement('a');
            link.href = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.parse(localStorage.getItem('history')));
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
        let csv = '';
        const keys = Object.keys(json);
        const outputKeys = Object.keys(json.input);
        keys.forEach((key) => {
            csv += key + ', ';
        })
        outputKeys.forEach((key) => {
            csv += key + ', ';
        })
        csv += '\r\n';
        json.forEach((item) => {
            keys.forEach((key) => {
                csv += item[key] + ', ';
            })
            outputKeys.forEach((key) => {
                csv += item.output[key] + ', ';
            })
            csv += '\r\n';
        })
        return csv;

        
    }

    return (
        <label>
        <button  className='save-history-button' onClick={save}>
            Download {method} History
        </button>
    </label>
    );
}

export default SaveButton;