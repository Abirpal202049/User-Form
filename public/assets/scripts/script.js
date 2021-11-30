const root = document.querySelector("#root")


const News = (props) =>{
    // destructuring
    let {name , college, branch, id} = props;
    // let url = `/v1/user/${id}`
    return (
        <>
            <div className="all-student">
                <div className="stusent-name">
                    <h3>{college}</h3>
                </div>
                <div className="news-content">
                    <h2>{name}</h2>
                </div>
                <div className="news-author">
                    <h4>{branch}</h4>
                </div>
                <div className="aling-button">
                    <form action={`/v1/user/${id}`} method="POST">
                        <button type="submit" class="btn btn-danger">Delete</button>
                    </form>
                    <form action={`/v1/user/update/${id}`} method="GET">
                        <button type="submit" class="btn btn-primary">Update</button>
                    </form>
                </div>
            </div>
        </>
    );
};


const Mainnews = ()=>{
    const [articles, setArticles] = React.useState([])

    

    const fetchData = async () =>{
        const url = `http://localhost:3000/v1/userslist`
        let data = await fetch(url)
        let parsedData = await data.json()
        console.log(parsedData);
        setArticles(parsedData)
    }
    fetchData()

    return(
        <>
            {articles.map((element,numbers) => {
                return <News key={numbers} id={element._id} name={element.name} college = {element.college} branch = {element.branch} />
                
            })}
        </>
    )
}


ReactDOM.render(
    <> 
        <Mainnews/>
    </>, 
    root
);
