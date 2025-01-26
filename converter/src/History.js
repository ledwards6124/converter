import React, { useState, useEffect, useRef } from "react";
import './History.css';

function History(props) {

    const [history, setHistory] = useState([]);

    const historyRef = useRef(history);

    useEffect(() => {
        const savedEntries = localStorage.getItem('history');
        if (savedEntries) {
            historyRef.current = JSON.parse(savedEntries);
            setHistory(historyRef.current);
        }
    }, [props.history]);

    const clearHistory = () => {
        localStorage.removeItem('history');
        setHistory([]);
    }

    return (
        <>
        <div className='history-container'>
            <h2 className='history-header'>History</h2>
            <div className='history-list'>
                {history.length === 0 ? <p className='no-history'>No history...</p> : history.map((entry, index) => (
                    <div key={index} className='history-entry'>
                        <p className='history-input'>Input: {entry.input}</p>
                        <p className='history-date'>Date: {entry.date}</p>
                        <p className='history-time'>Time: {entry.time}</p>
                        <p className='history-output'>Output:</p>
                        <p className='history-output-binary'>Binary: {entry.output.binary}</p>
                        <p className='history-output-decimal'>Decimal: {entry.output.decimal}</p>
                        <p className='history-output-hex'>Hex: {entry.output.hex}</p>
                    </div>
                ))}
            </div>
            <input className='clear-history-button' type='button' value='Clear History' onClick={clearHistory} />
        </div>
        </>
    )

}

export default History;