import React from "react";
import './css/SaveButton.css';

function SaveButton(props) {

    const method = props.method;

    const save = () => {
        const date = new Date().toLocaleDateString(Intl.DateTimeFormat().resolvedOptions().locale);
        if (props.method === 'JSON') {
            const link = document.createElement('a');
            link.href = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(localStorage.getItem('history')));
            link.download = 'conversion_history_' + date + '.json';
            link.click();
        } else if (props.method === 'CSV') {
            const link = document.createElement('a');
            link.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(localStorage.getItem('history'));
            link.download = 'conversion_history_' + date + '.csv';  
            link.click();
        }
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