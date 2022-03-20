import "./stylesheets/App.css";
import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";
  import Main from "./pages/Main";

function App() {
    return (
        <div className="App">
        <Router>
          <div className="container">
            <Routes>
              <Route path="/" element={<Main/>}/>
            </Routes>
          </div>
        </Router>
        </div>
    );
}

export default App;