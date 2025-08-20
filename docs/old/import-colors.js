class Theme {
    static get(property) {
        let style = getComputedStyle(document.documentElement)
        return style.getPropertyValue("--theme-" + property)
    }
}
