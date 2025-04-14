import { ReactNode, useState } from "react"
import Content from "./components/Content"
import Sidebar from "./components/Sidebar"
import Title from "./components/Title"
import Article from "./components/pages/article"

type ArticleList = {
    [article_name: string]: ReactNode
}

type SectionList = {
    [section_title: string]: ArticleList
}

const ARTICLES: SectionList = {
    "": {
        "Home":  <Article name="Slothagami"> <Title icon="/icons/git.svg"><a href="https://github.com/Slothagami">Github</a></Title> </Article>,
    },
    "Interactive": {
        "Mandelbrot Set": <Title size="4rem"> Mandelbrot Set </Title>,
        "Mandelbulb": <Title size="4rem"> Mandelbulb </Title>,

        "Fourier Drawing": <Title size="4rem"> Fourier Sketchpad </Title>,
        "3D Rendering": <Title size="4rem"> 3D Rendering </Title>,
    },
    "Games": {
        "Unended": <Title size="4rem"> Unended </Title>,
        "Sinwave": <Title size="4rem"> Sinwave </Title>,
    }
}

function App() {
    const [article, setArticle] = useState("Home")
    const [section, setSection] = useState("")

    const make_button = (section_name: string, article_name: string) => {
        return <Title key={article_name} onClick={() => {setArticle(article_name); setSection(section_name)}}> 
                    <p className="link">{article_name} </p>
               </Title>
    }

    const make_list = (articles: SectionList) => {
        var result: ReactNode[] = []
        Object.keys(articles).forEach(section => {
            // add section title
            result.push(<h2 key={section}>{section}</h2>)

            // add links to the articles
            Object.keys(articles[section]).forEach(article => {
                result.push(make_button(section, article))
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
                {ARTICLES[section][article]}
            </Content>
        </>
    )
}

export default App
