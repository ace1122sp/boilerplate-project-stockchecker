import React from 'react';
import Main from './Main';
import Footer from './Footer';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faChartLine, faBalanceScale, faThumbsUp, faEyeSlash, faSpinner, faHouseDamage, faFolder } from '@fortawesome/free-solid-svg-icons';

library.add(fab, faChartLine, faBalanceScale, faThumbsUp, faEyeSlash, faSpinner, faHouseDamage, faFolder );

import '../css/Wrapper.scss';

const Wrapper = () => 
    <div>
      <header>
        <h1>Stockchecker</h1>
      </header>
      <main>
        <Main />
      </main>
      <Footer />
    </div>

export default Wrapper;