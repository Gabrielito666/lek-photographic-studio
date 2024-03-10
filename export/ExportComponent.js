import React from "react";
import Image from "../../image";
const ExportComponent = () => {
    const { width, height, children, className, exports } = Image().props;
    const styles = { width, height }
    return <div style={ styles } className={ className }>{ children }</div>;
};
export default ExportComponent;