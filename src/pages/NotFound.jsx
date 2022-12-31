import React from 'react';
import styles from './NotFound.module.css'
import * as snow from '../components/snow/Snow.js'
import { SNOW_COLOR } from "../types/snow_type.js"

export default function NotFound() {

   return (
      <>
      <div className={styles.error}>
         { snow.makeSnowflake(SNOW_COLOR.WHITE) }
         <div className={styles.errorContainer}>
            <img className={styles.img} src="/images/favicon.png" alt="logo" />
            <div className={styles.spanContainer}>
               <span>페이지를</span><span className={styles.color}>찾을 수 없습니다.</span>
               <br/>
               <span className={styles.notFound}>(404 Not Found)</span>
               <br/>
               <div className={styles.test}>
                  <span>페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다.</span><br/>
                  <span>입력하신 경로가 정확한지 다시 한번 확인해 주시기 바랍니다.</span>
               </div>
            </div>
         </div>
      </div>
      </>
   );
}

