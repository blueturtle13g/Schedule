import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Sound from 'react-native-sound';

import { timeO } from '../helper';
import { del, toggleCurrentTask, togglePassing } from '../actions';
import {connect} from "react-redux";

class Task extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            passInterval: null,
            hours: props.task.time.hours,
            minutes: props.task.time.minutes,
            seconds: props.task.time.seconds,
        };
    }

    componentDidMount(){
        this.handlePassing();
    }

    componentDidUpdate(){
        this.handlePassing();
    }

    stopPassing = ()=>{
        if(this.props.task.passing) {
            const time = {hours: this.state.hours, minutes: this.state.minutes, seconds: this.state.seconds};
            this.props.togglePassing(this.props.task.id, time);
        }
    };

    startAlarm = ()=>{
        let alarm = new Sound('hangouts_incoming_call.ogg', Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('failed to load the alarm', error);
            } else {
                alarm.play();
            }
        });
    };


    handlePassing = ()=>{
        const {passInterval, hours, minutes, seconds} = this.state;
        const {task} = this.props;
        clearInterval(passInterval);
        if(task.passing) {
            this.state.passInterval = setInterval(() => {
                if (hours < 1 && minutes < 1 && seconds < 1) {
                    const time = {hours, minutes, seconds};
                    this.props.togglePassing(task.id, time);
                    this.startAlarm();
                } else if (seconds === 0) {
                    if (minutes === 0) {
                        this.setState({hours: this.state.hours - 1, minutes: 59, seconds: 59})
                    } else {
                        this.setState({minutes: this.state.minutes - 1, seconds: 59})
                    }
                } else {
                    this.setState({seconds: this.state.seconds - 1})
                }
            }, 1000);
        }
    };

    stopAndToggle = ()=>{
        this.stopPassing();
        this.props.toggleCurrentTask(this.props.task)
    };

    renderTime = (passing, id)=>{
        const uniqueStyle = passing ? styles.stop : styles.start;
        const uniqueText = passing ? "Stop" : "Start";
        const {hours, minutes, seconds } = this.state;
        const time = passing ? {hours: hours, minutes: minutes, seconds: seconds}: null;
        if(hours > 0 || minutes > 0 || seconds > 0){
            return(
                <View>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>{timeO(hours)} : {timeO(minutes)} : {timeO(seconds)}</Text>
                    </View>
                    <TouchableOpacity
                        style={[styles.timeButtons, uniqueStyle]}
                        onPress={()=> this.props.togglePassing(id, time)}
                    >
                        <Text style={styles.textWhite}>{uniqueText}</Text>
                    </TouchableOpacity>
                </View>
            )
        }else{
            return(
                <View style={styles.doneCon}>
                    <Text style={styles.done}>DONE</Text>
                </View>
            )
        }
    };

    render() {
        const { passing, title, description, id} = this.props.task;
        return (
            <View style={styles.taskCon}>
                {title.length > 0 &&(
                    <View style={styles.inputGroup}>
                        <Text style={styles.title}>{title}</Text>
                    </View>
                )}
                {description.length > 0 &&(
                    <View style={styles.inputGroup}>
                        <Text>{description}</Text>
                    </View>
                )}

                {this.renderTime(passing, id)}
                <View style={styles.buttonGroup}>
                    <TouchableOpacity
                        style={[styles.button, styles.edit]}
                        onPress={()=> this.stopAndToggle() }
                    >
                        <Text style={styles.textWhite}>Edit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.delete]}
                        onPress={()=> this.props.del(id)}
                    >
                        <Text style={styles.textWhite}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

mapStateToProps = ({taskStore}) =>{
    return {taskStore}
};

export default connect(
    mapStateToProps,
    {
        del,
        toggleCurrentTask,
        togglePassing
    })(Task);

const styles = StyleSheet.create({
    taskCon:{
        width: null,
        overflow: "hidden",
        margin: 5,
        // backgroundColor: "#605f69",
        backgroundColor: "#417c5e",
        borderRadius: 10,
    },
    inputGroup:{
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 3,
    },
    buttonGroup:{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    button:{
        width: "50%",
        justifyContent: "center",
        alignItems: "center",
        height: 35,
    },
    timeButtons:{
        alignSelf: "center",
        width: "100%",
        height: 34,
        justifyContent: "center",
        alignItems: "center",
    },
    start:{
        backgroundColor:"#45aa70",
    },
    stop:{
        backgroundColor:"#aa594f",
    },
    delete:{
        backgroundColor:"#aa7155",
    },
    edit:{
        backgroundColor:"#4c90aa",
    },
    textWhite:{
        color:"#fff",
    },
    title:{
        fontSize: 20,
    },
    doneCon:{
        width: 60,
        height: 32,
        borderTopEndRadius: 30,
        borderTopStartRadius: 30,
        alignSelf: "center",
        backgroundColor: "#6d8e9b",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    done:{
        // paddingTop: 5,
        color: "#fff",
        fontSize: 18,
        fontStyle: "italic"
    },
});