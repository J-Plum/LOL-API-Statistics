import React , { useEffect, useState }  from 'react';
import MatchItem from '../match_item/match_item';
import styles from './match_list.module.css';

export default function MatchList({APIs, info, search}) {
   const [start, setStart] = useState(0);
   const [list, setList] = useState([]);
   const COUNT = 5;
   
   const listAdd = () =>{
      if(list.length < 30){
         setStart(prev => prev + COUNT);
      }else{
         alert("더이상 가져올 수 없습니다.");
         console.log("더이상 가져올 수 없습니다.");
      }
   }

   useEffect(()=>{
      if(info){
         APIs.matchList(info.puuid, start, COUNT)//
         .then(result => {
            if (start === 0) {
               setList(result);
            } else {
               setList(prev => [...prev , ...result]);
            }
         });
      }
      
   },[start, info, APIs]);


   return <div>
      <div className={styles.container}>
         <ul className={styles.list}>
            {
               list.map(match =>{
                  return <MatchItem key={match} match ={match} APIs={APIs} puuid={info.puuid} search={search}/>
               })
            }
            <button className={styles.button} onClick={listAdd}>더보기</button>
         </ul>
      </div>
   </div>
}
