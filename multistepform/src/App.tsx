import { AddressForm } from "./AddressForm";
import { useMultistepForm } from "./multistepform";
import { UserForm } from "./UserForm";
import { AccountForm } from "./AccountForm";
import { useState } from "react";
function App(){
type FormData ={
  firstname:string;
  lastname:string;
  age:string;
  street:string;
  city:string;
  state:string;
  zip:"",
  email:"",
  password:""
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

  const { steps = [2], currentStepIndex, step ,Firststep,back
    ,next,isLaststep } 
  = useMultistepForm([
   <UserForm/>,<AddressForm/>,<AccountForm/>]);
  
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
      
    }}>
      <form>
        <div style={{position:"absolute",top:".5rem",right:".5rem"}}>
          {currentStepIndex +1}/{steps.length}</div>
          {step}
          <div style={{ marginTop:"1rem",display:"flex",
            gap:".5rem",
            justifyContent:"flex-end",
          }}>
            {!Firststep && <button onClick={back}>Back</button>}
            <button onClick={next}>{isLaststep ? "Finish":"Next"}</button>
          </div>
      </form>
    </div>
  )
}
export default App;