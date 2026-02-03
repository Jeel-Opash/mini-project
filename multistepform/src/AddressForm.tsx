import { FormWrapper } from "./FromWrapper";

export function AddressForm(){
return(
    <>
    <FormWrapper title="Address Information">
    <label>Street</label>
        <input autoFocus required type="text"/>
        <label>City</label>
        <input required type="text"/>
         <label>State</label>
        <input required type="text"/>
        <label>Zip Code</label>
        <input required  type="number"/>
    </FormWrapper>
    </>
)

}