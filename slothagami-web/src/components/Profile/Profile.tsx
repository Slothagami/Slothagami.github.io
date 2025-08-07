import Title from "../Title/Title"
import "./Profile.css"

function Profile() {
    return (
        <div id="profile">
            <div style={{"display": "block"}}>
                <img src="img/logo.png" alt="Logo" id="logo" />
            </div>

            <div id="profile-info">
                <Title>Slothagami</Title>
                <p id="tagline">
                    I'm a programmer that enjoys nice looking simulations.
                </p>

                <div className="socials">
                    <Title icon="./icons/git.svg"> 
                        <a href="https://github.com/Slothagami">github.com/slothagami </a>
                    </Title>
                    <Title icon="./icons/itchio.svg"> 
                        <a href="https://slothagami.itch.io/">slothagami.itch.io </a>
                    </Title>
                </div>
            </div>
        </div>
    )
}

export default Profile
