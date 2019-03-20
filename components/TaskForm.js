import React from 'react';
import {
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    View,
    Picker,
    ToastAndroid
} from 'react-native';
import { connect } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

import {secToWhole, timeO, wholeToSec} from '../helper';
import {add, updateProp, del} from "../actions";
import {
    DESCRIPTION,
    IS_ADDING,
    IS_UPDATING,
    TIME,
    TITLE
} from "../actions/types";

class TaskForm extends React.Component {
    state={
        hours: parseInt(secToWhole(this.props.task.time).substring(0, 2)),
        minutes: parseInt(secToWhole(this.props.task.time).substring(3, 5)),
        seconds: parseInt(secToWhole(this.props.task.time).substring(6, 8))
    };

    handleDone = ()=>{
        const { task, adding, i, updateProp } = this.props;
        const { hours, minutes, seconds } = this.state;
        if(!!task.title){
            if(adding) updateProp({i, key: IS_ADDING, value: false});
            else updateProp({i, key: IS_UPDATING, value: false});
            updateProp({
                i,
                key: TIME,
                value: wholeToSec(hours, minutes, seconds)
            });
        }
        else ToastAndroid.show('Please Give It A Title.', ToastAndroid.SHORT);
    };

    render() {
        const { task:{title, description, id}, i, updateProp, adding, del } = this.props;
        const { hours, minutes, seconds } = this.state;
        let generatedNumbers = [];
        for (let v = 0; v < 60; v++){
            generatedNumbers.push(<Picker.Item label={v.toString()} value={v} key={v.toString()} />)
        }
        return (
            <View style={styles.taskCon}>

                <View style={styles.inputGroup}>
                    <TextInput
                        placeholder={"Title"}
                        placeholderTextColor={"#e5e5e5"}
                        style={[styles.input, {color: "#3b3b3b"}]}
                        value={title}
                        autoCorrect={false}
                        onChangeText={value=>{
                            if(value.length < 36) updateProp({i, key: TITLE, value});
                            else ToastAndroid.show('Please Use Description Section.', ToastAndroid.SHORT);
                        }}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <TextInput
                        placeholder={"Description"}
                        placeholderTextColor={"#e5e5e5"}
                        multiline={true}
                        style={[styles.input, {fontSize: 14}]}
                        value={description}
                        autoCorrect={false}
                        onChangeText={value=> updateProp({i,key: DESCRIPTION, value})}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={[styles.input, {fontSize: 20}]}>{`${timeO(hours)}:${timeO(minutes)}:${timeO(seconds)}`}</Text>
                    <View style={styles.timePickers}>
                        <Picker
                            selectedValue={hours}
                            style={{ flex: 1 }}
                            onValueChange={hours => this.setState({hours})}
                        >
                            {generatedNumbers}
                        </Picker>
                        <Picker
                            selectedValue={minutes}
                            style={{ flex: 1 }}
                            onValueChange={minutes => this.setState({minutes})}
                        >
                            {generatedNumbers}
                        </Picker>
                        <Picker
                            selectedValue={seconds}
                            style={{ flex: 1 }}
                            onValueChange={seconds => this.setState({seconds})}
                        >
                            {generatedNumbers}
                        </Picker>
                    </View>
                </View>

                <View style={styles.buttonGroup}>
                    <TouchableOpacity
                        style={[styles.button, styles.done, !adding && {width: "100%"}]}
                        onPress={this.handleDone}
                    >
                        <AntDesign name={"check"} size={30} color={"#fff"}/>
                    </TouchableOpacity>
                    {adding &&(
                        <TouchableOpacity
                            style={[styles.button, styles.cancel]}
                            onPress={()=>{
                                updateProp({i, key: IS_ADDING, value: false});
                                del(id);
                            }}
                        >
                            <Entypo name={"cross"} size={30} color={"#fff"}/>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        )
    }
}

mapStateToProps = store=>{
    return {store}
};

export default connect(mapStateToProps, { updateProp, add, del })(TaskForm);

const styles = StyleSheet.create({
    taskCon:{
        width: null,
        overflow: "hidden",
        margin: 5,
        backgroundColor: "#4ac29a"
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
        backgroundColor:"#aa7155",
    },
    done:{
        backgroundColor:"#4c90aa",
    },
    textWhite:{
        color:"#fff",
    },
    input:{
        fontSize: 18,
        width: "95%",
        padding: 2,
        textAlign: "center"
    },
    timePickers:{
        width: "80%",
        flexDirection: "row",
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 3
    }
});