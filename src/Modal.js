import React from "react";
import './App.css';

function Modal(props) {
    return (
        <div className="modal">
            <h2>{props.text}</h2>
            <div className="actions">
                <button className="btn" onClick={menuHandler}>GO</button>
            </div>
        </div>
    );
}

function menuHandler() {
    console.log("Clicked");
}

export default Modal;