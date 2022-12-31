class lol_APIs {
   #key;

   constructor(key) {
      this.#key = key;
   }

   #getHeader() {
      return {
         method: 'GET',
         redirect: 'follow'
      }
   }

   //계정 검색용
   async search(query) {
      const response = await fetch(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${query}?api_key=${this.#key}`, this.#getHeader());
      return await response.json();
   }


   //랭크 , 점수등 여러가지 정보
   async summonerLeague(id){
      try {
         const response = await fetch(`https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${this.#key}`, this.#getHeader());
         return await response.json();
      } catch (error) {
         console.error("[summonerLeague] error : ", error);
      }
   }


   //해당 아이디의 matchList
   async matchList(puuid, start, count){
      try {
         const response = await fetch(`https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${start}&count=${count}&api_key=${this.#key}`, this.#getHeader());
         return await response.json();
      } catch (error) {
         console.error("[matchList] error : ", error);
      }
   }

   //matchID에 해당하는 게임 정보
   async matchResult(matchId){
      try {
         const response = await fetch(`https://asia.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${this.#key}`, this.#getHeader());
         return await response.json();
      } catch (error) {
         console.error("[matchResult] error : ", error);
      }
   }

   //룬 정보
   async summonerRune(){
      try {
         const response = await fetch("http://ddragon.leagueoflegends.com/cdn/12.22.1/data/ko_KR/runesReforged.json", this.#getHeader());
         return await response.json();
      } catch (error) {
         console.error("[summonerRune] error : ", error);
      }
   }
}

export default lol_APIs;
