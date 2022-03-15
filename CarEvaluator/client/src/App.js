import './App.css';
import Evaluator from './components/Evaluator';
import { Routes, Route } from 'react-router-dom';
import MainWindow from './components/MainWindow';
function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Evaluator/>}/>
    </Routes>
    </>
  );
}

export default App;
