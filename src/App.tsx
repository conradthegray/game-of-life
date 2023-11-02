import Header from './components/Header';
import Footer from './components/Footer';
import Board from './components/Board';

import './App.css';

export default function App() {
  return (
    <div className="app-container grid h-full gap-4">
      <Header />
      <Board />
      <Footer />
    </div>
  );
}
