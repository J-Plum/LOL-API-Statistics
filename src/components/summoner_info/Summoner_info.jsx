import { useParams } from 'react-router-dom';
import MatchList from '../match_list/match_list';
import React, {useEffect, useState} from 'react';
import styles from './Summoner_info.module.css';
import { useRef } from 'react';

import { MATCH_TYPE } from "../../types/match.js";
import { SNOW_COLOR } from "../../types/snow_type.js";
import * as Snow from '../snow/Snow.js'
import SummonerRank from '../summoner_rank/SummonerRank';

function SummonerInfo({APIs}) {
   const [loading, setLoading] = useState(true);
   const [info, setInfo] = useState();
   const [selected, setSelected] = useState(MATCH_TYPE.ALL);

   const { summonerName } = useParams();
   
   const inputRef = useRef();

   const search = query => {
      setLoading(true);
      
      APIs.search(query)
         .then(result => {
            setSummoner(result);
         })
         .catch((error) => {
            setLoading(false);
         });
   };

   const setSummoner = (summoner) => {
      APIs.summonerLeague(summoner.id)
         .then(result => {
            let rank = {};
            let UNRANKED = [];

            const DEFAULT_INFO = {
               rank : "UNRANKED", 
               tier : "UNRANKED", 
               leaguePoints : 0,
               summonerId : summoner.summonerId,
               wins : 0,
               losses : 0
            }

            UNRANKED.push( { queueType : "RANKED_SOLO_5x5", ...DEFAULT_INFO });
            UNRANKED.push( { queueType : "RANKED_FLEX_SR", ...DEFAULT_INFO });
            
            if( result.length === 0 ){
               rank = { ...summoner, result : UNRANKED };
            } else if ( result.length === 1 && result[0].queueType === 'RANKED_TFT_DOUBLE_UP' ){
               rank = { ...summoner, result : UNRANKED };
            } else {
               const filter = result.filter(element => element.queueType !== "RANKED_TFT_DOUBLE_UP");
               rank = { ...summoner, result : filter };
            }

            setInfo(rank);
            setLoading(false); 
         });
   }

   const handleButton = (e) =>{
      if(e.target.nodeName !== 'BUTTON'){
         return
      }

      const matchType = e.target.parentNode.dataset.set;
      setSelected(matchType);
   }

   //최초 랜더링 입력한 이름
   useEffect(()=>{
      search(summonerName);
   }, [])

   if(loading){
      return <>
         <h1>전적 조회중 입니다...</h1>   
      </>
   } else if(!loading && !info.id) {
      return <h1>사용자가 없슴</h1>
   } else {
      return (
         <>
         {info && <div className={styles.container}>
            {Snow.makeSnowflake(SNOW_COLOR.BLUE)}
            <div className={styles.profileInfo}>
               <div className={styles.profileInfo__info}>
                  <div className={styles.test}>
                     <div className={styles.profileInfo__info1}>
                        <img className={styles.info1_icon} src={`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/profileicon/${info.profileIconId}.png`} alt="" />
                        <span className={styles.info1_level}>{info.summonerLevel}</span>
                     </div>
                     <div className={styles.profileInfo__info2}>
                        <span className={styles.info2_name}>{info.name}</span>
                        <div className={styles.info2_rankType}>
                           {info.result.map(item=>{
                              return <SummonerRank key={item.leagueId} item={item}/>
                           })}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className={styles.gameTypeContainer} onClick={handleButton}>
               <ul>
                  <li key={MATCH_TYPE.ALL} data-set={MATCH_TYPE.ALL} >
                     <button  className={`${styles.button} ${selected === MATCH_TYPE.ALL ? styles.selected : ''}`} >전체</button>
                  </li>
                  <li key={MATCH_TYPE.SOLO} data-set={MATCH_TYPE.SOLO}>
                     <button  className={`${styles.button} ${selected === MATCH_TYPE.SOLO ? styles.selected : ''}`}>솔로랭크</button>
                  </li>
                  <li key={MATCH_TYPE.FREE} data-set={MATCH_TYPE.FREE}>
                     <button  className={`${styles.button} ${selected === MATCH_TYPE.FREE ? styles.selected : ''}`}>자유랭크</button>
                  </li>
                  <li key='ETC' className={styles.select}>
                     <select>
                        <option value="큐 타입">큐 타입</option>
                        <option value="일반">일반</option>
                        <option value="무작위 총력전">무작위 총력전</option>
                        <option value="AI상대 대전">AI상대 대전</option>
                        <option value="격전">격전</option>
                        <option value="이벤트 게임">이벤트 게임</option>
                        <option value="우르프">우르프</option>
                     </select>
                  </li>
                  <li key={'test2'} className={styles.input}>
                     <input ref={inputRef} type="text" placeholder='챔피언 검색' />
                     <img
                        className={styles.buttonImg}
                        src="/images/search.png"
                        alt="search"
                        />
                  </li>
               </ul>
            </div>
            <div className={styles.matchList}>
               <MatchList  APIs={APIs} info={info} search={search} summonerName={summonerName}/>
            </div>
         </div>}
      </>
      );
   }
}

export default React.memo(SummonerInfo);