export const SerachFilter=({search,setSearch,filter,setFilter})=>{

    const handleInputChange=(e)=>{
        e.preventDefault();
        setSearch(e.target.value);
    }

    const handleSelectChange=(e)=>{
        e.preventDefault();
setFilter(e.target.value);
    }
    return (
        <section className="section-searchFilter container">
            <input type="text" placeholder="search" value={search}
            onChange={handleInputChange}/>

        <div>
            <select className="select-section" value={filter}
            onChange={handleSelectChange}>
                <option value="All">All</option>
                <option value="Africa">Africa</option>
                <option value="Americas">Americas</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
            </select>
        </div>

        </section>
    )
}