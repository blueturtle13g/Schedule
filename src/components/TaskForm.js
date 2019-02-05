import React from 'react';
import {Text, TextInput, TouchableOpacity, StyleSheet, View, ToastAndroid, Picker} from 'react-native';
import { connect } from 'react-redux';
import TimePicker from 'react-native-simple-time-picker';

import {timeO} from '../helper';
import {add, clearCurrentTaskStore, modifyCurrentTask, update} from "../actions";

class TaskForm extends React.Component {

    handlePositive = (id, time)=>{
        if(id){
            this.props.update(this.props.currentTaskStore)
        }else{
            if(time.hours > 0 || time.minutes > 0 || time.seconds > 0){
                this.props.add(this.props.currentTaskStore)
            }else{
                ToastAndroid.show("Please specify a time", ToastAndroid.SHORT);
            }
        }
    };

    setTime = (hours, minutes, seconds)=>{
        this.props.modifyCurrentTask(
            {
                key: "time" ,
                value: {
                    hours,
                    minutes,
                    seconds
                }
            }
        )};

    render() {
        const {id, title, description, time} = this.props.currentTaskStore;
        let generatedSeconds = [];
        for (let i = 0; i < 60; i++){
            generatedSeconds.push(<Picker.Item label={i.toString()} value={i.toString()} key={i.toString()} />)
        }
        return (
            <View style={[styles.taskCon]}>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={[styles.input, styles.textWhite]}
                        value={title}
                        autoCorrect={false}
                        onChangeText={value=> this.props.modifyCurrentTask({key: "title", value})}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        multiline={true}
                        style={[styles.input, styles.textWhite]}
                        value={description}
                        onChangeText={value=> this.props.modifyCurrentTask({key: "description", value})}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>{timeO(time.hours)} : {timeO(time.minutes)} : {timeO(time.seconds)}</Text>
                    <View style={styles.timePickers}>
                        <View style={{flex: 2}}>
                            <TimePicker
                                selectedHours={time.hours}
                                selectedMinutes={time.minutes}
                                onChange={(hours, minutes) => this.setTime(hours, minutes, time.seconds)}
                            />
                        </View>
                        <Picker
                            selectedValue={time.seconds.toString()}
                            style={{ flex: 1 }}
                            onValueChange={ seconds => this.setTime(time.hours, time.minutes, seconds)}
                        >
                            {generatedSeconds}
                        </Picker>
                    </View>
                </View>

                <View style={styles.buttonGroup}>
                    <TouchableOpacity
                        style={[styles.button, styles.save]}
                        onPress={()=> this.handlePositive(id, time)}
                    >
                        <Text style={styles.textWhite}>{id > 0 ? "Update" : "Save"}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.cancel]}
                        onPress={()=> this.props.clearCurrentTaskStore()}
                    >
                        <Text style={styles.textWhite}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

mapStateToProps = ({currentTaskStore}) =>{
    return {currentTaskStore}
};

export default connect(
    mapStateToProps,
    {
        modifyCurrentTask,
        add,
        clearCurrentTaskStore,
        update
    })(TaskForm);

const styles = StyleSheet.create({
    taskCon:{
        width: null,
        overflow: "hidden",
        margin: 5,
        backgroundColor: "#60987f",
        borderRadius: 10,
    },
    inputGroup:{
        justifyContent: "center",
        alignItems: "center",
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
    cancel:{
        backgroundColor:"#aa6061",
    },
    save:{
        backgroundColor:"#45aa70",
    },
    textWhite:{
        color:"#fff",
    },
    label:{
        fontSize: 18,
        color: "#2b2b2b"
    },
    input:{
        fontSize: 18,
        borderWidth:1,
        borderColor: "#fff",
        borderRadius: 10,
        width: "95%",
        padding: 5,
    },
    timePickers:{
        flexDirection: "row"
    }
});