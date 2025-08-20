import "./ImageCard.css"
import Title from "../Title/Title"
import { ReactNode } from "react"

interface Props {
    children: ReactNode,
    title: string,
    icon?: string,
    link: string,
    image: string
}

function ImageCard({children, title, icon, link, image}: Props) {
    return (
        <div className="image-card">
            <a href={link}>
                    <img src={image} />
                    <div className="card-text">
                        <Title icon={icon} size="1em">{title}</Title>
                        <p>{ children }</p>
                    </div>
            </a>
        </div>
    )
}

export default ImageCard
