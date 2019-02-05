import React from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import { connect } from 'react-redux';

import TaskForm from './TaskForm';
import { triggerAdding } from '../actions';

class AddTask extends React.Component {
    state = {};

    render() {
        const {adding} = this.props.taskStore;
        return (
            <View style={styles.trans}>
                {adding &&(
                    <TaskForm/>
                )}
                {!adding &&(
                    <TouchableOpacity
                        onPress={()=> this.props.triggerAdding()}
                        style={styles.addCon}
                    >
                        <Text
                            style={styles.plus}
                        >
                            +
                        </Text>
                    </TouchableOpacity>
                )}
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
        triggerAdding
    })(AddTask);

const styles = StyleSheet.create({
    addCon:{
        width: null,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#82aaa1",
    },
    plus:{
        fontSize: 30,
        fontWeight: "bold",
        color: "#5d5b71",

    },
});