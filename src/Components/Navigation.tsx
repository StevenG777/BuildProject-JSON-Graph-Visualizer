import React from 'react';
import { Outlet, Link } from 'react-router-dom'

const Navigation: React.FC = (): JSX.Element => {
    // Render Element
    return(
        <>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to={`home`}> HOME </Link>
                        </li>
                        <li>
                            <Link to={`json-render`}> Graph UI JSON Render </Link>
                        </li>
                    </ul>
                </nav>
            </div>

            <div id="detail">
                <Outlet />
            </div>
        </>
    );
};

export default Navigation;
