import './App.css';
import Header from './components/Header/Header';
import Product from './components/Product/Product';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/NotFound/NotFound';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';
import { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value = {[loggedInUser, setLoggedInUser]}>
      <h1>Email: {loggedInUser.email}</h1>
      
      <Router>
      <Header></Header>
        <Switch>
          <Route path="/Shop">
             <Shop></Shop>
          </Route>
          <Route path="/Review">
              <Review></Review>
          </Route>
          <PrivateRoute path="/Inventory">
              <Inventory></Inventory>
          </PrivateRoute>
          <Route path="/Login">
            <Login></Login>
          </Route>
          <PrivateRoute path="/Shipment">
            <Shipment></Shipment>
          </PrivateRoute>
          <Route path="/Product/:productKey">
              <ProductDetails></ProductDetails>
          </Route>
          {/* <Route exact path="/">
              <Shop></Shop>
          </Route>
          <Route path="*">
            <NotFound></NotFound>
          </Route> */}

          <Route exact path="/" component={()=><Shop isAuthed={true}/>}/>
          <Route path="*" component={()=><NotFound isAuthed={true}/>}/>
          

        </Switch>
      </Router>
      
      
    </UserContext.Provider>
  );
}

export default App;
