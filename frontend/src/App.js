import "./css/App.css";
import Header from "./components/Header.js";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Welcome from "./components/Welcome.js";
import MoviesList from "./components/MoviesList.js";
import AddMovie from "./components/AddMovie.js";
import EditMovie from "./components/EditMovie.js";

function App() {
  return (
    <Router>
      <Header />
      <Container>
        <Route path="/" exact component={Welcome} />
        <Route path="/movieslist" component={MoviesList} />
        <Route path="/addmovie" component={AddMovie} />
        <Route path="/movie/:id" component={EditMovie} />
      </Container>
    </Router>
  );
}

export default App;
