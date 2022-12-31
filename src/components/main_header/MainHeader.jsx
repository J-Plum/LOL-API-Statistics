import React from 'react';
import styles from './MainHeader.module.css';
import { useNavigate } from 'react-router-dom';

export default function SearchHeader() {
   const navigate = useNavigate();

   return (
      <header className={styles.header}>
         <div className={styles.logo}  onClick={()=>{navigate(`/`);}}>
            <img className={styles.img} src="/images/favicon.png" alt="logo" />
            <h1 className={styles.title}>J-plum</h1>
         </div>
      </header>
   );
}
