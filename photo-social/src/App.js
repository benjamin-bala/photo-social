import StoreContext from './Context/StoreContext';
import Navigation from './Pages/Navigation';

function App() {
  return (
    <StoreContext>
      <Navigation />
    </StoreContext>
  );
}

export default App;
