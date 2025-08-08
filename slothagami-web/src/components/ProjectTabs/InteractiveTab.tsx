import CardList from "../CardList/CardList"
import ImageCard from "../ImageCard/ImageCard"

function InteractiveTab() {
    return (
        <CardList>
            <ImageCard link="/" image="/">Mandelbulb</ImageCard>
            <ImageCard link="/" image="/">Fourier Drawing</ImageCard>
            <ImageCard link="/" image="/">Mandelbrot Set</ImageCard>
        </CardList>
    )
}

export default InteractiveTab
