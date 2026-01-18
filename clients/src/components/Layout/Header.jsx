import React from "react";  
import './Header.css';

import {usenavigate} from 'react-router-dom';

function Header() {
    const navigate = usenavigate();
    return(
        <header className="header">
            <div className="header">
                <button onClick={() => navigate("/admin")}></button>
            </div>

        </header>
    )
}