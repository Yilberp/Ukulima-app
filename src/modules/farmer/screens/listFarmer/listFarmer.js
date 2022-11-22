import { View, SafeAreaView, FlatList, Image } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import Constants from "expo-constants";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-native";
import AgricultorContext from "../../../../context/agricultor/agricultorContext";
import ListItemFarmer from "../../components/ListItemFarmer";
import LoginContext from "../../../../context/auth/authContext";
export default function ListFarmer() {
  const navigate = useNavigate();
  const {
    authContext: { signOut },
  } = useContext(LoginContext);
  const { getAgricultores, agricultores, isLoading } =
    useContext(AgricultorContext);
  // Los estados que van en [] van a mandar sobre el useEffect
  // Por ej: Si yo tengo un estado en [] y si este es modificado, el useEffect se vuelve a ejecutar
  useEffect(() => {
    // Hay que hacer una función anonima auto-ejecutable
    (async () => {
      await getAgricultores();
    })();
  }, []);

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
          onPress={() => navigate("/registerFarmer")}
        >
          Agregar
        </Button>
        <Button
          buttonColor="white"
          textColor="#063C2D"
          mode="contained"
          style={{ paddingHorizontal: 15 }}
          onPress={() => signOut()}
        >
          Buscar
        </Button>
      </View>

      <Text
        style={{
          color: "#0E4A3A",
          fontSize: 20,
          fontWeight: "700",
          lineHeight: 24,
          marginLeft: 10,
          marginVertical: 10,
          //fontFamily: "Inter",
        }}
      >
        Lista de Agricultores
      </Text>
      <FlatList
        data={agricultores}
        renderItem={({ item: farmer }) => <ListItemFarmer farmer={farmer} />}
        keyExtractor={(item) => item.identificacion}
      />
    </SafeAreaView>
  );
}
