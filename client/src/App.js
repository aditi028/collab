import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import {v4 as uuidV4} from 'uuid'
import Page from './components/page/Page'

function App() {
  //uuid package generates random ids
  return (
    <Page/>

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
