import {
    ADD,
    TRIGGER_ADDING,
    MODIFY_CURRENT_TASK,
    REMOVE,
    UPDATE,
    CLEAR_CURRENT_TASK,
    TOGGLE_PASSING,
    TOGGLE_CURRENT_TASK,
    PASS, STOP_ALARM
} from "./types";

export const add = task =>{
    return{
        type: ADD,
        payload: task
    }
};

export const togglePassing = (id, time) =>{
    return{
        type: TOGGLE_PASSING,
        payload: {id, time}
    }
};

export const triggerAdding = ()=>{
    return{
        type: TRIGGER_ADDING
    }
};

export const toggleCurrentTask = task=>{
    return{
        type: TOGGLE_CURRENT_TASK,
        payload: task
    }
};

export const update = task =>{
    return{
        type: UPDATE,
        payload: task
    }
};

export const del = id =>{
    return{
        type: REMOVE,
        payload: id
    }
};

export const modifyCurrentTask = ({key, value}) =>{
    return{
        type: MODIFY_CURRENT_TASK,
        payload: {key, value}
    }
};

export const clearCurrentTaskStore = id =>{
    return{
        type: CLEAR_CURRENT_TASK,
        payload: id
    }
};
