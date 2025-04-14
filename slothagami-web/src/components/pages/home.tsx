import PageCard from "../PageCard"
import Title from "../Title"
import Article from "./article"
import "./home.css"

function Homepage() {
    return (
        <Article name="Slothagami">
            <Title icon="/icons/git.svg"><a href="https://github.com/Slothagami">Github</a></Title>


            <div className="card-shelf">
                <PageCard image="/img/mandelbrot.png" title="Mandelbrot Set" link="" />
                <PageCard image="/img/mandelbulb.png" title="Mandelbulb" link="" />
                <PageCard image="/img/fourier.png" title="Fourier Drawing" link="" />
                <PageCard image="/img/hypercube.png" title="Hypercubes" link="" />
            </div>
        </Article>
    )
}

export default Homepage
