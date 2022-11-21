import {
  StyleSheet,
  SafeAreaView,
  Image,
  ImageBackground,
  Dimensions,
  View,
  Pressable,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  ScrollView,
} from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useNavigate } from "react-router-native";
import Constants from "expo-constants";
import React from "react";
import { Picker } from "@react-native-picker/picker";
import LoginContext from "../../../../context/auth/authContext";
const logo = require("../../../../../assets/logo-vertical-white.png");
const image = require("../../../../../assets/image-background.jpg");
const ScreenHeight = Dimensions.get("window").height;

export default function Register() {
  const navigate = useNavigate();
  const {
    authContext: { signUp, signIn },
    state,
  } = React.useContext(LoginContext);
  const [data, setData] = React.useState({
    nombres: "",
    apellidos: "",
    email: "",
    password: "",
    identificacion: "",
    idTipoIdentificacion: "",
    confirmationToken: "",
    estado: false,
    fechaNacimiento: "",
    telefono: "",
  });
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
  const create = async () => {
    const newData = {
      ...data,
      identificacion: Number(data.identificacion),
      idTipoIdentificacion: {
        idTipo: Number(data.idTipoIdentificacion),
        nombre: "CC",
        agricultorCollection: null,
      },
      estado: false,
      confirmationToken: "",
      fechaNacimiento: date.toJSON().split("T")[0],
    };
    await signUp(newData);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{
          paddingBottom: 20,
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ImageBackground
              style={styles.imageBackground}
              source={image}
              resizeMode={"cover"}
            >
              <View style={styles.logoContainer}>
                <Image style={styles.logo} source={logo} />
              </View>
              <View style={styles.form}>
                <Text style={styles.formTitle} variant="headlineMedium">
                  Registrate
                </Text>

                <View>
                  <TextInput
                    style={styles.inputGroup}
                    textColor="#063C2D"
                    activeUnderlineColor="#063C2D"
                    label="Nombres"
                    value={data.nombres}
                    onChangeText={(e) => setData({ ...data, nombres: e })}
                  />
                  <TextInput
                    style={styles.inputGroup}
                    textColor="#063C2D"
                    activeUnderlineColor="#063C2D"
                    label="Apellidos"
                    value={data.apellidos}
                    onChangeText={(e) => setData({ ...data, apellidos: e })}
                  />
                  <TextInput
                    style={styles.inputGroup}
                    textColor="#063C2D"
                    activeUnderlineColor="#063C2D"
                    label="Correo electronico"
                    value={data.email}
                    keyboardType={"email-address"}
                    onChangeText={(e) => setData({ ...data, email: e })}
                  />
                  <View style={styles.inputGroupTwo}>
                    <TextInput
                      style={styles.input50}
                      textColor="#063C2D"
                      activeUnderlineColor="#063C2D"
                      label="Telefono"
                      value={data.telefono}
                      keyboardType={"numeric"}
                      onChangeText={(e) => setData({ ...data, telefono: e })}
                    />
                    <Picker
                      style={styles.input50}
                      selectedValue={data.idTipoIdentificacion}
                      onValueChange={(itemValue, itemIndex) =>
                        setData({ ...data, idTipoIdentificacion: itemValue })
                      }
                    >
                      <Picker.Item label="Seleccionar" value="" />
                      <Picker.Item label="Cédula de Ciudadanía" value="1" />
                    </Picker>
                  </View>

                  <View style={styles.inputGroupTwo}>
                    <TextInput
                      style={styles.input50}
                      textColor="#063C2D"
                      activeUnderlineColor="#063C2D"
                      label="# identificacion"
                      value={data.identificacion}
                      keyboardType={"numeric"}
                      onChangeText={(e) =>
                        setData({ ...data, identificacion: e })
                      }
                    />
                    <View style={styles.inputDate}>
                      <Text>{date.toDateString()}</Text>
                      {/* <Text>{console.log(date.toJSON().split("T")[0])}</Text> */}
                      <Button
                        textColor="#063C2D"
                        icon={"calendar"}
                        onPress={showDatepicker}
                      ></Button>
                    </View>
                  </View>
                  <TextInput
                    style={styles.inputGroup}
                    textColor="#063C2D"
                    activeUnderlineColor="#063C2D"
                    label="Contraseña"
                    value={data.password}
                    secureTextEntry={true}
                    onChangeText={(e) => setData({ ...data, password: e })}
                  />
                </View>

                <Button
                  style={styles.formButton}
                  buttonColor="#15A249"
                  mode="contained"
                  onPress={() => create()}
                >
                  <Text style={styles.text}>Continuar</Text>
                </Button>

                <View style={styles.formTextGroup}>
                  <Text
                    style={{
                      color: "#115F49",
                      marginRight: 5,
                    }}
                    variant="bodyLarge"
                  >
                    Ya tengo cuenta.
                  </Text>
                  <Pressable onPress={() => navigate("/")}>
                    <Text
                      style={{
                        color: "#063C2D",
                      }}
                      variant="bodyLarge"
                    >
                      Iniciar sesion
                    </Text>
                  </Pressable>
                </View>
              </View>
            </ImageBackground>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ScrollView>
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
  },
  formTextGroup: {
    flexDirection: "row",
    alignSelf: "center",
  },
});
