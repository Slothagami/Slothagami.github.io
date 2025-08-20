import { ReactNode } from "react"
import "./CardList.css"

interface Props {
    children: ReactNode
}

function CardList({children}: Props) {
    return (
        <div className="card-list">
            { children }
        </div>
    )
}

export default CardList
