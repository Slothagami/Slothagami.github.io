import { ReactNode, useState } from "react"
import Content from "./components/Content"
import Sidebar from "./components/Sidebar"
import Title from "./components/Title"

type ArticleList = {
    [key: string]: ReactNode
}

function App() {
    const [article, setArticle] = useState("Home")
    const ARTICLES: ArticleList = {
        "Home":  <Title size="5rem"> Slothagami </Title>,
        "Support Vector Machines": <Title size="5rem"> Support Vector Machines </Title>
    }

    const make_button = (article_name: string) => {
        return <Title key={article_name} onClick={() => setArticle(article_name)}> 
                    <p className="link">{article_name} </p>
               </Title>
    }

    return (
        <>
            <Sidebar>
                {Object.keys(ARTICLES).map(make_button)}
            </Sidebar>
            <Content>
                {ARTICLES[article]}
            </Content>
        </>
    )
}

export default App
