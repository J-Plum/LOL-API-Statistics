import Snowflake from "./Snowflake";
import './Snow.css'

export const makeSnowflake = (color) => {
   let arr = Array(400).fill().map(e => e);
   let type = 1;

   return arr.map((e,i)=>{
      if (type > 6) type = 1;
      let delay = Math.random() * 20;
      let randomOpactiy = Math.random();
      let style = {
         left : `${Math.random() * window.screen.width-25}px`,
         animationDelay : `${delay}s`,
         opacity : randomOpactiy
      }

      return (
         <Snowflake key={i} style={style} type={type++} color={color}/>
      );
   });
}