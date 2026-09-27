import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

export default function Dado({ valor }: { valor: number }) {
  if (valor === 0) {
    return (
      <View style={styles.placeholderContainer}>
        <Text style={styles.placeholderText}>?</Text>
      </View>
    );
  }

  const imagensDados: { [key: number]: any } = {
    1: require("../../assets/dados/dice.png"),
    2: require("../../assets/dados/dois.png"),
    3: require("../../assets/dados/tres.png"),
    4: require("../../assets/dados/quatro.png"),
    5: require("../../assets/dados/cinco.png"),
    6: require("../../assets/dados/seis.png")
  };

  return (
    <View style={styles.container}>
      <Image 
        source={imagensDados[valor]} 
        style={styles.dadoImage}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderContainer: {
    borderWidth: 1,
    borderColor: '#334155', 
    backgroundColor: '#1E293B',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    borderRadius: 8,
  },
  placeholderText: {
    fontSize: 18,
    color: '#94A3B8',
  },
  dadoImage: {
    width: 50,
    height: 50,
  },
});