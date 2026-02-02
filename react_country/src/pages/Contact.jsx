export const Contact=()=>{
    const handleFormSubmit=(formData)=>{
        console.log(formData.entries());
        const fromInputData = Object.fromEntries(formData.entries());
        console.log(fromInputData);
    }
    return(
        <section className="section-contact">
            <h2 className="container-title">Contact Us</h2>
            <div className="container-wrapper container">
            <form action={handleFormSubmit}>
                <input type="text" className="form-control" required autoComplete="false"
                placeholder="Enter your name"
                name="username"/>
                <input type="email" className="form-control" required autoComplete="false"
                placeholder="Enter your email"
                name="email"/>
                <textarea type="message" className="form-control" required autoComplete="false"
                placeholder="Enter your message"
                name="message"/>
                <button type="submit" value="send">Send</button>
            </form>
            </div>
        </section>
    )
}