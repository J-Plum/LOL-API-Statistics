import React from 'react';
import styles from './SummonerRank.module.css'

export default function SummonerRank({item}) {
   return (
      <div className={styles.container}> 
         <img className={styles.tier} src={`/images/rank/Emblem_${item.tier}.png`} alt="" />
         <div className={styles.info}>
            <div>{item.queueType === "" ? "UNRANKED" : (item.queueType === "RANKED_SOLO_5x5" ? "솔로랭크" : "자유랭크")}</div>
            {(item.tier === "UNRANKED" ? null : true) &&<div className={styles.detail}>
               <div>
                  <div className={styles.tier_rank}>{item.tier} {item.rank}</div>
                  <div className={styles.rankPoint}>{item.leaguePoints !== 0 ? `${item.leaguePoints}LP` : "UNRANKED"}</div>
               </div>
               <div className={styles.win_lose_container}>
                  <div>
                     <div className={styles.wins}>{item.wins !== 0 ? `${item.wins}승` : ""}</div>
                     <div className={styles.losses}>{item.losses !== 0 ? `${item.losses}패` : ""}</div>
                  </div>
                  <div className={styles.ratio}>승률 {Math.ceil(item.wins/(item.wins+item.losses)*100)}%</div>
               </div>
            </div>}
            {(item.tier === "UNRANKED" ? true : null) &&<div className={styles.rankInfo2}>
               <div>UNRANKED</div>
            </div>}
         </div>
      </div>
   );
}

