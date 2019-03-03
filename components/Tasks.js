import React from 'react';
import {
    ScrollView,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import {connect} from "react-redux";
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Task from './Task';
import TaskForm from './TaskForm';
import { add } from '../actions';

class Tasks extends React.Component{

    renderAddTask = ()=>{
        return(
            <TouchableOpacity
                onPress={this.props.add}
                style={styles.addCon}
                activeOpacity={.5}
            >
                <Animatable.View
                    animation="jello"
                    iterationCount="infinite"
                >
                    <MaterialCommunityIcons
                        name={"alarm-plus"}
                        size={35}
                        color={"#3854aa"}
                    />
                </Animatable.View>
            </TouchableOpacity>
        )
    };

    render(){
        const { tasks, is_adding } = this.props.store;
        if(!tasks.length){
            return(
                <LinearGradient colors={["#7EE8FA","#69c2d1"]} style={styles.schedule_empty}>
                    <Animatable.Text
                        animation="flipInX"
                        iterationCount={1}
                        style={{fontSize: 22}}>
                        Your Schedule Is Empty!
                    </Animatable.Text>
                    {this.renderAddTask()}
                </LinearGradient>
            )
        }
        return (
            <LinearGradient style={{flex: 1}} colors={["#7EE8FA","#70cede"]}>
                <ScrollView>
                    {tasks.map((task, i) =>{
                        if(is_adding && i === tasks.length -1) return <TaskForm key={tasks[tasks.length -1].id} task={tasks[tasks.length -1]} i={tasks.length -1} adding/>;
                        if(task.is_updating) return<TaskForm key={task.id} i={i} task={task}/>;
                        return <Task key={task.id} i={i} task={task}/>;
                    }).reverse()}
                </ScrollView>

                {!is_adding && this.renderAddTask()}
            </LinearGradient>
        )
    }
}

mapStateToProps = store=>{
    return {store}
};

export default connect(mapStateToProps, {add})(Tasks);

const styles = StyleSheet.create({
    schedule_empty:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    addCon:{
        position: "absolute",
        bottom: 5,
        right: 5,
        height: 50,
        width: 50,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2b2b2b",
    }
});