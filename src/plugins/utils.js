export const truncate = (string, max_chars = 40) => {
    if (typeof string === 'string' && string.length > max_chars) {
        return string.slice(0, max_chars - 3) + '...'
    }

    return string
}
