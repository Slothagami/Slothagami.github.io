import Profile from "../../components/Profile/Profile"
import TabSelector from "../../components/TabSelector/TabSelector"
import type { Tab } from "../../components/TabSelector/TabSelector"
import "./Homepage.css"

const tabs: Tab[] = [
    {id: "interactive", label: "Interactive", content: "interactive"},
    {id: "maths", label: "Maths", content: "maths"},
    {id: "games", label: "Games", content: "games"}
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
