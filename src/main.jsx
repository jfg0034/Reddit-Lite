import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import App from './app/App.jsx'
import store from './app/store.js'

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <App />
    </Provider>
)
