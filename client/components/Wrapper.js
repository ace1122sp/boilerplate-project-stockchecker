import React from 'react';
import Main from './Main';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine, faBalanceScale, faThumbsUp, faEyeSlash, faSpinner } from '@fortawesome/free-solid-svg-icons'

library.add(faChartLine, faBalanceScale, faThumbsUp, faEyeSlash, faSpinner);

import '../css/Wrapper.scss';

const Wrapper = () => 
    <div>
      <header>
        <h1>StockPicker</h1>
      </header>
      <main>
        <Main />
      </main>
    </div>

export default Wrapper;