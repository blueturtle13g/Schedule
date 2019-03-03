import {
    ADD,
    REMOVE,
    UPDATE_PROP
} from "./types";

export const add = ()=>{
    console.log("add action");
    return{
        type: ADD,
    }
};

export const updateProp = payload=>{
    return{
        type: UPDATE_PROP,
        payload
    }
};

export const del = id =>{
    return{
        type: REMOVE,
        payload: id
    }
};
