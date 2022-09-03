import store from './redux/store';
import {Provider} from 'react-redux';
import './App.css';
import Layout from './components/Layout';
import {Offline, Online} from 'react-detect-offline';
import OfflinePage from './components/OfflinePage';

function App() {
  return (
    <Provider store={store}>
      <Online>
        <Layout />
      </Online>
      <Offline>
        <OfflinePage />
      </Offline>
    </Provider>
  );
}

export default App;
