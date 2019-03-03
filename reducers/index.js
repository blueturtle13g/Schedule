import {
    ADD,
    REMOVE,
    TIME,
    TITLE,
    DESCRIPTION,
    IS_PASSING,
    IS_UPDATING,
    UPDATE_PROP,
    IS_ADDING
} from "../actions/types";

const EMPTY_TASK = {
    id: 0,
    time: 0,
    title: "",
    description: "",
    is_passing: false,
    is_updating: false
};

const INITIAL_STATE = {
    tasks:[],
    is_adding: false
};

export default (state = INITIAL_STATE, action) =>{
    let new_tasks = [...state.tasks];
    switch (action.type){

        case UPDATE_PROP:
            const { i, key, value } = action.payload;
            switch (key){
                case TIME:
                    new_tasks[i].time = value;
                    break;
                case TITLE:
                    new_tasks[i].title = value;
                    break;
                case DESCRIPTION:
                    new_tasks[i].description = value;
                    break;
                case IS_PASSING:
                    new_tasks[i].is_passing = value;
                    break;
                case IS_UPDATING:
                    new_tasks[i].is_updating = value;
                    new_tasks[i].is_passing = false;
                    break;
                case IS_ADDING:
                    return {...state, is_adding: value};
            }
            return {...state, tasks: new_tasks};

        case ADD:
            let new_task = {...EMPTY_TASK};
            new_task.id = !!state.tasks.length ? state.tasks[state.tasks.length -1].id + 1 : 1;
            return {...state, tasks: [...state.tasks, new_task], is_adding: true};

        case REMOVE:
            return {...state, tasks: state.tasks.filter(task => task.id !== action.payload) };

        default: return state;
    }
}