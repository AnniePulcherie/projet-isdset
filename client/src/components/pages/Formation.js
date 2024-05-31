import React, { useState, useEffect } from 'react';
import Menu from './Menu';
import axios from 'axios';

import Footer from './footer';
import ChoisirFormation from './ChoisirFormation';

const Formation = () => {


  return (
    <div>
       <Menu />
          <ChoisirFormation />
         <Footer/>
        
    </div>
  );
};


export default Formation;