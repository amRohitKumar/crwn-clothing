import React from 'react';
import { Switch, Route } from 'react-router-dom';  
import { connect } from 'react-redux';
import './App.css';

import HomePage from './pages/homepage/homepage.components';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {auth, createUserProfileDocument, onSnapshot} from './firebase/firebase.utils';

import {setCurrentUser} from './redux/user/user.action';

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount(){
    const {setCurrentUser} = this.props;
    this.subscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        
        onSnapshot(userRef, doc => {
          console.log(doc);
          setCurrentUser({
            id: doc.id,
            ...doc.data()
          }) 
        })
      } 
      else{
        setCurrentUser(null);
      }
    });
  }
  
  componentWillUnmount(){
    this.unsubscribeFromAuth();
    // this.unsubscribeFromAuth.off();
  }

  render(){
    return <div >
      <Header/> 
      <Switch>
        <Route exact path='/' component = {HomePage} />
        <Route path='/shop' component={ShopPage}/>
        <Route path='/signin' component={SignInAndSignUpPage}/>
      </Switch>
    </div>
  };
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(App);
