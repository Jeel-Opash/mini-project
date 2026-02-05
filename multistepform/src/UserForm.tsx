import { FormWrapper } from "./FromWrapper"

type UserData={
    firstname:string
    lastname:string
    age:string
}

type UserFormProps=UserData &{
    updateFields:(fields:Partial<UserData>)=>void
}

export function UserForm({firstname,lastname,age,updateFields}:UserFormProps){
    return(
        <>
        <FormWrapper title="User Information">
        <label>First Name</label>
        <input autoFocus required type="text" value={firstname}
        onChange={e => updateFields({firstname:e.target.value})}/>
        <label>Last Name</label>
        <input required type="text" value={lastname}
        onChange={e => updateFields({lastname:e.target.value})}/>
        <label>Age</label>
        <input required min={1} type="number" value={age}
        onChange={e => updateFields({age:e.target.value})}/>
        </FormWrapper>
        </>
    )
}