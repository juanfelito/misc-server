export const states = {
    "closed": 0,
    "opened": 1,
    "flagged": 2,
    "question": 3
}

export const flagIcon = () => {
    const icon = document.createElement("i")
    icon.className = "fas fa-flag"

    return icon
}

export const bombIcon = () => {
    const icon = document.createElement("i")
    icon.className = "fas fa-bomb"

    return icon
}

export const questionIcon = () => {
    const icon = document.createElement("i")
    icon.className = "fas fa-question"

    return icon
}
