export function dateString(date) {
    const tzoffset = date.getTimezoneOffset() * 60000
    const localISOTime = (new Date(date.getTime() - tzoffset)).toISOString().substr(0, 10)
    return localISOTime
}

export function dateFromString(str) {
    const [year, month, day] = str.split('-').map(i => parseInt(i))
    return new Date(year, month - 1, day)
}