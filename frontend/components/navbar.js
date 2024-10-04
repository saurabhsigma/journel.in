import React, { useState, useEffect } from "react";
import '../app/globals.css';
import Link from "next/link";
import axios from 'axios';

const Nav = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUsername = localStorage.getItem('username');
        console.log("Token:", token);
        console.log("Stored Username:", storedUsername);
        setIsLoggedIn(!!token);
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);
    

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:4002/api/v1/user/logout');
            localStorage.removeItem('token');
            localStorage.removeItem('username'); // Clear username on logout
            setIsLoggedIn(false);
            setUsername('');
            window.location.href = '/'; // Redirect after logout
        } catch (error) {
            console.error('Logout failed', error);
        }

        
    };

    return (
        <div className="flex flex-row bg-blue-400 font-bold justify-between p-3">
            
            <div id="links" className="flex items-center">
                <Link href="/View" className="m-2">View!</Link>
                <Link href="/Write" className="m-2">Write!</Link>


                {isLoggedIn ? (
                    <>
                        <span className="m-2 text-white">Welcome, {username}!</span>
                        <button 
                            onClick={handleLogout} 
                            className="m-2 p-5 border-1 bg-white text-black rounded-md"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <Link href="/Login" className="m-2 p-5">
                        <button className="border-1 bg-white text-black p-1 rounded-md">Login/Signup!</button>
                    </Link>
                )}


                
            </div>
        </div>
    );
};

export default Nav;
