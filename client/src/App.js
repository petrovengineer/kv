import Drawer from './components/Drawer'
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
import styled from 'styled-components'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
          <Drawer/>
          <StyledContent>
            <div style={{margin: "20px"}}>
            <Switch>
              <Route path="/tranches">
                <Tranches />
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
              <Route path="/">
                <Resources />
              </Route>
            </Switch>
            </div>
          </StyledContent>
      </Router>
    </ApolloProvider>
  );
}

const StyledContent = styled.section`
  position: fixed;
  left: 300px;
  top: 0;
  width: calc(100% - 300px);
  background-color: GAINSBORO;
  height: 100%;
  overflow-y: scroll;
`

export default App;
