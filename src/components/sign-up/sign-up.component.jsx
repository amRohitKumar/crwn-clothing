import React from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { createUserProfileDocument, auth, createUserWithEmailAndPassword } from "../../firebase/firebase.utils";

import './sign-up.style.scss';


class SignUp extends React.Component{
    constructor(){
        super();
        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async evt => {
        evt.preventDefault();
        const { displayName, email, password, confirmPassword} = this.state;
        if(password !== confirmPassword){
            alert('Password should match !'); 
            return;
        }
        try{
            const {user} = await createUserWithEmailAndPassword(auth, email, password);
            await createUserProfileDocument(user, {displayName})
            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            })
            
        }catch(error){
            console.log("Something went wrong in sign-up ", error.message);
        }
    }

    handleChange = evt => {
        const {name, value} = evt.target;
        this.setState({[name]: value}); 
    }

    render(){
        const {displayName, email, password, confirmPassword} = this.state;
        return(
            <div className='sign-up'>
                <h2 className='title'>I do not have a account.</h2>
                <span>
                    Sign up with your email and password
                </span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput
                        type='text'
                        name='displayName'
                        value={displayName}
                        onChange={this.handleChange}
                        label='Disply Name'
                        required
                    ></FormInput>
                    <FormInput
                        type='email'
                        name='email'
                        value={email}
                        onChange={this.handleChange}
                        label='Email'
                        required
                    ></FormInput>
                    <FormInput
                        type='password'
                        name='password'
                        value={password}
                        onChange={this.handleChange}
                        label='Password'
                        required
                    ></FormInput>
                    <FormInput
                        type='password'
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={this.handleChange}
                        label='Confirm Password'
                        required
                    ></FormInput>
                    <CustomButton type='submit'>SIGN-UP</CustomButton>
                </form>
            </div>
        )
    }
}

export default SignUp;