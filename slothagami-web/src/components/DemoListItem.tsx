interface Props {
    background: string,
    parent_id:  string,
    children:   string,
    link:       string,
}

function DemoListItem({background, parent_id, children, link}: Props) {
    var title = children

    const handleMouseOver = () => {
        let parent = document.getElementById(parent_id)
        if(parent) parent.style.backgroundImage = `url(${background})`
    }

    return (
        <>
            <hr />
            <div className="demolist-item" onMouseEnter={handleMouseOver}>
                <a href={link}> {title} </a>
            </div>
        </>
    )
}

export default DemoListItem
