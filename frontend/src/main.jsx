import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { Provider } from 'react-redux'

import './index.css'
import Store from '../Store/Store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={Store} >

      <App />
    </Provider>
  </React.StrictMode>,
)
