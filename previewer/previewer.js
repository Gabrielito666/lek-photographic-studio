import React, { useState, useEffect } from "react";
import Image from "../../../image";
const PreviewScreen = () => {
    const [ scale, setScale ] = useState(1);
    const [ view, setView ] = useState(false);

    const { children, width, height, className } = Image().props;

    useEffect(() => {
        const scale = Math.min(
            ...(
                [
                    { screenDim : window.innerWidth, userDim : width },
                    { screenDim : window.innerHeight, userDim : height }
                ]
                .map(({ screenDim, userDim }) => (screenDim * 0.8 / userDim ))
            )
        );
        setScale(scale);
        setView(true)
    }, [width, height]);

    const screenStyle =
    {
        width : width + 'px',
        height : height + 'px',
        transform : `scale(${scale})`,
    };

    return view ? <div className={ className } style = { screenStyle }>{ children }</div> : null;
};
export default PreviewScreen;

