import { ReactNode } from "react"
import Title from "../Title"

interface Props {
    name: string,
    children: ReactNode
}

function Article({name, children}: Props) {
    return (
        <>
            <Title size="4rem"> {name} </Title>
            {children}
        </>
    )
}

export default Article
