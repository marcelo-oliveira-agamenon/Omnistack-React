import React, { useState, useEffect } from "react";
import socketio from "socket.io-client";
import {
  SafeAreaView,
  AsyncStorage,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  Text
} from "react-native";

import logo from "../assets/logo.png";
import SpotList from "../components/SpotList";

export default function List({ navigation }) {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("user").then(user_id => {
      const socket = socketio("http://192.168.0.26:3333", {
        query: { user_id }
      });

      socket.emit("booking_response", booking => {
        Alert.alert(
          `Sua reserva em ${booking.spot.company} em ${booking.date} foi ${
            booking.approved ? "Aprovada" : "Negada"
          }`
        );
      });
    });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem("techs").then(storageTechs => {
      const techsArray = storageTechs.split(",").map(tech => tech.trim());
      setTechs(techsArray);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <ScrollView>
        {techs.map(tech => (
          <SpotList key={tech} tech={tech} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logo: {
    height: 32,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 55
  }
});
