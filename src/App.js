import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inputtodo from './Components/Inputtodo';
function App() {
  return (
    <>
      <Router>

        <Routes>
          <Route path="/" element={<Inputtodo />} />

        </Routes>

      </Router>
    </>
  );
}

export default App;
