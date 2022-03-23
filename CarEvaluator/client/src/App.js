import './App.css';
import HomePage from './components/Evaluator/HomePage';
import { Routes, Route } from 'react-router-dom';
import Survey from './components/Evaluator/Survey/Survey';
import NotFound from './components/404/NotFound';
import Results from './components/Results/Results';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/evaluator" element={<Survey/>}/>
        <Route path="/results" element={<Results/>}/>
        <Route path= "*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
