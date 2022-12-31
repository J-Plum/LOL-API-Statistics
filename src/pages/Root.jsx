import React from 'react';
import { Outlet } from 'react-router-dom'

import MainHeader from '../components/main_header/MainHeader'
import styles from './Root.module.css'

export default function Root() {
   return (
      <div className={styles.container}>
         <MainHeader />
         <Outlet/>
      </div>
   );
}

