import { img_route, main_route, api_route } from "@/routes/api/api.route";
import { useContext, useEffect, useState, useCallback } from "react";
import { Dimensions, FlatList, Image, StyleSheet, Text, View, Pressable } from "react-native";
import { AuthContext } from "../../auth";
import { useRouter,useFocusEffect } from "expo-router";

const screenWidth = Dimensions.get("window").width;
const marginItem = 16;
const widthItem = (screenWidth - marginItem * 3) / 2;

export default function Favorites() {
  const [favorites, setFavorites] = useState<any[]>([]);
  const router = useRouter();

  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("useAuth must be used within an AuthProvider");
  const { userId, token } = authContext;

  const fetchFavorites = useCallback(async () => {
    try {
      
      const resMovies = await fetch(`${main_route}/user/favorites/movie/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const moviesData = await resMovies.json();
      const movieIds = moviesData.map((fav: any) => fav.id || fav.UserMovie?.movieId);
      const movies = await Promise.all(
        movieIds.map(async (id: string) => {
          const resMovie = await fetch(`${api_route}/movie/${id}?language=pt-BR`);
          const json = await resMovie.json();
          return { ...json, type: "movie" };
        })
      );

      const resSeries = await fetch(`${main_route}/user/favorites/series/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const seriesData = await resSeries.json();
      const seriesIds = seriesData.map((fav: any) => fav.id || fav.UserSerie?.serieId);
      const series = await Promise.all(
        seriesIds.map(async (id: string) => {
          const resSerie = await fetch(`${api_route}/tv/${id}?language=pt-BR`);
          const json = await resSerie.json();
          return { ...json, type: "serie" };
        })
      );

      setFavorites([...movies, ...series]);
    } catch (error) {
      console.error("Erro ao buscar favoritos:", error);
    }
  }, [userId, token]);

  useFocusEffect(
    useCallback(() => {
      fetchFavorites();
    }, [fetchFavorites])
  );

  return (
    <View className="flex-1 p-2 mt-2">
      <Text style={styles.title}>Favoritos</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => `${item.type}-${item.id}`}
        numColumns={2}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              router.push({
                pathname: item.type === "movie" ? "/detailsMovie" : "/detailsSerie",
                params: { id: item.id },
              })
            }
            style={[styles.item, { width: widthItem }]}
          >
            <Image
              source={{ uri: `${img_route}/w500${item.poster_path}` }}
              style={styles.poster}
              resizeMode="cover"
            />
            <Text style={styles.name}>{item.title || item.name}</Text>
          </Pressable>
        )}
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
    padding: 14,
  },
  poster: {
    width: "100%",
    height: 220,
    borderRadius: 8,
  },
  name: {
    color: "#fff",
    marginTop: 8,
    textAlign: "center",
  },
});
