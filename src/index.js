import React from 'react';
import ReactDOM from 'react-dom';
import WebFont from 'webfontloader';

import './styles/styles.scss';
import App from './components/App';

WebFont.load({
    google: {
        families: ['Source Sans Pro:400,400italic,700italic:latin-ext']
    }
})

ReactDOM.render(<App />, document.getElementById('root'));
