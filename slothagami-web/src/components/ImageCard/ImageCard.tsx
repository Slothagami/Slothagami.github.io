import "./ImageCard.css"
import Title from "../Title/Title"
import { ReactNode } from "react"

interface Props {
    children: ReactNode,
    icon?: string,
    link: string,
    image: string
}

function ImageCard({children, icon, link, image}: Props) {
    return (
        <div className="image-card" style={{backgroundImage: `url("${image}")`}}>
            <div className="card-text">
                <Title icon={icon} size="1em">{children}</Title>
            </div>
        </div>
    )
}

export default ImageCard
