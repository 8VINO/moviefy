import { View, Text, Image, FlatList, StyleSheet, Dimensions } from "react-native";

const films = [
  { id: "1", name: "Coringa", src: require("assets/images/mrRobot.jpg") },
  { id: "2", name: "Dexter", src: require("assets/images/mrRobot.jpg") },
  { id: "3", name: "Sobrenatural", src: require("assets/images/mrRobot.jpg") },
  { id: "4", name: "Shrek", src: require("assets/images/mrRobot.jpg") },
  { id: "5", name: "Coringa", src: require("assets/images/mrRobot.jpg") },
  { id: "6", name: "Dexter", src: require("assets/images/mrRobot.jpg") },
  { id: "7", name: "Sobrenatural", src: require("assets/images/mrRobot.jpg") },
  { id: "8", name: "Shrek", src: require("assets/images/mrRobot.jpg") },
];

const screenWidth = Dimensions.get("window").width;
const marginItem = 16;
const widthItem = (screenWidth - marginItem * 3) / 2; 

export default function Favoritos() {
  return (
    <View className="flex-1 p-2 mt-2">
      <Text style={styles.title}>Favoritos</Text>

      <FlatList
        data={films}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={[styles.item, { width: widthItem }]}>
            <Image source={item.src} style={styles.poster} resizeMode="cover" />
            <Text style={styles.name}>{item.name}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop:16
  },
  item: {
    margin: marginItem / 2,
    alignItems: "center",
  },
  poster: {
    width: "100%",
    height: 220,
  },
  name: {
    color: "#fff",
    marginTop: 8,
    textAlign: "center",
  },
});
