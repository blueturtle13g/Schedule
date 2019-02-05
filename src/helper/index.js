export const timeO = time =>{
    if(time < 10){
        return "0" + time.toString()
    }
    return time.toString()
};