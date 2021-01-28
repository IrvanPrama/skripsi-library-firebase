import * as React from "react";
import { Text, View, Image, StyleSheet, AsyncStorage, TouchableOpacity } from "react-native";
import axios from "axios";
import { SearchBar, Button } from "react-native-elements";
import { FlatGrid } from 'react-native-super-grid';
import { showMessage, hideMessage } from "react-native-flash-message";
import useTheme from '../../hooks/useTheme'
import banner from '../../assets/primakara.jpg'



export default function HomeScreen() {
  const { colors } = useTheme()
  const [books, setBooks] = React.useState("");
  const [search, setSearch] = React.useState("Fuzzy Logic");

  // Please get a new API key from Google API console for Google Books otherwise the App won't work
  let api_key = "";

  React.useEffect(() => {
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${search}&key=${api_key}`
      )
      .then((response) => {
        let items = response.data.items
        let final = items.map(book => {
          let title = book.volumeInfo.title ? book.volumeInfo.title : null
          let sub = book.volumeInfo.subtitle ? book.volumeInfo.subtitle : null
          let heading = sub ? `${title}: ${sub}` : `${title}`
          let img = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "./assets/img.png"
          let price = book.saleInfo.saleability === "FOR_SALE" ? `${book.saleInfo.listPrice.amount} ${book.saleInfo.listPrice.currencyCode}` : "Not for Sale"
          return (
            {
              heading: heading,
              img: img,
              price: price
            }
          )
        })
        setBooks(final);
        console.log(books)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [search]);

  const handleBorrow = async (index) => {
    try {
      let key = books[index].heading
      await AsyncStorage.setItem(key, JSON.stringify(books[index]))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <View style={styles.imgWrapper}>
        <Image source={banner} style={styles.img} />
        <Text style={styles.imgText}>Pustaka Primakara</Text>
      </View>
      <SearchBar
        placeholder="Type Here..."
        platform="android"
        onChangeText={(text) => setSearch(text)}
        value={search}
      />
      {books ? <FlatGrid
        itemDimension={150}
        items={books}
        style={styles.gridView}
        renderItem={({ item, index }) => (
          <View contentContainerStyle={[styles.itemContainer, { backgroundColor: 'white', flexDirection: 'row', }]}>
            <View style={{ backgroundColor: colors.otenticBlue, alignContent: 'center', alignItems: 'center', borderTopRightRadius: 8, borderTopLeftRadius: 8 }}>
              <Image source={{ uri: item.img }} style={{ width: 180, height: 220, borderRadius: 8 }} />
            </View>
            <View style={{}}>
              <TouchableOpacity
                style={{
                  // backgroundColor: 'white',
                  backgroundColor: colors.otenticBlue,
                  borderBottomEndRadius: 10,
                  borderBottomStartRadius: 10,
                  alignItems: 'center'
                }}
                onPress={() => {
                  showMessage({
                    message: "Added to Borrow",
                    type: "info",
                  })
                  handleBorrow(index)
                }} >
                <Text style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: 'bold',
                  paddingVertical: 8
                }}>Pinjam</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
        }
      /> : null}
    </>
  );
}

const styles = StyleSheet.create({
  imgWrapper: {
    width: '100%',
    height: 233,
    position: 'relative',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    overflow: 'hidden'
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  imgText: {
    position: 'absolute',
    bottom: 37,
    left: 37,
    fontSize: 33,
    color: 'white',
    width: 255,
    fontWeight: 'bold'
  },
  gridView: {
    marginTop: 15,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
  },
  itemName: {
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
    marginBottom: 10
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: 'black',
    marginTop: 10
  },
});
