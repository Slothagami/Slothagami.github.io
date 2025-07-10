import DemoListItem from "../DemoListItem"
import Icon from "../Icon/Icon"
import Title from "../Title/Title"
import "./Homepage.css"

function Homepage() {
    return (
        <>
            <div id="page-top-content" className="screen-size">
                <Title size="6vw"> Slothagami </Title>
                <img src="/img/logo.png" alt="logo" id="big-logo" />
                <Icon icon="/icons/downarrow.svg" size="3rem" />
            </div>

            <div id="demolist-block" className="screen-size">
                <div id="demolist">
                    <DemoListItem parent_id="demolist-block" background="/img/mandelbrot.png" link="#"> Mandelbrot Set </DemoListItem>
                    <DemoListItem parent_id="demolist-block" background="/img/mandelbulb.png" link="#"> Mandelbulb </DemoListItem>
                    <DemoListItem parent_id="demolist-block" background="/img/fourier.png" link="#"> Fourier Drawing </DemoListItem>
                    <DemoListItem parent_id="demolist-block" background="/img/cube.png" link="#"> 9D Rendering </DemoListItem>
                </div>
            </div>
        </>
    )
}

export default Homepage
