import React from "react";
import { SNOW_COLOR } from "../../types/snow_type.js"

function Snowflake(props) {
   const folderName = props.color === SNOW_COLOR.BLUE ? "" : 2;
   console.log('reRender')
   return (
      <div className="Snowflake" style={props.style}>
         <img src={`/images/snow${folderName}/snow${props.type}.png`} alt="" />
      </div>
   );
}

export default React.memo(Snowflake)
