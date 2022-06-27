import React from "react";

export const MusicContext = React.createContext({
    progress:0,
    updateProgress:  ()=>{},
    volume: .5,
    updateVolume: ()=>{},
    playing:{playing:false,music:null,audio:null},
    setPlaying:()=>{},
    paused:null,
    setPaused:()=>{}
})