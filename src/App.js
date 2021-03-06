import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./App.css";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckoutPage from "./pages/checkout/checkout.component";

import Header from "./components/header/header.component";

import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";
// import { selectCollectionsForPreview } from "./redux/shop/shop.selectors";

// import {
//   auth,
//   createUserProfileDocument,
//   addCollectionAndDocuments,
// } from "./firebase/firebase.utils";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    // const { setCurrentUser, collectionsArray } = this.props;
    const { setCurrentUser } = this.props;

    // 登入時 => 1 3 2, 登出時 => 3
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        // 1
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          // 2
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }
      // 3
      setCurrentUser(userAuth);
      // addCollectionAndDocuments(
      //   "collections",
      //   collectionsArray.map(({ title, items }) => ({ title, items }))
      // );
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    const { currentUser } = this.props;
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
            }
          />
        </Switch>
      </div>
    );
  }
}

// const mapStateToProps = ({ user }) => ({
//   currentUser: user.currentUser,
// })

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  // collectionsArray: selectCollectionsForPreview,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)), // 第一個setCurrentUser對應上面的props, 第二個對應上面的import
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
