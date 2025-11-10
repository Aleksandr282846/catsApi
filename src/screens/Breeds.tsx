import axios from "axios";
import { useEffect, useState } from "react"
import { View, Image, StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";

type Breed = {
  id: string;
  name: string;
  description: string;
  image?: { url: string };
}

export const LoadBreeds = () => {
  const [breeds, setBreeds] = useState<Breed[]>();

  const url = 'https://api.thecatapi.com/v1/breeds';

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setBreeds(response?.data)
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <ScrollView>
      {breeds?.map(breed => {
        console.log(breed.image)
        return (
          <View key={breed.id}>
            <Image style={styles.image} source={{ uri: breed?.image?.url }} />
            <Text>{breed.name}</Text>
          </View>
        )
      })}
    </ScrollView>
  )
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