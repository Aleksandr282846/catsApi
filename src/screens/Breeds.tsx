import axios from "axios";
import { useEffect, useState } from "react"
import { View, Image, StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

type Breed = {
  id: string;
  name: string;
  description: string;
}

export const LoadBreeds = () => {
  const [breeds, setBreeds] = useState<Breed[]>();

  const url = 'https://api.thecatapi.com/v1/breeds';

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        if (response?.data) {
          setBreeds(response?.data)
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <ScrollView style={styles.container}>
      {breeds?.map(breed => (
        <Text>{breed.name}</Text>
      ))}
      <Image style={styles.image} source={{ uri: ''}}/>
    </ScrollView>
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