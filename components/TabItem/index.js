// import React from 'react'
// import { StyleSheet, Text, TouchableOpacity } from 'react-native'
// // import { useTheme } from '../../hooks/useTheme'
// import {
//     IconHomeActive, IconHome, IconProfileActive, IconProfile, IconListActive, IconList
// } from '../../assets/icons';
// import { color } from 'react-native-reanimated';

// // const { colors } = useTheme()
// const styles = StyleSheet.create({
//     container: {
//         alignItems: 'center'
//     },
//     text: (isFocused) => ({
//         fontSize: 13,
//         color: isFocused ? colors.primary : colors.secondary,
//         marginTop: 8
//     })
// })

// const TabItem = ({ isFocused, onPress, onLongPress, label }) => {
//     const Icon = () => {
//         if (label === "Home") return isFocused ? <IconHomeActive /> : <IconHome />

//         if (label === "Profile") return isFocused ? <IconProfileActive /> : <IconProfile />

//         return <IconHome />
//     }

//     return (
//         <TouchableOpacity
//             onPress={onPress}
//             onLongPress={onLongPress}
//             style={styles.container}>
//             <Icon />
//             <Text style={styles.text(isFocused)}>{label}</Text>
//         </TouchableOpacity>
//     );
// };

// export default TabItem;


