import { MODIFY_CURRENT_TASK, CLEAR_CURRENT_TASK, TOGGLE_CURRENT_TASK} from "../actions/types";

const INITIAL_STATE = {
    id: 0,
    time:{
        hours: 0,
        minutes: 0,
        seconds: 0
    },
    title: "",
    description: "",
    passing: false,
};

export default (state = INITIAL_STATE, action) =>{
    switch (action.type){

        case CLEAR_CURRENT_TASK:
            return INITIAL_STATE;

        case TOGGLE_CURRENT_TASK:
            return action.payload;

        case MODIFY_CURRENT_TASK:
            return {...state, [action.payload.key]: action.payload.value};

        default: return INITIAL_STATE;
    }
}