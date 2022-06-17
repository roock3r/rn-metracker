import React, {useState, useContext} from 'react';
import {View, StyleSheet, TouchableOpacity} from "react-native";
import {Text, Input, Button} from "react-native-elements"
import Spacer from '../components/Spacer';
import {Context as AuthContext} from '../context/AuthContext';
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import {NavigationEvents} from "react-navigation";

const SignupScreen = ({navigation}) => {
    const {state, signup, clearErrorMessage} = useContext(AuthContext);
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>
            <NavigationEvents
                onWillBlur={clearErrorMessage}
            />
            <AuthForm
                headerText="Sign Up for tracker"
                errorMessage={state.errorMessage}
                submitButtonText="Sign up"
                // onSubmit={({email, password}) => signup({ email, password})}
                onSubmit={signup}
            />
            <NavLink routeName="Signin"
                     text="Already have an account? Sign in instead" />
            {/*<Spacer>*/}
            {/*    <Text h3>Sign Up for Tracker</Text>*/}
            {/*</Spacer>*/}
            {/*<Input label="Email"*/}
            {/*       value={email}*/}
            {/*       onChangeText={setEmail}*/}
            {/*       autoCapitalize="none"*/}
            {/*       autoCorrect={false}/>*/}
            {/*<Spacer/>*/}
            {/*<Input label="Password"*/}
            {/*       value={password}*/}
            {/*       onChangeText={setPassword}*/}
            {/*       autoCapitalize="none"*/}
            {/*       autoCorrect={false} secureTextEntry/>*/}
            {/*{state.errorMessage ? <Text style={styles.errorMessage}>{state.errorMessage}</Text>: null}*/}
            {/*<Spacer>*/}
            {/*    <Button title="Sign Up"*/}
            {/*            onPress={() => signup({email, password})}/>*/}
            {/*</Spacer>*/}
            {/*<TouchableOpacity onPress={() => navigation.navigate('Signin')} >*/}
            {/*    <Spacer>*/}
            {/*    <Text style={styles.link}> Already have an account ? Sign in instead</Text>*/}
            {/*    </Spacer>*/}
            {/*</TouchableOpacity>*/}
        </View>
    );
};

SignupScreen.navigationOptions = () => {
    return {
        header: null
    };
};

const styles = StyleSheet.create({
    container: {
        borderColor: 'red',
        borderWidth: 10,
        flex: 1,
        justifyContent: 'center',
        marginBottom: 250
    },
    // errorMessage: {
    //     fontSize: 16,
    //     color: 'red',
    //     marginTop: 15,
    //     marginLeft: 15
    // },
    // link:{
    //   color: 'blue'
    // }
});

export default SignupScreen;