import React, {useState} from "react";
import { connect } from "react-redux";

import { signUpStart } from "../../redux/user/user.action";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import './sign-up.style.css';


const SignUp = ({signUpStart}) => {
    const [userCredentials, setCredentials] = useState({displayName: '', email: '', password: '', confirmPassword: ''});
    const {displayName, email, password, confirmPassword} = userCredentials;
    const handleSubmit = async evt => {
        evt.preventDefault();
        if(password !== confirmPassword){
            alert('Password should match !'); 
            return;
        }
        signUpStart(email, password, displayName);
        setCredentials({
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        })
    }

    const handleChange = evt => {
        const {name, value} = evt.target;
        setCredentials({...userCredentials ,[name]: value}); 
    }
    return(
        <div className='sign-up'>
            <h2 className='title'>I do not have a account.</h2>
            <span>
                Sign up with your email and password
            </span>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <FormInput
                    type='text'
                    name='displayName'
                    value={displayName}
                    onChange={handleChange}
                    label='Disply Name'
                    required
                ></FormInput>
                <FormInput
                    type='email'
                    name='email'
                    value={email}
                    onChange={handleChange}
                    label='Email'
                    required
                ></FormInput>
                <FormInput
                    type='password'
                    name='password'
                    value={password}
                    onChange={handleChange}
                    label='Password'
                    required
                ></FormInput>
                <FormInput
                    type='password'
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={handleChange}
                    label='Confirm Password'
                    required
                ></FormInput>
                <CustomButton type='submit'>SIGN-UP</CustomButton>
            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    signUpStart: (email, password, displayName) => dispatch(signUpStart({email,password, displayName}))
});

export default connect(null, mapDispatchToProps)(SignUp);