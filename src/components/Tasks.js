import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import {connect} from "react-redux";

import Task from './Task';
import TaskForm from './TaskForm';

class Tasks extends React.Component {
    state = {};

    render() {
        console.log("tasks: ", this.props.taskStore.tasks, "updating: ", this.props.taskStore.updating);
        // debugger;
        return (
            <ScrollView>
                {this.props.taskStore.tasks.map(task =>{
                    if(this.props.taskStore.updating === task.id){
                        return(
                            <TaskForm key={task.id}/>
                        )
                    }
                    return(
                        <Task
                            key={task.id}
                            task={task}
                        />
                    )
                }).reverse()}
            </ScrollView>
        )
    }
}

mapStateToProps = ({taskStore}) =>{
    return {taskStore}
};

export default connect(mapStateToProps, {})(Tasks);

const styles = StyleSheet.create({});