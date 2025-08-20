import CardList from "../CardList/CardList"
import ImageCard from "../ImageCard/ImageCard"

function GamesTab() {
    return (
        <CardList>
            <ImageCard link="https://virtual-doge.itch.io/dicedance" image="./img/dicedance-card.png" title="DiceDance">
                A Rhythm game, but with dice. Made for GMCC Jam 2025
            </ImageCard>
            <ImageCard link="https://slothagami.itch.io/sinwave" image="./img/sinwave-card.png" title="Sinwave">
                Rythhm game made for the Lowrez Jam 2020
            </ImageCard>
            <ImageCard link="https://slothagami.github.io/games/unended.html" image="./img/unended-card.png" title="Unended">
                Can you keep it alive? Made for Ludum Dare 46
            </ImageCard>
        </CardList>
    )
}

export default GamesTab
