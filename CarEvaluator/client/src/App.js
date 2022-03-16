import './App.css';
import HomePage from './components/Evaluator/HomePage';
import { Routes, Route } from 'react-router-dom';
import Survey from './components/Evaluator/Survey/Survey';
import NotFound from './components/404/NotFound';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/evaluator" element={<Survey/>}/>
        <Route path= "*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
