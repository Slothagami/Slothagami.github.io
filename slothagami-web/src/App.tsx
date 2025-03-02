import { ReactNode, useState } from "react"
import Content from "./components/Content"
import Sidebar from "./components/Sidebar"
import Title from "./components/Title"

type ArticleList = {
    [article_name: string]: ReactNode
}

type SectionList = {
    [section_title: string]: ArticleList
}

const ARTICLES: SectionList = {
    "": {
        "Home":  <Title size="5rem"> Slothagami </Title>,
    },
    "Interactive": {
        "Support Vector Machines": <Title size="5rem"> Support Vector Machines </Title>
    }
}

function App() {
    const [article, setArticle] = useState("Home")

    const make_button = (article_name: string) => {
        return <Title key={article_name} onClick={() => setArticle(article_name)}> 
                    <p className="link">{article_name} </p>
               </Title>
    }

    const make_list = (articles: SectionList) => {
        var result: ReactNode[] = []
        Object.keys(articles).forEach(section => {
            // add section title
            result.push(<h2>{section}</h2>)

            // add links to the articles
            Object.keys(articles[section]).forEach(article => {
                result.push(make_button(article))
            })
        })
        return result
    }

    return (
        <>
            <Sidebar>
                {make_list(ARTICLES)}
            </Sidebar>
            <Content>
                {ARTICLES["Interactive"][article]}
            </Content>
        </>
    )
}

export default App
