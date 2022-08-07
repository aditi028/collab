import './App.css';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import {v4 as uuidV4} from 'uuid'
import Page from './components/page/Page'

function App() {
  //uuid package generates random ids
  return (
    <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <Redirect to={"/documents/${uuidV4()}"}></Redirect>
      </Route>
      <Route  path="/documents/:id">
        <Page/>
      </Route>
    </Switch>
    </BrowserRouter>
  );
}

// <Router>
//       <Switch>
//         <Route exact path="/">
//           <Redirect to={`/documents/${uuidV4()}`}/>
//         </Route>
//         <Route exact path="/documents/:id">
//          <Page/>
//         </Route>
//       </Switch>
//       <Page/>
//     </Router>

export default App;
