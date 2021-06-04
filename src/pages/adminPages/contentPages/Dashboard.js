import React, { useState, useEffect } from 'react'
import Iframe from "react-iframe";
import AuthService from "../../../services/auth.service";

const Dashboard = () => {
    const [showEmployee, setShowEmployee] = useState(false);
    const [showAdmin, setShowAdmin] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
            setShowEmployee(user.roles.includes("ROLE_EMPLOYEE"));
            setShowAdmin(user.roles.includes("ROLE_ADMIN"));
        }
    }, []);
    
    return (
        <div className="shadow-sm p-3 mb-5 bg-white rounded">
            <h1>Dashboard</h1>
            {showAdmin && (
            <Iframe
                url="http://localhost:5000/status"
                width="700px"
                height="1050px"
                id="ststus"
                className="status"
                display="initial"
                position="relative"
            />
            )}
            {showEmployee && (
                
            )}
        </div>
    )
}

export default Dashboard;