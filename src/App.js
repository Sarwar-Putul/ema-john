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


function App() {
  return (
    <div>
      <Header></Header>
      <Router>
        <Switch>
          <Route path="/Shop">
             <Shop></Shop>
          </Route>
          <Route path="/Review">
              <Review></Review>
          </Route>
          <Route path="/Inventory">
              <Inventory></Inventory>
          </Route>
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
      
      
    </div>
  );
}

export default App;
