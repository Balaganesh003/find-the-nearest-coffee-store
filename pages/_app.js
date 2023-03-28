import '../styles/globals.css';
import StoreProvider from '../store/store-context';
import { Provider } from 'react-redux';
import store from '../store/index';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    </Provider>
  );
}

export default MyApp;
