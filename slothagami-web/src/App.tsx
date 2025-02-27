import Sidebar from "./components/Sidebar"
import Title from "./components/Title"

function App() {
    return (
        <Sidebar>
            <Title icon="/icons/git.svg"><a href="#">Github</a></Title>
            <Title icon="/icons/itchio.svg"><a href="#">Itch.io</a></Title>
            <Title icon="/icons/hamburger.svg">Menu</Title>
        </Sidebar>
    )
}

export default App
