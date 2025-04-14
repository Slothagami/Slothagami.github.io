import "./PageCard.css"

interface Props {
    image: string,
    title: string,
    link: string
}

function PageCard({image, title, link}: Props) {
    return (
        <div className="page-card" style={{backgroundImage:`url(${image})`}}>
            <h1 className="page-card-title"> {title} </h1>
        </div>
    )
}

export default PageCard
