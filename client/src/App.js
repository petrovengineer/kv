// import Drawer from './components/Drawer'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import Resources from './views/Resources'
import Tranches from './views/Tranches'
import CashWastes from './views/CashWastes'
import Wastes from './views/Wastes'
import Payers from './views/Payers'
import Users from './views/Users'
import Resource from './views/Resource'
import { ApolloClient, InMemoryCache, concat, ApolloLink, HttpLink } from '@apollo/client'
import { ApolloProvider } from '@apollo/client'
import Layout from './components/Layout'
import Login from './views/Login'
import PrivateRoute from './components/PrivateRoute'

const httpLink = new HttpLink({ uri: 'http://localhost:3000/graphql' });

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: "Token "+localStorage.getItem('token') || null,
    }
  });
  return forward(operation);
})

const client = new ApolloClient({
  // uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink)
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
              <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/resources">
                  <Resources />
                </Route>
                <Route path="/cashwastes">
                  <CashWastes />
                </Route>
                <Route path="/wastes">
                  <Wastes />
                </Route>
                <Route path="/payers">
                  <Payers />
                </Route>
                <Route path="/users">
                  <Users />
                </Route>
                <Route path='/resource/:_id' render={(props) => {
                      return ( <Resource {...props } /> )
                  }} />
                <PrivateRoute path="/" component={Tranches}/>
              </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
