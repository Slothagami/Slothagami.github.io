import CardList from "../CardList/CardList"
import ImageCard from "../ImageCard/ImageCard"

function ProjectsTab() {
    return (
        <CardList>
            <ImageCard link="/mandelbulb" image="./img/mandelbulb.png" title="Mandelbulb">
                Explore the mesmorizing 3D version of the Mandelbrot set.
            </ImageCard>

            <ImageCard link="./old/interactive/fourier-series.html" image="./img/fourier.png" title="Fourier Drawing">
                Draw a picture and watch it be traced out by spinning mechanical arms.
            </ImageCard>

            <ImageCard link="./old/interactive/mandelbrot.html" image="./img/mandelbrot.png" title="Mandelbrot Set">
                Explore the beautiful mandelbrot set and related julia sets.
            </ImageCard>

            <ImageCard link="https://github.com/Slothagami/neural-network-remake" image="./img/mnist.jpg" title="Neural Network">
                An AI built from scratch in python.
            </ImageCard>

            {/* <ImageCard link="https://github.com/Slothagami/drawing-gallery/tree/main" image="./img/robot.png" title="Image Gallery">
                A Full stack image sharing website built with React.js and Flask.
            </ImageCard> */}
            <ImageCard link="https://github.com/Slothagami/robot-soccer" image="./img/robot.png" title="Robocup Soccer AI">
                Documented AI and robot designs used for RoboCup Competitions.
            </ImageCard>

            <ImageCard link="./old/projects/3d-rendering-and-beyond.html" image="./img/tesseract.png" title="3D Rendering and Beyond">
                Learn the basics in rendering in 3D, 4D, and more?
            </ImageCard>

            <ImageCard link="./old/projects/svm.html" image="./img/svm.png" title="Support Vector Machines">
                Learn about one type of AI used to classify data.
            </ImageCard>

            <ImageCard link="./old/projects/vectors.html" image="./img/vectors.png" title="Vectors">
                Learn about the properties of vectors studied in VCE Specialist Maths.
            </ImageCard>

            <ImageCard link="./old/projects/integration.html" image="./img/integration.png" title="An Integration Intuition">
                A more practical way to think about the integral.
            </ImageCard>

        </CardList>
    )
}

export default ProjectsTab
