import { useEffect, useState, useTransition } from "react"
import { getCountryData } from "../api/postApi";
import { CountryCard } from "../components/Layout/CountryCard";
import { SerachFilter } from "../components/UI/SerachFilter";

export const Country=()=>{
    const[isPending,startTransition]=useTransition();
    const [countries, setCountries] = useState([]);

    const[search,setsearch]=useState();
    const[filter,setfilter]=useState("all");

    console.log(search,filter);

    const searchCountry=(country)=>{
        if(search){
            return country.name.common.toLowerCase().includes(search.toLowerCase());
        }
        return country;
    }
    const filterRegion=(country)=>{
     if(filter==="all")return country;
     return country.region===filter;
    }

   const filteredCountries=countries.filter((country)=>searchCountry(country)&&filterRegion(country));

    useEffect(()=>{
        startTransition(async()=>{
            const res=await getCountryData();
            setCountries(res.data);
        });
    },[]);
    if(isPending)return<h1>Loading...</h1>
    return(
        <section className="country-section">

        <SerachFilter search={search} setSearch={setsearch} filter={filter} setFilter={setfilter}/>

            <ul className="grid grid-four-cols">{
filteredCountries.map((country,index)=>{
    return<CountryCard country={country} key={index}/>
})
}</ul>
        </section>
    )
}