import * as React from "react"
import ReactGA from "react-ga"

export function useAnalytics(){
 const [ initialized, setInitialized] = React.useState(false)

 /*React.useEffect(()=>{

    if (window.location.href.includes('localhost')){
        ReactGA.initialize('G-XTQCE7S8BR')
    }

    setInitialized(true);
 },[])
 return{
    initialized
 }*/
}