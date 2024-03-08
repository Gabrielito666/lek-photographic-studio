import React, { useEffect, useState } from "react";
import { Image, settings } from "./image";


const screenStyleDefault =
{
    overflow: 'hidden',
    border: 'solid black 3px',
    position: 'absolute'
};

const PreviewScreen = _ => 
{
    const [ scale, setScale ] = useState(1);
    const [ view, setView ] = useState(false);
    const { width=0, height=0 } = settings.dimensions;

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
    }, [settings]);

    const screenStyle =
    {
        width : width + 'px',
        height : height + 'px',
        transform : `scale(${scale})`,
        ...screenStyleDefault
    };

    return view && <div style={screenStyle}><Image/></div>
}
export default PreviewScreen;