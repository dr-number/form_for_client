export function isDate(value) {
    return value.length === 10
}

export function isPhone(value) {
    value = value.replace(/[^\d]/g, '');
    return value.length === 0 || value.length >= 11
}

export function isNumber(value) {
    return value.length === 0 || /^[0-9]+$/.test(value)
}

export function isRus(value) {
    if(value.length > 30) return false
    return value.length === 0 || /^[а-яёА-ЯЁ]+$/.test(value)
}

export function isIndex(value) {
    return value.length === 0 || /^[0-9]+$/.test(value) && value.length >= 6
}
