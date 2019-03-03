import React, {Component} from 'react';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor, store } from './store';
import Tasks from './components/Tasks';

export default class App extends Component {

    componentDidMount() {
        SplashScreen.hide();
    }

    render(){
        return (
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <Tasks/>
                </PersistGate>
            </Provider>
        );
    }
}