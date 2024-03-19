import logo from './logo.svg';
import './App.css';
import CreateForm from './Components/createComponent';
import DeleteActor from './Components/deleteComponent';
import FindFilms from './Components/filmsComponent';
import ActorsTable from './Components/getComponent';
import ExportToCsvButton from './Components/tocsvComponent';
import Navbar from './Components/navComponent';
import UpdateActor from './Components/updateComponent';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import DataComponent from './Components/dataComponent';
import VotingComponent from './Components/votingComponent';

function App() {

  return (
    <Router>
      <div className='App'>
      <header>
        <nav className='nav'>
            <a><Link to="/">Open Data</Link></a>
            <a><Link to="/CreateComponent">Add Actor</Link></a>
            <a><Link to="/DeleteActor">Delete Actor</Link></a>
            <a><Link to="/FindFilms">Find Film</Link></a>
            <a><Link to="/ExportToCsvButton">Download</Link></a>
            <a><Link to="/UpdateActor">Update</Link></a>
            <a><Link to="/ActorsTable">View Data</Link></a>
            <a><Link to="/vote">Vote</Link></a>  
        </nav>
        </header>
        

        <div className='content'>
        <Routes>
          <Route exact path="/" Component={DataComponent} />
          <Route exact path="/CreateComponent" Component={CreateForm} />
          <Route path="/DeleteActor" Component={DeleteActor} />
          <Route path="/FindFilms" Component={FindFilms} />
          <Route path="/ExportToCsvButton" Component={ExportToCsvButton} />
          <Route path='/UpdateActor' Component={UpdateActor} />
          <Route path='/ActorsTable' Component={ActorsTable} />
          <Route path="/vote" Component={VotingComponent}/>
        </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
