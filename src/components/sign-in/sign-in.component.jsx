import React from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { googleSignInStart, emailSignInStart } from '../../redux/user/user.action';

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
        const {emailSignInStart} = this.props;
        const {email , password} = this.state;
        emailSignInStart(email, password);
        this.setState({email: '', password: ''});
    }

    handleChange = evt => {
        const {value, name} = evt.target;
        this.setState({[name]: value});
    }

    render(){
        const {googleSignInStart} = this.props;
        return(
            <div className='sign-in'>
                <h2>I already have an accound</h2>
                <span>Sign in with your email and password</span>

                <form action="" onSubmit={this.handleSubmit} >
                    <FormInput type="email" label='email' name='email' value={this.state.email} handleChange={this.handleChange} required />
                    <FormInput type="password" label='password' name='password' value={this.state.password} handleChange={this.handleChange} required />
                    <div className='buttons'>
                        <CustomButton type='submit' >Sign In</CustomButton>
                        <CustomButton  onClick={googleSignInStart} isGoogleSignIn type='button'>Sign In with Google</CustomButton>
                    </div>
                </form>
                
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({email,password}))
})

export default connect(null, mapDispatchToProps)(SignIn);