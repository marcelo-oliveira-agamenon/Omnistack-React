import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  AsyncStorage
} from "react-native";

import logo from "../assets/logo.png";
import api from "../services/api";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [techs, setTechs] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("user").then(user => {
      if (user) {
        navigation.navigate("List");
      }
    });
  }, []);

  async function handleSubmit() {
    const response = await api.post("/sessions", {
      email
    });

    const { _id } = response.data;
    await AsyncStorage.setItem("user", _id);
    await AsyncStorage.setItem("techs", techs);

    navigation.navigate("List");
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      enabled={Platform.OS === "ios" || Platform.OS === "android"}
      behavior="padding"
    >
      <Image source={logo} />
      <View style={styles.form}>
        <Text style={styles.label}>SEU EMAIL *</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu email aqui"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.label}>TECNOLOGIAS *</Text>
        <TextInput
          style={styles.input}
          placeholder="Suas tecnologias aqui"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={techs}
          onChangeText={setTechs}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.textButton}>ENCONTRAR SPOTS</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  label: {
    fontWeight: "bold",
    color: "#444",
    marginBottom: 8
  },
  form: {
    alignSelf: "stretch",
    paddingHorizontal: 30,
    marginTop: 30
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#444",
    borderRadius: 2,
    height: 45,
    marginBottom: 20
  },
  button: {
    height: 40,
    backgroundColor: "#f05a5b",
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 4,
    marginTop: 10
  },
  textButton: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    alignSelf: "center"
  }
});
