import { useEffect, useState } from "react";
import React from "react";
import "./css/CopyButton.css";


function CopyButton(props) {

    const dataType = props.dataType;


    const [toCopy, setToCopy] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        setToCopy(props.toCopy);
    }, [props]);



    const copy = () => {
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1000);
        navigator.clipboard.writeText(toCopy);  
    }

    return (
        <>
            <label>
                <button disabled={copied} className='copy-button' onClick={copy}>
                    Copy to Clipboard
                </button>
                {copied && (
                    <span className="copy-widget">
                        {dataType} copied to clipboard!
                        <style>
                            {`
                                .copy-widget {
                                    position: fixed;
                                    bottom: 20px;
                                    left: 50%;
                                    transform: translateX(-50%);
                                    background: rgba(50, 50, 50, 0.9);
                                    color: #fff;
                                    padding: 12px 20px;
                                    font-size: 16px;
                                    font-weight: 600;
                                    border-radius: 8px;
                                    box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.15);
                                    opacity: 1;
                                    transition: opacity 0.5s ease-in-out;
                                    z-index: 1000;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    text-align: center;
                                    min-width: 200px;
                                }
    
                                @media screen and (max-width: 600px) {
                                    .copy-widget {
                                        bottom: 10px;
                                        font-size: 14px;
                                        padding: 10px 16px;
                                        min-width: 150px;
                                    }
                                }
                            `}
                        </style>
                    </span>
                )}
            </label>
        </>
    );
    
    
}

export default CopyButton;