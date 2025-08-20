import Profile from "../../components/Profile/Profile"
import GamesTab from "../../components/ProjectTabs/GamesTab"
import ProjectsTab from "../../components/ProjectTabs/ProjectsTab"
import TabSelector from "../../components/TabSelector/TabSelector"
import type { Tab } from "../../components/TabSelector/TabSelector"
import "./Homepage.css"

const tabs: Tab[] = [
    {id: "projects", label: "Projects", content: <ProjectsTab />},
    {id: "games", label: "Games", content: <GamesTab />}
]

function Homepage() {
    return (
        <div id="content">
            <Profile />
            <TabSelector tabs={tabs} />
        </div>
    )
}

export default Homepage
