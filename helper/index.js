export const timeO = time=>{
    if(time < 10){
        return "0" + time.toString()
    }
    return time.toString()
};

export const secToWhole = s=>{
    let h = 0;
    let m = 0;

    while(s > 59){
        s-= 60;
        m++
    }
    while(m > 59){
        m-= 60;
        h++
    }
    return `${timeO(h)}:${timeO(m)}:${timeO(s)}`;
};

export const wholeToSec = (h, m, s)=>{
    return h*3600 + m*60 + s;
};