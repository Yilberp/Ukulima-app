import React from "react";
import { Image, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { useNavigate } from "react-router-native";
const ListItemFarmer = ({ farmer }) => {
  const navigate = useNavigate();
  return (
    <View style={{ padding: 10 }}>
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
            source={require("../../../../assets/ukulima-logo.png")}
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
  );
};

export default ListItemFarmer;
