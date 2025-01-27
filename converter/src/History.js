import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import './History.css';

function History(props) {

    const [history, setHistory] = useState([]);


    useEffect(() => {
        const savedEntries = localStorage.getItem('history');
        if (savedEntries) {
          setHistory(JSON.parse(savedEntries));
        }
      }, [props.history]);

    const clearHistory = () => {
        if (history.length === 0) {
            return;
        }
        const choice = window.confirm('Are you sure you want to delete your conversion history? This action cannot be undone.');
        if (choice) {
            localStorage.setItem('history', JSON.stringify([]));
            setHistory([]);
        }

    }

    const deleteEntry = (entry) => {
        const newHistory = history.filter((item) => item !== entry);
        setHistory(newHistory);
        localStorage.setItem('history', JSON.stringify(newHistory));
      }

    return (
        <>
        <div className='history-container'>
            <h2 className='history-header'>Conversion History:</h2>
            <div className='history-list'>
                {history.length === 0 ? <p className='no-history'>No history...</p> : history.map((entry, index) => (
                    <><FontAwesomeIcon onClick={deleteEntry.bind(this, entry)} icon={faTrashCan} className="delete-icon" /><div key={index} className='history-entry'>
                        <div className='result-input-div'>
                            <p className='history-input'>Input: <span className='numeric-input'>{entry.input}</span></p>
                            <p className='history-date'>Date: <span className='numeric-input'>{entry.date}</span></p>
                            <p className='history-time'>Time: <span className='numeric-input'>{entry.time}</span></p>
                        </div>
                        <div className='result-output-div'>
                            <p className='history-output'>Output:</p>
                            <p className='history-output-binary'>Binary: <span className='numeric-output'>{entry.output.binary}</span></p>
                            <p className='history-output-decimal'>Decimal: <span className='numeric-output'>{entry.output.decimal}</span></p>
                            <p className='history-output-hex'>Hex: <span className='numeric-output'>{entry.output.hex}</span></p>
                        </div>

                    </div></>
                ))}
            </div>
            <input className='clear-history-button' type='button' value='Clear History' onClick={clearHistory} />
        </div>
        </>
    )

}

export default History;