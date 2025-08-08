import CardList from "../CardList/CardList"
import ImageCard from "../ImageCard/ImageCard"

function InteractiveTab() {
    return (
        <CardList>
            <ImageCard link="/" image="./img/mandelbulb.png">Mandelbulb</ImageCard>
            <ImageCard link="/" image="./img/fourier.png">Fourier Drawing</ImageCard>
            <ImageCard link="/" image="./img/mandelbrot.png">Mandelbrot Set</ImageCard>
        </CardList>
    )
}

export default InteractiveTab
