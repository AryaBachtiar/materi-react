
import './App.css';
import { BrowserRouter, Switch,Route} from "react-router-dom"
import NavigationBar from './component/NavigationBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Edit from "./pages/Edit";
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <div className='center'>
        <NavigationBar />
        <BrowserRouter>
        <main>
          {/* Ini untuk menyalakan sistem didalam home dan jika di edit */}
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/edit/:id" component={Edit} exact />
            <Route path="/login" component={Login} exact />
          </Switch>
        </main>
        </BrowserRouter>
      {/* <Form />
      <Table/> */}
      </div>
    </div>
  );
}

export default App;
