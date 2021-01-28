import React, { Component } from 'react'
import { AuthContext } from '../../router/AuthProvider'
import { navigation } from '@react-navigation/native'
import {
    ScrollView,
    Text,
    StyleSheet,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native'

import useTheme from '../../hooks/useTheme'
export default class LoginScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nim: "",
            password: ""
        }
    }

    myValidate = () => {
        const { nim, password } = this.state;
        if (nim == "" && password == "") {
            Alert.alert('Masukan nim dan password');
        }
        else if (nim == "1801020033" && password == "12345") {
            // Alert.alert('Success!');
            this.props.navigation.navigate('Signup');
        }
        else if (nim == "" || password == "") {
            Alert.alert('Masukan nim dan password');
        }
        else {
            Alert.alert('Akun tidak ditemukan');
        }
    };

    render() {
        // const { colors } = useTheme();

        const { nim, password } = this.state;
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.container}>
                    <Image source={require('../../assets/logo.png')} style={styles.image} />

                    <Text style={styles.textTitle}>Museum Skripsi</Text>

                    <TextInput
                        keyboardType="number-pad"
                        value={nim}
                        onChangeText={nim => this.setState({ nim })}
                        style={styles.inputText}
                        placeholder="nim"
                        placeholderTextColor="#aaa"
                    />
                    <TextInput
                        secureTextEntry
                        value={password}
                        onChangeText={password => this.setState({ password })}
                        autoCapitalize="none"
                        style={styles.inputText}
                        placeholder="password"
                        placeholderTextColor="#aaa"
                    />

                    <TouchableOpacity style={styles.loginBtn} onPress={this.myValidate}>
                        <Text style={styles.loginText}>
                            {/* {isLoading ? 'Mohon menunggu...' : 'Masuk'} */}
                        Masuk
                    </Text>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                        <Text style={styles.textBody}>Belum punya akun? </Text>
                        <Text
                            style={[styles.textBody, { color: '#00C2FF' }]}
                            onPress={() => this.props.navigation.navigate('Signup')}
                        >
                            Daftar
              </Text>
                    </View>
                </View>
            </ScrollView>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#001b39'
    },
    image: {
        height: 153,
        width: 146
    },
    textTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        margin: 20
    },
    inputText: {
        fontSize: 18,
        height: 50,
        width: 300,
        borderWidth: 5,
        borderColor: '#00C2FF',
        borderRadius: 24,
        paddingHorizontal: 25,
        color: '#fff',
        marginBottom: 15
    },
    loginBtn: {
        backgroundColor: '#00C2FF',
        borderRadius: 11,
        height: 50,
        width: 300,
        alignItems: 'center',
        marginBottom: 5
    },
    loginText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        paddingTop: 12,
        paddingBottom: 12
    },
    textBody: {
        fontSize: 15,
        marginBottom: 15,
        color: '#fff'
    }
})

