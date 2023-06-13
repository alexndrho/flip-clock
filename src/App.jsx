import Clock from './components/Clock';
import './styles/app.css';

const App = () => {
  return (
    <main>
      <h1 className="title">
        <span>Flip</span> Clock
      </h1>
      <Clock />
    </main>
  );
};

export default App;
