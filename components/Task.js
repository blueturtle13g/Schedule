import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Sound from 'react-native-sound';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import BackgroundTimer from 'react-native-background-timer';

import {secToWhole} from '../helper';
import { del, updateProp } from '../actions';
import {connect} from "react-redux";
import {
    IS_PASSING,
    IS_UPDATING,
    TIME
} from "../actions/types";

class Task extends React.Component {
    state = {
        time: this.props.task.time,
        interval_running: false
    };

    componentDidMount(){
        this.handlePassing();
    }

    componentDidUpdate(){
        this.handlePassing();
    }

    startAlarm = ()=>{
        let alarm = new Sound('song.ogg', Sound.MAIN_BUNDLE, () =>{
            alarm.play((done)=>{
                if(done) alarm.release();
            });
        });
    };


    handlePassing = ()=>{
        const {task, updateProp, i} = this.props;
        if(task.is_passing && !this.state.interval_running){
            let interval = BackgroundTimer.setInterval(() => {
                if(!task.is_passing){
                    BackgroundTimer.clearInterval(interval);
                    this.setState({interval_running: false});
                    return;
                }
                if(!this.state.time){
                    this.startAlarm();
                    updateProp({i, key: IS_PASSING, value: false});
                    updateProp({i, key: TIME, value: this.state.time});
                    return;
                }
                this.setState({time: this.state.time - 1, interval_running: true});
            }, 1000);
        }
    };

    renderTime = (is_passing, i)=>{
        const uniqueStyle = is_passing ? styles.stop : styles.start;
        const { time } = this.state;
        return(
            <View>
                <View style={styles.inputGroup}>
                    <Text style={styles.timer}>{secToWhole(time)}</Text>
                </View>
                <TouchableOpacity
                    style={[styles.doneCon, uniqueStyle]}
                    onPress={()=>{
                        if(is_passing) this.props.updateProp({i, key: TIME, value: this.state.time});
                        this.props.updateProp({i, key: IS_PASSING, value: !is_passing});
                    }}
                >
                    {is_passing
                        ?
                        <Animatable.View
                            animation="pulse"
                            iterationCount="infinite"
                        >
                            <MaterialCommunityIcons name={"timer-off"} size={29} color={"#fff"}/>
                        </Animatable.View>
                        :
                        <MaterialCommunityIcons name={"timer"} size={29} color={"#fff"}/>
                    }
                </TouchableOpacity>
            </View>
        )
    };
    render() {
        const { task:{is_passing, title, description, id}, i, updateProp, del} = this.props;
        return (
            <View
                style={styles.container}
            >
                <View style={styles.inputGroup}>
                    <Text style={styles.title}>{title}</Text>
                </View>
                {description.length > 0 &&(
                    <View style={styles.inputGroup}>
                        <Text>{description}</Text>
                    </View>
                )}

                {!!this.state.time && this.renderTime(is_passing, i)}
                <View style={styles.buttonGroup}>
                    <TouchableOpacity
                        style={[styles.button, styles.edit]}
                        onPress={()=>{
                            if(is_passing) updateProp({i, key: TIME, value: this.state.time});
                            updateProp({i, key: IS_UPDATING, value: true});
                        }}
                    >
                        <AntDesign name={"edit"} size={25} color={"#fff"}/>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.delete]}
                        onPress={()=> del(id)}
                    >
                        <MaterialCommunityIcons name={"delete-sweep"} size={25} color={"#fff"}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

mapStateToProps = store=>{
    return {store}
};

export default connect( mapStateToProps,
    {
        del,
        updateProp
    })(Task);

const styles = StyleSheet.create({
    container:{
        width: null,
        overflow: "hidden",
        margin: 5,
        elevation: 5,
        backgroundColor: "#009bba"
    },
    inputGroup:{
        justifyContent: "center",
        alignItems: "center",
        margin: 3,
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
    start:{
        backgroundColor:"rgba(69, 170, 112, .8)",
    },
    stop:{
        backgroundColor:"rgba(170, 89, 79, .8)",
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
        color: "#3b3b3b"
    },
    description:{

    },
    timer:{
        fontSize: 18,
        color: "#e5e5e5"
    },
    doneCon:{
        width: 60,
        height: 32,
        borderTopEndRadius: 30,
        borderTopStartRadius: 30,
        alignSelf: "center",
        justifyContent: "flex-end",
        alignItems: "center",
    },
});