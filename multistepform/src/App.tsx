import { AddressForm } from "./AddressForm";
import { useMultistepForm } from "./multistepform";
import { UserForm } from "./UserForm";
import { useState, type FormEvent } from "react";
import { AccountForm } from "./AccountForm";
function App(){


type FormData ={
  firstname:string;
  lastname:string;
  age:string;
  street:string;
  city:string;
  state:string;
  zip:string;
  email:string;
  password:string;
}

  const INITIAL_DATA:FormData={
  firstname:"",
  lastname:"",
  age:"",
  street:"",
  city:"",
  state:"",
  zip:"",
  email:"",
  password:""

  }
  const[data,setData]=useState(INITIAL_DATA);
  function updateFields(fields:Partial<FormData>){
    setData(prev =>({...prev,...fields}))
  }

  const { steps , currentStepIndex, step ,isFirstStep,back
    ,next,isLaststep,goto } 
  = useMultistepForm([
   <UserForm {...data} updateFields={updateFields}/>,
   <AddressForm {...data} updateFields={updateFields}/>,
   <AccountForm {...data} updateFields={updateFields} />]);
  

function onSubmit(e:FormEvent){
  e.preventDefault();
  if(!isLaststep) {return next();}
  alert("Account Created Successfully");
  setData(INITIAL_DATA);
  goto(0);
}

  return (
    <div style={{
      position:"relative",
      background:"white",
      border:"1px solid black",
      padding:"2rem",
      margin:"2rem",
      borderRadius:"0.5rem",
      fontFamily:"Arial",
      justifyContent:"center",
      display:"flex",
      alignItems:"center",
      maxWidth:"max-content",
      
    }}>
      <form onSubmit={onSubmit}>
        <div style={{position:"absolute",top:".5rem",right:".5rem"}}>
          {currentStepIndex +1}/{steps.length}</div>
          {step}
          <div style={{ marginTop:"1rem",display:"flex",
            gap:".5rem",
            justifyContent:"flex-end",
          }}>
            {!isFirstStep && <button type="button" onClick={back}>Back</button>}
            <button type="submit">{isLaststep ? "Finish":"Next"}</button>
          </div>
      </form>
    </div>
  )
}
export default App;