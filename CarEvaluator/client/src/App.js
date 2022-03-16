import './App.css';
import Evaluator from './components/Evaluator/Evaluator';
import { Routes, Route } from 'react-router-dom';
import MainWindow from './components/MainWindow';
import NotFound from './components/404/NotFound';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Evaluator />} />
        <Route path= "*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
