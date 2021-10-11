import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { singInWithGoogle, signInWithEmailAndPassword, auth } from '../../firebase/firebase.utils';

import './sign-in.style.scss';


class SignIn extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '' 
        }
    }

    handleSubmit = async evt => {
        evt.preventDefault();
        const {email , password} = this.state;
        try{
            const {user} = await signInWithEmailAndPassword(auth, email, password);

        }catch(error){
            console.log("Something went wrong in sing-in ", error.message);
        }
        this.setState({email: '', password: ''});
    }

    handleChange = evt => {
        const {value, name} = evt.target;
        this.setState({[name]: value});
    }

    render(){
        return(
            <div className='sign-in'>
                <h2>I already have an accound</h2>
                <span>Sign in with your email and password</span>

                <form action="" onSubmit={this.handleSubmit} >
                    <FormInput type="email" label='email' name='email' value={this.state.email} handleChange={this.handleChange} required />
                    <FormInput type="password" label='password' name='password' value={this.state.password} handleChange={this.handleChange} required />
                    <div className='buttons'>
                        <CustomButton type='submit' >Sign In</CustomButton>
                        <CustomButton onClick={singInWithGoogle} isGoogleSignIn >Sign In with Google</CustomButton>
                    </div>
                </form>
                
            </div>
        )
    }
}

export default SignIn;