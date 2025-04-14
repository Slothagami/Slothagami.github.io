import "./common.css"

interface IconProps {
    icon: string,
    size?: string
}

function Icon({ icon, size="inherit" }: IconProps) {
    return (
        <div className="icon" style={{fontSize: size}}>
            <img src={icon} />
        </div>
    )
}

export default Icon
