import { ReactNode, useState } from "react"
import "./Sidebar.css"
import Title from "./Title"

interface Props {
    children: ReactNode
}

function Sidebar({ children }: Props) {
    var [ sidebarOpen, setSidebarOpen ] = useState(true)

    return (
        <div className={"sidebar " + (sidebarOpen? "": "closed")}>
            <Title 
                icon="/img/logo.png" 
                size="2rem" 
                id="site-title"
                onClick={() => setSidebarOpen(!sidebarOpen)}
            > Slothagami </Title>
            <div className="sidebar-content">
                {children}
            </div>
        </div>
    )
}

export default Sidebar
