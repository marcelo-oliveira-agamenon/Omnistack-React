import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  AsyncStorage,
  Image,
  StyleSheet,
  ScrollView
} from "react-native";

import logo from "../assets/logo.png";
import SpotList from "../components/SpotList";

export default function List() {
  const [techs, setTechs] = useState([]);

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
        {techs.map(eachTech => {
          return <SpotList key={eachTech} tech={eachTech} />;
        })}
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
