import {
    ADD,
    REMOVE,
    UPDATE,
    TOGGLE_PASSING,
    TRIGGER_ADDING,
    TOGGLE_CURRENT_TASK,
    CLEAR_CURRENT_TASK,
} from "../actions/types";

const INITIAL_STATE = {
    tasks:[
        {
            id: 5,
            time:{
                hours: 0,
                minutes: 0,
                seconds: 55
            },
            title: "some title",
            description: "this is my little description",
            passing: false,
        },
    ],
    updating: 0,
    adding: false,
};

export default (state = INITIAL_STATE, action) =>{
    let newTasks = [];
    switch (action.type){

        case TOGGLE_CURRENT_TASK:
            return {...state, updating: action.payload.id, adding: false};

        case TRIGGER_ADDING:
            return {...state, adding: true, updating: false};

        case CLEAR_CURRENT_TASK:
            return {...state, adding: false, updating: 0};

        case TOGGLE_PASSING:
            state.tasks.map(task =>{
                if(task.id === action.payload.id){
                    task.passing = !task.passing;
                }
                if(action.payload.time){
                    task.time = action.payload.time;
                }
                newTasks.push(task)
            });
            return {...state, tasks: newTasks};

        case ADD:
            if(state.tasks.length > 0){
                action.payload.id = state.tasks[state.tasks.length -1].id + 1;
            }else{
                action.payload.id = 1;
            }
            return {...state, tasks: [...state.tasks, action.payload], adding: false};

        case UPDATE:
            state.tasks.map(task =>{
                if(task.id === action.payload.id){
                    newTasks.push(action.payload)
                }else{
                    newTasks.push(task)
                }
            });
            return {...state, tasks: newTasks, updating: false};

        case REMOVE:
            newTasks = state.tasks.filter(task => task.id !== action.payload);
            return {...state, tasks: newTasks};

        default: return state;
    }
}