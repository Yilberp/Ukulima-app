import React from "react";
import {
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Button, TextInput, Divider, Text } from "react-native-paper";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useNavigate } from "react-router-native";

import Constants from "expo-constants";
const ScreenHeight = Dimensions.get("window").height;

export default function RegisterFarmer() {
  const navigate = useNavigate();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [date, setDate] = React.useState(new Date());
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginTop: Constants.statusBarHeight,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 10,
        }}
      >
        <Image
          resizeMode="center"
          style={{ height: 80, width: 150 }}
          source={require("../../../../../assets/ukulima-logo.png")}
        />
        <Button
          icon="arrow-left"
          textColor="black"
          onPress={() => navigate(-1)}
        ></Button>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          backgroundColor: "#F7F5F8",
          marginHorizontal: 10,
          borderRadius: 40,
          padding: 10,
        }}
      >
        <Button
          buttonColor="#FFD749"
          textColor="#17431F"
          mode="contained"
          style={{ paddingHorizontal: 15 }}
          onPress={() => navigate("/home")}
        >
          Lista
        </Button>
        <Button
          buttonColor="white"
          textColor="#063C2D"
          mode="contained"
          style={{ paddingHorizontal: 15 }}
        >
          Buscar
        </Button>
      </View>

      <Divider style={{ marginTop: 20 }} />
      <View style={styles.form}>
        <Text style={styles.formTitle} variant="headlineMedium">
          Registrar Agricultor
        </Text>

        <View>
          <TextInput
            style={styles.inputGroup}
            textColor="#063C2D"
            activeUnderlineColor="#063C2D"
            label="Nombres"
            value={email}
            onChangeText={(email) => setEmail(email)}
          />
          <TextInput
            style={styles.inputGroup}
            textColor="#063C2D"
            activeUnderlineColor="#063C2D"
            label="Apellidos"
            value={email}
            onChangeText={(email) => setEmail(email)}
          />

          <View style={styles.inputGroupTwo}>
            <View style={styles.inputDate}>
              <Text>{date.toDateString()}</Text>
              <Button
                textColor="#063C2D"
                icon={"calendar"}
                onPress={showDatepicker}
              ></Button>
            </View>

            <TextInput
              style={styles.input50}
              textColor="#063C2D"
              activeUnderlineColor="#063C2D"
              label="Identificacion"
              value={email}
              keyboardType={"numeric"}
              onChangeText={(email) => setEmail(email)}
            />
          </View>
          <TextInput
            style={styles.inputGroup}
            textColor="#063C2D"
            activeUnderlineColor="#063C2D"
            label="Correo electronico"
            value={email}
            keyboardType={"email-address"}
            onChangeText={(email) => setEmail(email)}
          />
          <View style={styles.inputGroupTwo}>
            <TextInput
              style={styles.input50}
              textColor="#063C2D"
              activeUnderlineColor="#063C2D"
              label="Contraseña"
              value={password}
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
            <TextInput
              style={styles.input50}
              textColor="#063C2D"
              activeUnderlineColor="#063C2D"
              label="Telefono"
              value={email}
              keyboardType={"numeric"}
              onChangeText={(email) => setEmail(email)}
            />
          </View>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <Button
            style={styles.formButton}
            buttonColor="#15A249"
            mode="contained"
            onPress={() => console.log("guardar")}
          >
            <Text style={styles.text}>Guardar</Text>
          </Button>
          <Button
            style={styles.formButton}
            buttonColor="#D63D0C"
            mode="contained"
            onPress={() => navigate(-1)}
          >
            <Text style={styles.text}>Cancelar</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  text: {
    fontSize: 18,
    fontWeight: "700",
    color: "white",
  },
  imageBackground: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    width: "100%",
    height: ScreenHeight,
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
  },
  logo: {
    resizeMode: "center",
    width: 100,
    height: 200,
  },
  form: {
    backgroundColor: "white",
    padding: 20,
  },
  formTitle: {
    color: "#063C2D",
    alignSelf: "center",
    fontWeight: "700",
  },
  inputDate: {
    marginTop: 15,
    flexDirection: "row",
    backgroundColor: "#F7F5F8",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingStart: 15,
    borderTopStartRadius: 5,
    borderTopEndRadius: 5,
    width: "49%",
  },
  inputGroup: {
    marginTop: 15,
    backgroundColor: "#F7F5F8",
  },
  input50: {
    marginTop: 15,
    backgroundColor: "#F7F5F8",
    width: "49%",
  },
  inputGroupTwo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  formButton: {
    marginVertical: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  formTextGroup: {
    flexDirection: "row",
    alignSelf: "center",
  },
});
