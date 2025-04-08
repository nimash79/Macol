import './styles.css';
import TemperatureDisplay from './components/TemperatureDisplay';
import TargetControl from './components/TargetControl';

function App() {
  return (
    <div className="app-wrapper">
      <header>TempControl</header>

      <main>
        <TemperatureDisplay />
        <TargetControl />
      </main>

      <footer>© 2025 Your Company</footer>
    </div>
  );
}

export default App;
