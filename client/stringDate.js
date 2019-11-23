function stringDate(date){
    let getFull = date.slice(0,10);
    let arr = getFull.split('-').reverse();

    switch(arr[1]){
        case '01':
            return `${arr[0]} Januari ${arr[2]}`
        case '02':
            return `${arr[0]} Februari ${arr[2]}`
        case '03':
            return `${arr[0]} Maret ${arr[2]}`
        case '04':
            return `${arr[0]} April ${arr[2]}`
        case '05':
            return `${arr[0]} Mei ${arr[2]}`
        case '06':
            return `${arr[0]} Juni ${arr[2]}`
        case '07':
            return `${arr[0]} Juli ${arr[2]}`
        case '08':
            return `${arr[0]} Agustus ${arr[2]}`
        case '09':
            return `${arr[0]} September ${arr[2]}`
        case '10':
            return `${arr[0]} Oktober ${arr[2]}`
        case '11':
            return `${arr[0]} November ${arr[2]}`
        case '12':
            return `${arr[0]} Desember ${arr[2]}`
    }
}