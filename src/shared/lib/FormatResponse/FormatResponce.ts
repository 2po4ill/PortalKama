
export const errorFormat = (err: string) => {
    const error = err.split(' ')
    const errCode = error[error.length - 1]
    console.log(errCode)
    if (location.pathname === '/user_balance') {
        if (errCode == '404'){
            return "Неполадки на сервере. Попробуйте снова позже или обратитесь в техническую поддержку на ServiceDesk"
        }
        else if (errCode == '406') {
            return "У вас не хватает баллов для отправки пользователю. Попробуйте на следующей неделе."
        }
        else if (errCode == '407') {
            return "Вы больше не можете отправить баллов этому пользователю, попробуйте на следующей неделе. " +
                "Если вы считаете, что ошибка появилась неправильно, то обратитесь в техническую поддержку на ServiceDesk"
        }
        else if (errCode == '408') {
            return "Вы больше не можете отправить баллы себе) Попробуйте подарить их другому пользователю."
        }
    }
    return "Неизвестная ошибка. Обратитесь в техническую поддержку на ServiceDesk"
}