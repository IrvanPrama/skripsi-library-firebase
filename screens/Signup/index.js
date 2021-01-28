import React, { useContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import {
    ScrollView,
    Text,
    StyleSheet,
    View,
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native'

import useTheme from '../../hooks/useTheme'

export default function RegisterScreen() {
    const { colors } = useTheme()
    // const navigation = useNavigation()

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.primary
        },
        image: {
            height: 153,
            width: 146
        },
        textTitle: {
            fontSize: 22,
            fontWeight: 'bold',
            color: colors.surface,
            margin: 20
        },
        inputText: {
            fontSize: 18,
            height: 50,
            width: 300,
            borderWidth: 5,
            borderColor: colors.secondary,
            borderRadius: 24,
            paddingHorizontal: 25,
            color: colors.surface,
            marginBottom: 10
        },
        loginBtn: {
            backgroundColor: colors.secondary,
            borderRadius: 11,
            height: 50,
            width: 300,
            alignItems: 'center',
            marginTop: 5,
            marginBottom: 5
        },
        loginText: {
            fontSize: 18,
            fontWeight: 'bold',
            color: colors.surface,
            paddingTop: 12,
            paddingBottom: 12
        },
        textBody: {
            fontSize: 15,
            marginBottom: 15,
            color: colors.surface
        }
    })

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={{ alignItems: 'center' }}>
                <Image source={require('../../assets/logo.png')} style={styles.image} />
                <Text style={styles.textTitle}>Museum Skripsi</Text>

                <TextInput
                    autoCapitalize="none"
                    keyboardType="email-address"
                    // value={email}
                    // onChangeText={v => setEmail(v)}
                    style={styles.inputText}
                    placeholder="email"
                    placeholderTextColor="#aaa"
                />
                <TextInput
                    autoCapitalize="words"
                    // value={name}
                    // onChangeText={v => setName(v)}
                    style={styles.inputText}
                    placeholder="nama"
                    placeholderTextColor="#aaa"
                />
                <TextInput
                    keyboardType="number-pad"
                    // value={nim}
                    // onChangeText={v => setNim(v)}
                    style={styles.inputText}
                    placeholder="nim"
                    placeholderTextColor="#aaa"
                />
                <TextInput
                    secureTextEntry
                    // value={password}
                    // onChangeText={v => setPassword(v)}
                    style={styles.inputText}
                    placeholder="password"
                    placeholderTextColor="#aaa"
                />

                <TouchableOpacity style={styles.loginBtn} onPress={navigation.navigate('Login')}>
                    <Text style={styles.loginText}>
                        {/* {isLoading ? 'Mohon menunggu...' : 'Daftar'} */}
                        Daftar
                    </Text>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                    <Text style={styles.textBody}>Sudah punya akun? </Text>
                    <Text
                        style={[styles.textBody, { color: colors.secondary }]}
                        onPress={() => this.props.navigation.navigate('Login')}
                    >
                        Masuk
              </Text>
                </View>
            </View>
        </ScrollView>
    )


}