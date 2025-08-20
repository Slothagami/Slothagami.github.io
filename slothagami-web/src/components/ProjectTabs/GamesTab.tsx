import CardList from "../CardList/CardList"
import ImageCard from "../ImageCard/ImageCard"

function GamesTab() {
    return (
        <CardList>
            <ImageCard link="https://slothagami.itch.io/sinwave" image="./img/sinwave-banner.gif">Sinwave</ImageCard>
            <ImageCard link="https://slothagami.github.io/games/unended.html" image="./img/unended-banner.gif">Unended</ImageCard>
        </CardList>
    )
}

export default GamesTab
