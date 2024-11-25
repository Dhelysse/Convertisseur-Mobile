import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, ImageBackground } from 'react-native';

// Types pour les devises
type Currency = 'ARIARY' | 'USD' | 'EUR';

const conversionRates: Record<Currency, Record<Currency, number>> = {
  ARIARY: {
    ARIARY: 1,
    USD: 1 / 4660,
    EUR: 1 / 4933,
  },
  USD: {
    ARIARY: 4660,
    USD: 1,
    EUR: 1 / 1.05,
  },
  EUR: {
    ARIARY: 4933,
    USD: 1.05,
    EUR: 1,
  },
};

const CurrencyConverter = () => {
  const [amountARIARY, setAmountARIARY] = useState<string>('');
  const [amountUSD, setAmountUSD] = useState<string>('');
  const [amountEUR, setAmountEUR] = useState<string>('');

  const handleConvert = () => {
    // Vérifier si un montant est saisi dans l'une des devises
    if (amountARIARY) {
      // Convertir à partir d'ARIARY
      const amountInAriary = parseFloat(amountARIARY);
      setAmountUSD((amountInAriary * conversionRates.ARIARY.USD).toFixed(2));
      setAmountEUR((amountInAriary * conversionRates.ARIARY.EUR).toFixed(2));
    } else if (amountUSD) {
      // Convertir à partir de USD
      const amountInUSD = parseFloat(amountUSD);
      setAmountARIARY((amountInUSD * conversionRates.USD.ARIARY).toFixed(2));
      setAmountEUR((amountInUSD * conversionRates.USD.EUR).toFixed(2));
    } else if (amountEUR) {
      // Convertir à partir de EUR
      const amountInEUR = parseFloat(amountEUR);
      setAmountARIARY((amountInEUR * conversionRates.EUR.ARIARY).toFixed(2));
      setAmountUSD((amountInEUR * conversionRates.EUR.USD).toFixed(2));
    } else {
      Alert.alert('Erreur', 'Entrer le montant dans un des trois champs');
    }
  };

  return (
    <View style={styles.container}>
      {/* <ImageBackground style={styles.image} source={require("../assets/images/money.jpg")}>         */}
        <TextInput
          style={styles.input}
          placeholder="ARIARY"
          keyboardType="numeric"
          value={amountARIARY}
          onChangeText={(text) => {
            setAmountARIARY(text);
            setAmountUSD('');
            setAmountEUR('');
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="USD"
          keyboardType="numeric"
          value={amountUSD}
          onChangeText={(text) => {
            setAmountUSD(text);
            setAmountARIARY('');
            setAmountEUR('');
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="EUR"
          keyboardType="numeric"
          value={amountEUR}
          onChangeText={(text) => {
            setAmountEUR(text);
            setAmountARIARY('');
            setAmountUSD('');
          }}
        />
        <Button title="Convertir" onPress={handleConvert} />
      {/* </ImageBackground> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  // image: {
  //   height: "100%",
  //   width: "100%"
  // }
});

export default CurrencyConverter;
