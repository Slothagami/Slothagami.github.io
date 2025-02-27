import "./common.css"

interface IconProps {
    icon: String
}

function SVGIcon({ icon }: IconProps) {
    return (
        <div className="icon">
            <img src={`/icons/${icon}.svg`} />
        </div>
    )
}

export default SVGIcon
