import { ReactNode } from "react"
import "./common.css"
import Icon from "./Icon"

interface LinkProps {
    children: ReactNode,
    icon?: string,
    size?: string,
    id?:   string
}

function Title({ children, icon, size, id }: LinkProps) {
    return (
        <div className="title-box" style={{fontSize: size}} id={id}>
            {icon && <Icon icon={icon} />}
            <div style={{fontSize: size}} className="title-content">{children}</div>
        </div>
    )
}

export default Title
