import CardList from "../CardList/CardList"
import ImageCard from "../ImageCard/ImageCard"

function ProjectsTab() {
    return (
        <CardList>
            <ImageCard link="/" image="./img/mandelbulb.png" title="Mandelbulb">
                Explore the mesmorizing 3D version of the Mandelbrot set.
            </ImageCard>
            <ImageCard link="/" image="./img/fourier.png" title="Fourier Drawing">
                Draw a picture and watch it be traced out by spinning mechanical arms.
            </ImageCard>
            <ImageCard link="/" image="./img/mandelbrot.png" title="Mandelbrot Set">
                Explore the beautiful mandelbrot set and related julia sets.
            </ImageCard>
            <ImageCard link="/" image="./img/mnist.jpg" title="Neural Network">
                An AI implimented from scratch in python.
            </ImageCard>
        </CardList>
    )
}

export default ProjectsTab
