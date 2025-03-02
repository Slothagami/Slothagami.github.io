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
        "Mandelbulb Fractals": <Title size="5rem"> Mandelbulb </Title>,
        "Create your own Fourier Drawing": <Title size="5rem"> Fourier Sketchpad </Title>,
        "Explore the Mandelbrot Set": <Title size="5rem"> Mandelbrot Set </Title>,
        "Support Vector Machines": <Title size="5rem"> Support Vector Machines </Title>,
    },
    "Maths": {
        "A Reuleaux Triangle Problem": <Title size="5rem"> A Reuleaux Triangle Problem </Title>,
        "An Intuitive meaning for Integration": <Title size="5rem"> Integration </Title>,
        "Uncertainty Principle": <Title size="5rem"> Uncertainty Principle </Title>,
        "Vectors": <Title size="5rem"> Vectors </Title>,
        "3D Rendering": <Title size="5rem"> 3D Rendering </Title>,
    },
    "Games": {
        "Unended": <Title size="5rem"> Unended </Title>,
        "Sinwave": <Title size="5rem"> Sinwave </Title>,
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
