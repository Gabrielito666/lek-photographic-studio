import React from "react";
import React, { useEffect, useState } from "react";

const Screen = ({ className, exports='default', children, width=0, height=0 }) => {

    const [ scale, setScale ] = useState(1);
    const [ view, setView ] = useState(false);

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

    return view ? <div className={ className } styles = { screenStyle }>{ children }</div> : null;
};
export default Screen;