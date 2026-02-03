import { useState, type ReactElement } from "react";

export function useMultistepForm(steps:ReactElement[]){
    const[currentStepIndex,setCurrentStepIndex]=useState(0);

    function next(){
setCurrentStepIndex(i=>{
    if(i>steps.length-1)return i;
    return i+1;
})
    }
    function back(){
        setCurrentStepIndex(i=>{
            if(i<=0)return i;
            return i-1;
        })
    }
    function goto(index:number){
        setCurrentStepIndex(index);
    
}

return{
    currentStepIndex,
    step:steps[currentStepIndex],
    goto,
    next,back,Firststep:currentStepIndex===0,
    isLaststep:currentStepIndex===steps.length-1,
}
}