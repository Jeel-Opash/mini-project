import { useEffect, useState, useTransition } from "react";
import { useParams } from "react-router-dom"
import { getCountryIndData } from "../../api/postApi";

export const CountryDetails=()=>{
    const params=useParams();
        const[isPending,startTransition]=useTransition();
        const [country, setCountry] = useState();
    
    
    
        useEffect(()=>{
            startTransition(async()=>{
                const res=await getCountryIndData(params.id);
                if(res.status===200){
                    setCountry(res.data[0]);
                }

                console.log(Object.keys(res.data[0].name.nativeName));
                
            });
        },[]);
        if(isPending) return<h1>Loading...</h1>
       return (
        <section className="card country-details-card container">
            <div className="container-card bg-white-box">
               <div className="country-image grid grid-two-cols">
                <img src={country.flags.svg} alt="country.flags.alt" 
                className="flag"/>
                {/* <div className="country-content">
                    <p className="card-title">{country.name.official}</p>
                    <div className="infoContainer">
                        <p>
                            <span className="card-description">Native Names:</span>
                            {Object.keys(country.name.nativeName)
                            .map((key)=>country.name.nativeName[key].common).join(",")}
                        </p>
                        <p>
                        <span className="card-description">Population:</span>
                        {country.population.toLocaleString()}</p>
                    </div>
                </div> */}
               </div>
            </div>
        </section>
       )
}