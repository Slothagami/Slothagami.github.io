import Icon from "../Icon"
import Title from "../Title"
import "./home.css"

function Homepage() {
    return (
        <div id="content">
            <Title size="4rem"> Slothagami </Title>
            <img src="/img/logo.png" alt="logo" id="big-logo" />
            <Title icon="/icons/git.svg"><a href="https://github.com/Slothagami">Github</a></Title>

            <div style={{fontSize: "3rem"}}>
                <Icon icon="/icons/downarrow.svg" />
            </div>
        </div>
    )
}

export default Homepage
