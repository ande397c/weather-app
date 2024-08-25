import "./compass.css"
export const Compass = ({ windDirection = 240 }) => {
 return (
  <div className="compass">
   {/* Compass SVG */}
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 331 331">
    <g fill="none" fillRule="evenodd" opacity=".401">
     <path fill="#000" d="M11.5 0 23 23H0z" transform="translate(154 31)"></path>
     <path stroke="#000" strokeLinecap="square" strokeLinejoin="bevel" strokeWidth="2" d="m11.421 250 .158 17.999" transform="translate(154 31)"></path>
     {/* Additional paths omitted for brevity */}
     <g fill="#000" fontFamily="Arial-BoldMT, Arial" fontSize="36" fontWeight="bold">
      <text transform="translate(60 60)">
       <tspan x="92.501" y="33">
        N
       </tspan>
      </text>
      <text transform="translate(60 60)">
       <tspan x="178.494" y="118">
        E
       </tspan>
      </text>
      <text transform="translate(60 60)">
       <tspan x="93.494" y="203">
        S
       </tspan>
      </text>
      <text transform="translate(60 60)">
       <tspan x="3.511" y="118">
        W
       </tspan>
      </text>
     </g>
    </g>
   </svg>

   {/* Arrow SVG with dynamic rotation */}
   <svg
    id="arrowSVG"
    style={{
     willChange: "transform",
     transform: `rotate(${windDirection}deg)`,
    }}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 331 331"
   >
    <path d="M163 103V57.785c-6.817-1.185-12-7.13-12-14.285 0-8.008 6.492-14.5 14.5-14.5S180 35.492 180 43.5c0 7.155-5.183 13.1-12 14.285V103h-5zm2.5-50a9.5 9.5 0 1 0 0-19 9.5 9.5 0 0 0 0 19zm0 250L151 274h12v-47h5l-.001 47H180l-14.5 29z"></path>
   </svg>

   {/* Wind speed display */}
   <div className="compass-content">
    <span>W</span>
    {/* <span className="unit">km/h</span> */}
   </div>
  </div>
 );
};
