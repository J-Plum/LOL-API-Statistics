import React, { useEffect, useState } from 'react';
import runes from './runesReforged.json'
import queues from './queues.json'
import styles from './match_item.module.css'


export default function MatchItem({ APIs,match, puuid}) {
   const [user, setUser] = useState();

   useEffect(()=>{
      APIs.matchResult(match)
      .then(result => {
         const userInformation = result.info.participants.find(user => user.puuid === puuid);
         const rune = setRuneImages(userInformation.perks.styles[0], userInformation.perks.styles[1]);
         
         const date = new Date();
         const gamePlayTime = (new Date(result.info.gameEndTimestamp) - new Date(result.info.gameStartTimestamp))/1000;
         const hours = Math.floor(gamePlayTime/3600);
         const minutes = Math.floor(gamePlayTime%3600/60);
         const seconds = Math.round(gamePlayTime%3600%60%60);
         
         const teamId = userInformation.teamId;

         const team = result.info.teams.find(item => item.teamId === teamId);
         const killPersent = Math.round(((userInformation.kills+userInformation.assists) /team.objectives.champion.kills)*100);
         const timeStamp = (date - new Date(result.info.gameEndTimestamp))/1000
         let days = 0;
         if(Math.floor(timeStamp/3600) >=23){
            days = Math.floor(timeStamp/3600/24);
         }
         const endGameDays = days;
         const endGameHours = Math.floor(timeStamp/3600);
         const endGameMinutes = Math.ceil(timeStamp%3600/60);
         const endGameSeconds = Math.ceil(timeStamp%3600%60%60);
         // const queueId = result.info.queueId;
         const gameType = queues.find(item => item.queueId === result.info.queueId);

         const cs = (userInformation.totalMinionsKilled + userInformation.neutralMinionsKilled);
         const minutePerMinion = Math.round((cs/(((hours*3600)+(minutes*60)+seconds)/60))*10)/10;

         let blueTeam= [];
         let redTeam= [];
         for(let i=0; i<5; i++){
            const info = result.info.participants;
            blueTeam.push({championName : info[i].championName, summonerName : info[i].summonerName, puuid : info[i].puuid});
         }
         for(let i=5; i<10; i++){
            const info = result.info.participants;
            redTeam.push({championName : (info[i].championName === 'FiddleSticks' ? 'Fiddlesticks' : info[i].championName), summonerName : info[i].summonerName, puuid : info[i].puuid});
         }


         const multiKillresult = [userInformation.pentaKills,userInformation.quadraKills,userInformation.tripleKills,userInformation.doubleKills];
         const multiKillType = ['펜타킬','쿼드라킬','트리플킬','더블킬'];

         let multiKill ='';

         for(let i=0; i<multiKillresult.length; i++){
            if(multiKillresult[i] !== 0) {
               multiKill = multiKillType[i];
               i = multiKillresult.length;
            }else{
               multiKill = null;
            }
         }
         

         if (userInformation) {
            setUser({
               teamId : teamId,
               gameType : gameType.name,
               gamePlayTime :{
                  hours : hours,
                  minutes : minutes,
                  seconds : seconds,
               },
               endGameStamp : {
                  days : endGameDays,
                  hours : endGameHours,
                  minutes : endGameMinutes,
                  seconds : endGameSeconds,
               },
               gameEndTime : {
                  days : date.getTime() - result.info.gameEndTimestamp,
               },
               puuid: userInformation.puuid,
               item: [
                  userInformation.item0,
                  userInformation.item1,
                  userInformation.item2,
                  userInformation.item3,
                  userInformation.item4,
                  userInformation.item5,
                  userInformation.item6
               ],
               kda : {
                  kills : userInformation.kills,
                  deaths : userInformation.deaths,
                  assists : userInformation.assists,
                  kda : Math.round(userInformation.challenges.kda * 100)/100,
                  killPer : killPersent
               },
               wardsKilled : userInformation.visionWardsBoughtInGame,
               champion: userInformation.championName,
               spell: [
                  userInformation.summoner1Id, userInformation.summoner2Id
               ],
               rune,
               cs,
               minutePerMinion,
               isWin: userInformation.win,
               blueTeam,
               redTeam,
               multiKill
            });
         }
      })
   },[APIs, match, puuid])
   const setRuneImages = (mainRune, subRune) => {
      const SUB_RUNE_URL = "https://ddragon.canisback.com/img";

      const mainRuneStyle = runes.find(rune => rune.id === mainRune.style);
      const mainRuneImage = mainRuneStyle.slots[0].runes.find(item => item.id === mainRune.selections[0].perk).icon;
      
      const subRuneStyle = runes.find(rune => rune.id === subRune.style);
      const subRuneImage = `${SUB_RUNE_URL}/${subRuneStyle.icon}`;
      return [mainRuneImage, subRuneImage];
   }
   return (
      <>
      {user&&<li data-type={user.gameType}>
         {user.gameType&&<div id='item' className={`${styles.container} ${user.gamePlayTime.minutes < 4? styles.redo :  user.isWin ? styles.win : styles.lose}`}>
            <div className={styles.game}>
               <div className={styles.gameType}>{user.gameType}</div>
               <div className={styles.endGameStamp}>{`${user.endGameStamp.days === 0 ? `${user.endGameStamp.hours < 1 ? `${user.endGameStamp.minutes}분 전` : `${user.endGameStamp.hours}시간 전`}`: `${user.endGameStamp.days}일 전`}`}</div>
               <div className={styles.bar}>{}</div>
               <div className={styles.gameResult}>{user.gamePlayTime.minutes < 4? "다시하기": `${user.isWin ? "승리" : "패배"}`}</div>
               <div className={styles.playPlayTime}>{user.gamePlayTime.hours === 0? `${user.gamePlayTime.minutes}분 ${user.gamePlayTime.seconds}초`:`${user.gamePlayTime.hours}시간`}</div>
            </div>
            <div className={styles.info}>
               {<div className={styles.infoDetail}>
                  <img src={`https://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/${user.champion}.png`} className={styles.championImg} alt="" />
                  <div className={styles.spell}>
                     <img src={`/images/spell/${user.spell[0]}.png`}  className={styles.spellImg} alt="" />
                     <img src={`/images/spell/${user.spell[1]}.png`}  className={styles.spellImg} alt="" />
                  </div>
                     <div className={styles.rune}>
                        {user.rune[0] && <img src={`https://ddragon.canisback.com/img/${user.rune[0]}`} alt="" className={styles.runeImg}/>}
                        {user.rune[1] && <img src={user.rune[1]} alt="" className={styles.runeImg2}/>}
                     </div>
                  <div className={styles.gameStats}>
                     <div className={styles.kdaDetail}>
                        <span className={styles.kills}>{user.kda.kills}</span>
                        <span className={styles.deaths}>{user.kda.deaths}</span>
                        <span className={styles.assists}>{user.kda.assists}</span>
                     </div>
                     <span className={styles.kda}>{user.kda.kda.toFixed(2)}:1</span>
                  </div>
                  <div className={styles.stats}>
                     <div className={styles}></div>
                     <div className={styles}></div>
                     <div className={styles}></div>
                  </div>
                  <div className={styles.otherInfo}>
                     {console.log(user.kda.killPer)}
                     <div className={styles.persentKill}>킬관여 {isNaN(user.kda.killPer) ? '0' : user.kda.killPer}%</div>
                     <div className={styles.ward}>제어 와드 {user.wardsKilled}</div>
                     <div className={styles.cs}>CS {user.cs} ({user.minutePerMinion})</div>
                     <div className={styles.multiKill}>
                        {user.multiKill === null ? '' :<div className={styles.multiKillItem}>{user.multiKill}</div>}
                     </div>
                  </div>
               </div>}
               <div className={styles.item}>
                  {user.item[0] === 0? <div className={styles.itemNone} /> : <img src={`https://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${user.item[0]}.png`} className={styles.itemImg} alt="item0" />}
                  {user.item[1] === 0? <div className={styles.itemNone} /> : <img src={`https://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${user.item[1]}.png`} className={styles.itemImg} alt="item1" />}
                  {user.item[2] === 0? <div className={styles.itemNone} /> : <img src={`https://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${user.item[2]}.png`} className={styles.itemImg} alt="item2" />}
                  {user.item[3] === 0? <div className={styles.itemNone} /> : <img src={`https://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${user.item[3]}.png`} className={styles.itemImg} alt="item3" />}
                  {user.item[4] === 0? <div className={styles.itemNone} /> : <img src={`https://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${user.item[4]}.png`} className={styles.itemImg} alt="item4" />}
                  {user.item[5] === 0? <div className={styles.itemNone} /> : <img src={`https://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${user.item[5]}.png`} className={styles.itemImg} alt="item5" />}
                  {user.item[6] === 0? <div className={`${styles.itemNone} ${styles.trinket}`} /> : <img src={`https://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${user.item[6]}.png`} className={styles.trinket} alt="item6" />}
               </div>
            </div>
            <div className={styles.summonerList}>
               <div className={styles.blueTeamList}>
                  {user.blueTeam.map(user =>{
                     return <div key={user.puuid} className={styles.summonerItem}> 
                        <img className={styles.listImg} src={`https://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/${user.championName}.png`} alt="" />
                        <button 
                           className={styles.button}
                           onClick={() => window.open(`http://localhost:3000/search/${user.summonerName}` ,'_blank')}
                        >  
                           {user.summonerName}
                        </button>
                  </div>
                  })}
               </div>
               <div className={styles.redTeamList}>
                  {user.redTeam.map(user =>{
                     return <div key={user.puuid} className={styles.summonerItem}> 
                        <img className={styles.listImg} src={`https://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/${user.championName}.png`} alt="" />
                        <button 
                           className={styles.button}
                           onClick={() => window.open(`http://localhost:3000/search/${user.summonerName}` ,'_blank')}
                        >  
                           {user.summonerName}
                        </button>
                  </div>
                  })}
               </div>
            </div>
         </div>}
      </li>}
   </>
   );
}

