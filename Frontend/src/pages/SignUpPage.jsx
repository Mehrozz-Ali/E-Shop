import React, { useEffect } from 'react'
import SignUp from "../components/signUp/SignUp.jsx"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function SignUpPage() {
    const { isAuthenticated } = useSelector((state) => state.user);
    const navigate = useNavigate();
    useEffect(() => {
        if (isAuthenticated === true) {
            navigate("/");
        }
    }, [])
    return (
        <div>
            <SignUp />
        </div>
    )
}

export default SignUpPage