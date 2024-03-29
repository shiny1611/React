import React, { useEffect, useState } from "react";
const useWindowSize=()=>{

    let [windowSize,setwindowSize]=useState({
        height:undefined,
        width:undefined
})
useEffect(()=>{
    function resize(){
        setwindowSize({
            height:window.innerHeight,
            width:window.innerWidth
        })
    }
    resize()
    window.addEventListener('resize',resize)
},[])


    return(
       windowSize
    )
}
export default useWindowSize