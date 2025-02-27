import { ReactNode } from "react"
import "./common.css"
import Icon from "./Icon"

interface LinkProps {
    children: ReactNode,
    icon?: string,
    size?: string,
    id?:   string,
    onClick?: () => void
}

function Title({ children, icon, size, id, onClick }: LinkProps) {
    return (
        <div className="title-box" style={{fontSize: size}} id={id} onClick={onClick}>
            {icon && <Icon icon={icon} />}
            <div style={{fontSize: size}} className="title-content">{children}</div>
        </div>
    )
}

export default Title
