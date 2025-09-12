import { View, Text, Image, FlatList, StyleSheet, Dimensions } from "react-native";

const films = [
  { id: "1", name: "Mr.Robot", src: require("@/assets/images/posters/mr-robot.jpeg") },
  { id: "2", name: "Anne with an E", src: require("@/assets/images/posters/anne.webp") },
  { id: "3", name: "Pinguim", src: require("@/assets/images/posters/penguin.jpg") },
  { id: "4", name: "A origem", src: require("@/assets/images/posters/inception.webp") },
  { id: "5", name: "The Office", src: require("@/assets/images/posters/the-office.webp") },
  { id: "6", name: "Dexter", src: require("@/assets/images/posters/dexter.webp") },
  { id: "7", name: "Riverdale", src: require("@/assets/images/posters/riverdale.webp") },
  { id: "8", name: "Parasita", src: require("@/assets/images/posters/parasite.webp") },
  { id: "9", name: "Rei Leão", src: require("@/assets/images/posters/lion-king.webp") },
  { id: "10", name: "Arcane", src: require("@/assets/images/posters/vi-e-o-resto.webp") },
];

const screenWidth = Dimensions.get("window").width;
const marginItem = 16;
const widthItem = (screenWidth - marginItem * 3) / 2; 

export default function Favorites() {
  return (
    <View className="flex-1 p-2 mt-2">
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
        ListHeaderComponent={
          <Text style={styles.title}>Favoritos</Text>
        }
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
    marginTop: 16,
  },
  item: {
    margin: marginItem / 2,
    alignItems: "center",
    padding:14
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
