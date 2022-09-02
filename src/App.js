import store from './redux/store';
import {Provider} from 'react-redux';
import './App.css';
import Layout from './components/Layout';

function App() {
  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  );
}

export default App;
