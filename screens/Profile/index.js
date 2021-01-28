import * as React from 'react';
import { Text, View, Image, RefreshControl, AsyncStorage, StyleSheet } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { Button } from "react-native-elements";
import { showMessage, hideMessage } from "react-native-flash-message";
import useTheme from '../../hooks/useTheme'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native'




export default function ProfileScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext);
  const { colors } = useTheme()
  const [borrow, setBorrow] = React.useState(null);
  const [refreshing, setRefreshing] = React.useState(false);

  const fetchBorrow = async () => {
    let realData = []
    let finalData = []
    let asynckeys = await AsyncStorage.getAllKeys()
    let data = await AsyncStorage.multiGet(asynckeys)
    data.forEach(item => realData.push(item[1]))
    realData.forEach(item => finalData.push(JSON.parse(item)))
    await setBorrow(finalData);

  }

  React.useEffect(() => {
    fetchBorrow()
  }, [])

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    fetchBorrow()
    setTimeout(() => { console.log("Waiting!"); }, 2000);
  }, [refreshing]);


  const handleRemove = async (index) => {
    try {
      let key = borrow[index].heading
      await AsyncStorage.removeItem(key)
      fetchBorrow()
    } catch (error) {
      console.error(error)
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary
    },
    backgroundContainer: {
      flex: 1,
      width: null,
      height: null
    },
    profileContainer: {
      marginTop: 100,
      paddingTop: 20,
      justifyContent: 'center',
      alignItems: 'center'
    },
    imgprofile: {
      height: 120,
      width: 120,
      marginHorizontal: 72,
      marginBottom: 10,
      borderRadius: 100
    },
    name: {
      color: 'white',
      fontSize: 26,
      fontWeight: 'bold',
      marginHorizontal: 100,
      marginTop: 4
    },
    nim: {
      color: 'white',
      fontSize: 16,
      marginHorizontal: 100,
      marginTop: 4,
      marginBottom: 18
    },
    containerProfile: {
      paddingLeft: 100
    },
    subTittle: {
      marginTop: 20,
      marginBottom: 20,
      marginLeft: -220
    },
    h2: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white'
    },
    h3: {
      fontSize: 16,
      color: 'white'
    },
    gridView: {
      paddingHorizontal: 15,
      marginTop: 10,
      flex: 1,
      backgroundColor: colors.primary
    },
    itemContainer: {
      justifyContent: 'flex-end',
      borderRadius: 10,
      padding: 10,
    },
    itemName: {
      fontSize: 16,
      color: 'white',
      fontWeight: '600',
      marginBottom: 10
    },
    itemCode: {
      fontWeight: '600',
      fontSize: 12,
      color: 'white',
      marginTop: 10
    },
    button: {
      marginHorizontal: '25%',
      alignContent: 'center',
      alignItems: 'center',
      zIndex: 4,
      width: 200,
      height: 40,
      borderRadius: 12,
      backgroundColor: colors.otenticBlue
    }
  });

  return (
    <>
      <ScrollView style={{ backgroundColor: colors.primary }}>
        <View style={styles.container}>
          <View style={styles.profileContainer}>
            <Image
              source={require('../../assets/default.png')}
              style={styles.imgprofile}
            />
            <Text style={styles.name}>Jagatditha</Text>
            <Text style={styles.nim}>1801020033</Text>
          </View>

          <View style={styles.subTittle}>
            <Text style={styles.h2}>Daftar Pinjaman</Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={() => onRefresh()}>
            <Text style={{
              color: 'white',
              fontSize: 20,
              fontWeight: 'bold',
              paddingVertical: 8
            }}>Refresh</Text>
          </TouchableOpacity>
        </View>
        {
          borrow ? <FlatGrid
            itemDimension={150}
            items={borrow}
            style={styles.gridView, { backgroundColor: colors.primary }}
            // staticDimension={300}
            // fixed
            // spacing={20}
            renderItem={({ item, index }) => (
              <View contentContainerStyle={[styles.itemContainer, { backgroundColor: 'white', flexDirection: 'row', }]}>
                <View style={{ backgroundColor: colors.otenticBlue, alignContent: 'center', alignItems: 'center', borderTopRightRadius: 8, borderTopLeftRadius: 8 }}>
                  <Image source={{ uri: item.img }} style={{ width: 180, height: 220, borderRadius: 8 }} />
                </View>
                <View style={{}}>
                  {/* <Text style={styles.itemName}>{item.heading}</Text> */}
                  {/* <Text style={styles.itemCode, {
                    color: 'white',
                    fontSize: 16,
                    fontWeight: 'bold',
                    paddingVertical: 8
                  }}>{item.price}</Text> */}
                  <TouchableOpacity style={{
                    backgroundColor: 'white',
                    backgroundColor: colors.otenticBlue,
                    borderBottomEndRadius: 8,
                    borderBottomStartRadius: 8,
                    alignItems: 'center'
                  }} onPress={() => {
                    showMessage({
                      message: "Removed from List",
                      type: "info",
                    })
                    handleRemove(index)
                  }} ><Text style={{
                    color: 'white',
                    fontSize: 16,
                    fontWeight: 'bold',
                    paddingVertical: 8
                  }}>Kembalikan</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          /> : null
        }
      </ScrollView>
    </>
  );
}

