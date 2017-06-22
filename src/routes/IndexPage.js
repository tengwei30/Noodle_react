
import React from 'react';
import './IndexPage.less';

import Index from './IndexList/index';
import './common/comm.js';

function IndexPage() {
  return(
      <div>
        <Index />
      </div>
    )
}

IndexPage.prototype = {}

export default IndexPage;

