import React from 'react';
import { Link } from 'react-router-dom';

export default function(){
    return (
        <div>
            <Link to = '/home'>
                <button>Login</button>
            </Link>
        </div>
    );
};