import { ReactNode } from "react"
import "./Title.css"
import Icon from "../Icon/Icon"

interface LinkProps {
    children: ReactNode,
    icon?: string,
    size?: string,
    id?:   string,
    onClick?: () => void
}

function Title({ children, icon, size, id, onClick }: LinkProps) {
    let fontSize = size || "2em"

    return (
        <div className="title-box" style={{fontSize: fontSize}} id={id} onClick={onClick}>
            {icon && <Icon icon={icon} />}
            <div style={{fontSize: fontSize}} className="title-content">{children}</div>
        </div>
    )
}

export default Title
