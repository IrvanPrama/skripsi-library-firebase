import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Profile, Login, Signup } from "../screens";
import FlashMessage from "react-native-flash-message";
import { BottomNavigator } from './../components';
import useTheme from '../hooks/useTheme'


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
    return (
        <>
            <Tab.Navigator tabBar={props => <BottomNavigator{...props} />}>
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Profile" component={Profile} />
            </Tab.Navigator>
            <FlashMessage position="top" />
        </>
    )
}

const Router = () => {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
            <Stack.Screen name="MainApp" component={MainApp} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default Router
