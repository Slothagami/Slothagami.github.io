import { ReactNode, useState } from "react"
import "./Sidebar.css"
import Title from "./Title"

interface Props {
    children: ReactNode
}

function Sidebar({ children }: Props) {
    const [closed, setClosed] = useState(false)

    return (
        <div className={"sidebar " + (closed? "closed": "")} onClick={() => setClosed(!closed)}>
            <Title icon="/img/logo.png" size="2rem" id="site-title"> Slothagami </Title>
            <div className="sidebar-content">
                {children}
            </div>
        </div>
    )
}

export default Sidebar
