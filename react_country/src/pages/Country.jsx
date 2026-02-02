import { useEffect, useState, useTransition } from "react"
import { getCountryData } from "../api/postApi";
import { CountryCard } from "../components/Layout/CountryCard";

export const Country=()=>{
    const[isPending,startTransition]=useTransition();
    const [countries, setCountries] = useState([]);



    useEffect(()=>{
        startTransition(async()=>{
            const res=await getCountryData();
            setCountries(res.data);
        });
    },[]);
    if(isPending)return<h1>Loading...</h1>
    return(
        <section className="country-section">
            <ul className="grid grid-four-cols">{
countries.map((country,index)=>{
    return<CountryCard country={country} key={index}/>
})
}</ul>
        </section>
    )
}