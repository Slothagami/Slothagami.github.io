import CardList from "../CardList/CardList"
import ImageCard from "../ImageCard/ImageCard"

function ProjectsTab() {
    return (
        <CardList>
            <ImageCard link="/" image="./img/mandelbulb.png">Mandelbulb</ImageCard>
            <ImageCard link="/" image="./img/fourier.png">Fourier Drawing</ImageCard>
            <ImageCard link="/" image="./img/mandelbrot.png">Mandelbrot Set</ImageCard>
            <ImageCard link="/" image="./img/mnist.png">Neural Network</ImageCard>
        </CardList>
    )
}

export default ProjectsTab
