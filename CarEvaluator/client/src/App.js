import './App.css';
import HomePage from './components/Evaluator/HomePage';
import { Routes, Route } from 'react-router-dom';
import Survey from './components/Evaluator/Survey/Survey';
import NotFound from './components/404/NotFound';
import Results from './components/Results/Results';
import About from './components/About/About';
function App() {
  return (
    <>
      <div
        className={`bg-gradient-to-b from-slate-300 to-slate-500 w-screen h-screen overflow-scroll scrollHide`}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/evaluator" element={<Survey />} />
          <Route path="/results" element={<Results />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
