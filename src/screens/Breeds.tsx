import axios from "axios";
import { useEffect, useState } from "react"
import { View, Image, StyleSheet } from "react-native";

export const LoadBreeds = () => {
  const [breeds, setBreeds] = useState();

  const url = 'https://api.thecatapi.com/v1/breeds';

  axios
    .get(url)
    .then((response) => {
      if (response?.data) {
        setBreeds(response?.data)
      }
    })
    .catch((error) => console.log(error));

  useEffect(() => {
    LoadBreeds();
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: ''}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 200,
    height: 200,
  },
})