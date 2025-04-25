export const dayOfTheWeek = (date: Date) => {
    switch(date.getDay())
    {
        case 0:
            return "Воскресенье"
        case 1:
            return "Понедельник"
        case 2:
            return "Вторник"
        case 3:
            return "Среда"
        case 4:
            return "Четверг"
        case 5:
            return "Пятница"
        case 6:
            return "Суббота"
    }
}

export const fullDate = (date: Date) => {
    return date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear()
}

export const dateFormat = (date:Date) => {
    return (
        dayOfTheWeek(date) + ", " + fullDate(date)
    )
}