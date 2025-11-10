import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';

type ButtonBackProps = {
  onPress?: () => void;
}

const ButtonBack: React.FC<ButtonBackProps> = ({ onPress }) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <Image
          style={styles.buttonBack}
          source={require('../../../assets/Back.png')}
          resizeMode='contain'
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonBack: {
    marginTop: 12,
    marginBottom: 29,
    marginLeft: -10,
    width: 44,
    height: 44,
  },
});


export default ButtonBack;