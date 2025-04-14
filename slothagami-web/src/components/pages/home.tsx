import Title from "../Title"
import Article from "./article"
import "./home.css"

function Homepage() {
    return (
        <Article name="Slothagami">
            <Title icon="/icons/git.svg"><a href="https://github.com/Slothagami">Github</a></Title>
        </Article>
    )
}

export default Homepage
