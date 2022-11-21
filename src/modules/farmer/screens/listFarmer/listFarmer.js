import { View, SafeAreaView, FlatList, Image } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import Constants from "expo-constants";
import { useState, useEffect, useContext } from "react";
import LoginContext from "../../../../context/auth/authContext";
import { useNavigate } from "react-router-native";
import { getPokemonApi } from "../../../../api/Ukulima";
export default function ListFarmer() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const {
    authContext: { signOut },
  } = useContext(LoginContext);
  // Los estados que van en [] van a mandar sobre el useEffect
  // Por ej: Si yo tengo un estado en [] y si este es modificado, el useEffect se vuelve a ejecutar
  useEffect(() => {
    // Hay que hacer una función anonima auto-ejecutable
    (async () => {
      await loadPokemons();
    })();
  }, []);
  // loadPokemons Tambien es promesa por lo tanto en el useEffect tambien hay que hacer un async await
  const loadPokemons = async () => {
    try {
      // getPokemonApi devuelve una promesa y hay que resolverla con await
      const response = await getPokemonApi();
      setData(response);
    } catch (error) {
      console.error(error);
    }
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
        data={data}
        renderItem={({ item: farmer }) => (
          <View key={farmer.identificacion} style={{ padding: 10 }}>
            <Card style={{ flex: 1 }}>
              <Card.Content
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Image
                  style={{
                    marginRight: 20,
                    height: 50,
                    width: 50,
                    borderRadius: 14,
                  }}
                  resizeMode={"cover"}
                  source={require("../../../../../assets/ukulima-logo.png")}
                />
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      color: "#0E4A3A",
                      fontSize: 16,
                      fontWeight: "700",
                    }}
                  >
                    {farmer.nombres} {farmer.apellidos}
                  </Text>
                  <Text
                    style={{
                      color: "#0E4A3A",
                      fontSize: 16,
                      fontWeight: "400",
                    }}
                  >
                    {farmer.email}
                  </Text>
                </View>
                <Button
                  onPress={() => navigate("/viewFarmer", { state: farmer })}
                  textColor="#15A249"
                  icon="eye"
                ></Button>
              </Card.Content>
            </Card>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
