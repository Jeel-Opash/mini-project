import { FormWrapper } from "./FromWrapper";


export function AccountForm(){
    return(
        <>
        <FormWrapper title="AccountForm ">
        <label>Email</label>
        <input autoFocus required type="email"/>
        <label>Password</label>
        <input required type="password"/>
        </FormWrapper>
        </>
    );
};