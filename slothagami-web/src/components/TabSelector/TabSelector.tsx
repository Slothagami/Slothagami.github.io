import { ReactNode, useState } from "react"
import "./TabSelector.css"
import Title from "../Title/Title"

export type Tab = {
    id:      string,
    label:   string,
    content: ReactNode
}

interface Props {
    tabs: Tab[]
}

function TabSelector({tabs} : Props) {
    const [activeTabId, setActiveTabId] = useState(tabs[0].id)
    const currentTab = tabs.find(tab => tab.id === activeTabId)

    const makeTabSelectorButton = (tab: Tab) => {
        return (
            <div onClick={() => {setActiveTabId(tab.id)}} key={tab.id} className={`tab-button ${activeTabId === tab.id? "active": "inactive"}`}>
                <Title size="1.4em"> {tab.label} </Title>
            </div>
        )
    }

    return (
        <div className="tab-selector">
            <div className="tab-shelf">
                { tabs.map(makeTabSelectorButton) }
            </div>
            <div className="tab-contents">
                { currentTab?.content }
            </div>
        </div>
    )
}

export default TabSelector
