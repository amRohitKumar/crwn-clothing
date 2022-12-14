import React, {useState} from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { googleSignInStart, emailSignInStart } from '../../redux/user/user.action';

import './sign-in.style.scss';


const SignIn = ({emailSignInStart, googleSignInStart}) => {
    const [userCredentials, setCredentials] = useState({email: '', password: ''});

    const handleSubmit = async evt => {
        evt.preventDefault();
        const {email , password} =  userCredentials;
        emailSignInStart(email, password);
        setCredentials({email: '', password: ''});
    }

    const handleChange = evt => {
        const {value, name} = evt.target;
        setCredentials({...userCredentials ,[name]: value});
    }
    return(
        <div className='sign-in'>
            <h2>I already have an account.</h2>
            <span>Sign in with your email and password</span>

            <form action="" onSubmit={handleSubmit} >
                <FormInput type="email" label='email' name='email' value={userCredentials.email} handleChange={handleChange} required />
                <FormInput type="password" label='password' name='password' value={userCredentials.password} handleChange={handleChange} required />
                <div className='buttons'>
                    <CustomButton type='submit' >Sign In</CustomButton>
                    <CustomButton  onClick={googleSignInStart} isGoogleSignIn type='button'>Sign In with Google</CustomButton>
                </div>
            </form>
            
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({email,password}))
})

export default connect(null, mapDispatchToProps)(SignIn);