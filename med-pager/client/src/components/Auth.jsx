import React, {useState} from 'react'
import Cookies from 'universal-cookie'
import axios from 'axios'

import SignInImage from '../assets/signup.jpg'

const Auth = () => {
    const [isSignUp, setisSignUp] = useState(true);
    const [fullName, setFullName] = useState("");

    
    const onSubmit = (e) => {
        e.preventDefault();
    }

    const onChange = (e) => {
        setFullName(e.target.value)
    }

    return (
        <div className="auth__form-container">
            <div className="auth__form-container_fields">
                <div className="auth__form-container_fields-content">
                    <p>{isSignUp ? 'Sign Up' : 'Sign In'}</p>
                    <form onSubmit={onSubmit}>
                        {isSignUp && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="fullName">Full Name</label>
                                <input 
                                    type="text" 
                                    name="fullName" 
                                    placeholder="Full Name" 
                                    onChange={onChange} 
                                    required 
                                />
                            </div>
                        )}

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Auth
