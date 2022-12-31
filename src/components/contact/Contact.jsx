import React from 'react';
import styles from "./Contact.module.css";


export default function Contact({src, link}) {
   return (
      <div className={styles.container}>
         <a href={link} target="blank">
            <img src={src} alt="" className={styles.img}/>
         </a>
      </div>
      
   );
}

