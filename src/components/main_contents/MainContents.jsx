import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MainContents.module.css';

import { SNOW_COLOR } from "../../types/snow_type.js"
import { CONTACT_TYPE } from "../../types/contact.js"
import * as Snow from '../snow/Snow.js'
import Contact from '../contact/Contact';

export default function MainContents() {
   const inputRef = useRef();
   const navigate = useNavigate();

   const search = () => {
      let value = inputRef.current.value;
      if(value.length === 2){
         value = value[0]+" "+value[1];
      }
      navigate(`/search/${value}`);
   };

   const onClick = () => {
      search();
   };

   const onKeyPress = event => {
      if (event.key === 'Enter') {
         search();
      }
   };

   return (
      <>
         <div className={styles.container}>
            { Snow.makeSnowflake(SNOW_COLOR.WHITE) }
            <img className={styles.logo} src="/images/favicon.png" alt="logo" />
            <div className={styles.search}>
               <div className={styles.inputContainer}>
                  <input
                     ref={inputRef}
                     className={styles.input}
                     type="search"
                     placeholder="Summoner Name"
                     onKeyPress={onKeyPress}
                     maxLength="16"
                  />
                  <div className={styles.button}>
                     <img
                        className={styles.buttonImg}
                        src="/images/search.png"
                        alt="search"
                        onClick={onClick}
                        />
                  </div>
               </div>
            </div>
            <footer className={styles.footer}>
               <hr className={styles.line}></hr>
               <small className={styles.footerSmall}>
                  © 2022-2022 Jplum.xyz. Jplum.xyz isn’t endorsed by Riot Games and doesn’t
                  reflect the views or opinions of Riot Games or anyone officially
                  involved in producing or managing League of Legends. League of Legends
                  and Riot Games are trademarks or registered trademarks of Riot Games,
                  Inc. League of Legends © Riot Games, Inc.
               </small>
               <div className={styles.linkContainer}>
                     <Contact src={CONTACT_TYPE.GIT.src} link ={CONTACT_TYPE.GIT.link}/>
                     <Contact src={CONTACT_TYPE.LINKEDIN.src} link ={CONTACT_TYPE.LINKEDIN.link}/>
               </div>
            </footer>
         </div>
      </>
   );
}
