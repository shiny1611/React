import { Children,createContext } from "react";
import useWindowSize from "../hook/useWindowSize";

let DataContext=createContext({})

export let DataProvider=({children})=>{
    let {width} = useWindowSize()
 return(<DataContext.Provider
    value={{width}}>
        {children}
    </DataContext.Provider>)
}
export default DataContext