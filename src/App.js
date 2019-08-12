import React from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component'
import SignPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import Header from "./components/header/header.component"
import {auth,createUserProfileDoc} from './firebase/firebase.utils';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      currentUser:null
    }
  }
  unsubscribeFromAuth = null
  componentDidMount()
  {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async user => {
      if(user){
        const uRef=await createUserProfileDoc(user)
        uRef.onSnapshot(snapshot => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          }, () => {
            console.log(this.state)
          });
        });
      }
      else {
        this.setState({
          currentUser: user
        })
      }
    })
  }
  componentWillUnmount(){
    this.unsubscribeFromAuth();
    console.log("Unsubscribed!")
  }
  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route path="/shop" component={ShopPage}/>
          <Route path='/sign' component={SignPage}/>
        </Switch>
      </div>
    );
  }
}

export default App;
