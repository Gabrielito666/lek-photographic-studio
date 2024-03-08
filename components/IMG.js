import React from "react";

const fillStyle = { width : '100%', height : '100%' }

const IMG = ({ children, className, fill=false }) =>
<img src={ children } className={ className } style={ fill ? fillStyle : {} }/>;
export default IMG;