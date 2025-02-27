import "./common.css"

interface IconProps {
    icon: string
}

function Icon({ icon }: IconProps) {
    return (
        <div className="icon" style={{fontSize: "inherit"}}>
            <img src={icon} />
        </div>
    )
}

export default Icon
