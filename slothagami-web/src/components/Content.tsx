import { ReactNode } from "react"
import "./Content.css"

interface Props {
    children: ReactNode
}

function Content({ children }: Props) {
    return (
        <div id="content">
            {children}
        </div>
    )
}

export default Content
