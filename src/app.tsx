import './styles/app.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store';
import Map from './components/map/Map';
import Menu from './components/menu/Menu';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div style={{ position: 'relative' }}>
          <Map />
          <Menu />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
