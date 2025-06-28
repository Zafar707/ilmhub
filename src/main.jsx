import { Provider } from 'react-redux';
import { store } from './store/index.js';
// ...
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);