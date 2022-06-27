import {createContext} from "react";

export const DataContext = createContext({
    musics:[],
    setMusics:()=>{},
    slider:[],
    setSlider:()=>{}
})