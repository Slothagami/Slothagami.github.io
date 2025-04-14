import Icon from "../Icon"
import Title from "../Title"
import "./home.css"

function Homepage() {
    return (
        <>
            <div id="page-top-content" className="screen-size">
                <Title size="6rem"> Slothagami </Title>
                <img src="/img/logo.png" alt="logo" id="big-logo" />
                <Icon icon="/icons/downarrow.svg" size="3rem" />
            </div>

            <div id="demolist" className="screen-size">

            </div>
        </>
    )
}

export default Homepage
