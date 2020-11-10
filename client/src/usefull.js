const formatTime = (iso)=>{
    const addZero = (num)=>{
        return num<10?'0'+num:num
    }
    let date = new Date(iso)
    return addZero(date.getDate()) +'.'+Number.parseInt(date.getMonth()+1)+'.'+date.getFullYear()
}

export {
    formatTime
}