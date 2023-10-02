import './styles/app.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';

import { Provider } from 'react-redux';
import store from './redux/store';
import Map from './components/map/Map';
import Menu from './components/menu/Menu';

function App() {
  return (
    <Provider store={store}>
      <div style={{ position: 'relative' }}>
        <Map />
        <Menu />
      </div>
    </Provider>
  );
}

export default App;
