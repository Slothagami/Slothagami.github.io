import Content from "./components/Content"
import Sidebar from "./components/Sidebar"
import Title from "./components/Title"

function App() {
    return (
        <>
            <Sidebar>
                <Title icon="/icons/git.svg"><a href="#">Github</a></Title>
                <Title icon="/icons/itchio.svg"><a href="#">Itch.io</a></Title>
                <Title icon="/icons/hamburger.svg">Menu</Title>
            </Sidebar>
            <Content>
                <Title size="5rem"> Support Vector Machines </Title>
                <p>Support Vector Machines (SVMs) are a type of AI. They are simpler compared to neural networks, as they only seperate data linearly.</p>
                <p>The animation above shows the training process for an SVM learning to seperate the blue points from the orange. You can Move each point around to get a feel of how the AI reacts.</p>
                <p>The faint gray lines either side of the dividing line represent the margin. This is how the SVM decides which line is best to seperate the data. The best line is chosen as the one that allows for the largest margin without hitting a data point.</p>
            </Content>
        </>
    )
}

export default App
