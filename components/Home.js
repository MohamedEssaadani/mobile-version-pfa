import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  CheckBox,
  TouchableOpacity,
  Dimensions,
} from "react-native";

var width = Dimensions.get("window").width; //full width

function Home() {
  const [taches, setTaches] = useState([]);
  const [workState, setWorkState] = useState("Commencer");

  useEffect(() => {
    const getAssignments = () => {
      axios
        .get(
          "http://10.0.2.2:8080/affectations?projection=affectationProjection"
        )
        .then((res) => {
          setTaches(res.data._embedded.affectations);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getAssignments();
  }, []);
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          style={styles.startBtn}
          onPress={() => {
            workState === "Commencer"
              ? setWorkState("Terminer")
              : setWorkState("Commencer");
          }}
        >
          <Text style={{ color: "#ffffff", fontSize: 18 }}>{workState}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={{ marginTop: 30 }}
        data={taches}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item }) => (
          <View>
            <View style={styles.tache}>
              <View>
                <Text style={{ fontSize: 18 }}>{item.tache.nom}</Text>
                <Text style={{ fontSize: 14, color: "grey" }}>
                  {item.dateRealisation}
                </Text>
              </View>
              <CheckBox
                value={item.effectué}
                // onValueChange={setSelection}
                style={styles.checkbox}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  tache: {
    width: width,
    backgroundColor: "#F8F9FC",
    padding: 18,
    borderColor: "#3057CA",
    borderWidth: 1,
    flexDirection: "row",
  },
  checkbox: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
  },
  startBtn: {
    width: "70%",
    padding: 15,
    backgroundColor: "#3860D1",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
});
