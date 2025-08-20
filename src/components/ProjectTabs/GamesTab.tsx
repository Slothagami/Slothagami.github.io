import CardList from "../CardList/CardList"
import ImageCard from "../ImageCard/ImageCard"

function GamesTab() {
    return (
        <CardList>
            <ImageCard link="https://virtual-doge.itch.io/dicedance" image="./img/dicedance-card.png" title="DiceDance">
                A Rhythm game, but with dice. Winner of GMCC Jam 2025
            </ImageCard>

            <ImageCard link="https://slothagami.itch.io/sinwave" image="./img/sinwave-card.png" title="Sinwave">
                Rythhm game made for Lowrez Jam 2020
            </ImageCard>

            <ImageCard link="./old/games/unended.html" image="./img/unended-card.png" title="Unended">
                Can you keep it alive? Made for Ludum Dare 46
            </ImageCard>

            <ImageCard link="./old/games/infernum.html" image="./old/games/img/infernum-banner.png" title="Infernum">
                A Questionably difficult puzzle game. Made in 2019 for Ludum Dare 44
            </ImageCard>

            <ImageCard link="./old/games/cloak-wars.html" image="./old/games/img/cloak-wars-banner.png" title="Cloak Wars">
                My first Jam Game, Made in 2018 for Ludum Dare 41
            </ImageCard>

        </CardList>
    )
}

export default GamesTab
