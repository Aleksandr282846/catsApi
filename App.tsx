import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Dimensions, Image, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1/';
axios.defaults.headers.common['x-api-key'] = '';

import ButtonBack from './src/screens/components/ButtonBack';
import { LoadBreeds } from './src/screens/Breeds';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const SCREEN_WIDTH = Dimensions.get('window').width;

type Breed = {
  id: string;
  name: string;
  description: string;
}

type ImageData = {
  id?: string;
  url: string;
}



function MyBottomTabs () {
  return (
    <Tab.Navigator>
      <Tab.Screen name="BreedsNavigator" component={LoadBreeds} />
      {/* <Tab.Screen name="Favourites" component={Favourites} /> */}
    </Tab.Navigator>
  );
}

function BreedsNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Breeds" component={LoadBreeds} />
    </Stack.Navigator>
  )
}

export default function App() {
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<Breed | null>(null);
  const [image, setImage] = useState<ImageData | null>(null);

  const breedId = 'abys'
  const url = `https://api.thecatapi.com/v1/images/search?breed_id=${breedId}`

  const loadRandomImage = () => {
    axios
      .get(url)
      .then((response) => {
        if (response?.data.length > 0) {
          const imageData = response.data[0];
          const image = response.data[0];
          setImage({
            id: imageData.id,
            url: imageData.url
          });

          if (imageData.breeds && imageData.breeds.length > 0) {
            const breed = imageData.breeds[0];
            setSelectedBreed({
              id: breed.id,
              name: breed.name,
              description: breed.description
            });
          }
        }
      })
      .catch(error => {
        console.error(error);
      })
  }

  useEffect(() => {
    loadRandomImage();
    
  }, []);

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          
          <View style={styles.container}>
            <TouchableOpacity>
              <ButtonBack />
            </TouchableOpacity>
            <View style={[styles.image, styles.shadow]}>
              {image ? <Image style={styles.image} source={{ uri: image.url }} /> : null}
            </View>
            <Text style={styles.header}>{selectedBreed ? selectedBreed.name : ''}</Text>
            <Text style={styles.description}>
              {selectedBreed ? selectedBreed.description : ''}
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={() => loadRandomImage()}>
                <Text style={styles.buttonText}>Другое фото</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Добавить в избранное</Text>
              </TouchableOpacity>
            </View>
            {/* <MyBottomTabs /> */}
          </View>
          {/* <BreedsNavigator /> */}
        </SafeAreaView>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5FA',
    padding: 22,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 16,
  },
  header: {
    marginTop: 42,
    fontWeight: 'bold',
    fontSize: 20,
  },
  description: {
    fontSize: 14,
    marginTop: 31,
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderRadius: 12,
    marginTop: 42,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonText: {
    color: '#5533EA',
    fontSize: 14,
    fontWeight: '500',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});
