import { View, Text, Image, ScrollView, StyleSheet  } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { Button, ButtonText } from '@/components/ui/button';
import {
  Toast,
  ToastDescription,
  useToast,
} from '@/components/ui/toast';
import { Linking } from "react-native";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import generos from '@/assets/data/generos.json';
import getGeneros from "@/components/utils/getGeneros";



const imagesMap: Record<string, any> = {
  'anne': require('@/assets/images/posters/anne.webp'),
  'barbie': require('@/assets/images/posters/barbie.webp'),
  'dexter': require('@/assets/images/posters/dexter.webp'),
  'hangover': require('@/assets/images/posters/hangover.webp'),
  'harry-potter-1': require('@/assets/images/posters/harry-potter-1.webp'),
  'harry-potter-3': require('@/assets/images/posters/harry-potter-3.webp'),
  'inception': require('@/assets/images/posters/inception.webp'),
  'lion-king': require('@/assets/images/posters/lion-king.webp'),
  'mr-robot': require('@/assets/images/posters/mr-robot.jpeg'),
  'ouatih': require('@/assets/images/posters/ouatih.jpeg'),
  'parasite': require('@/assets/images/posters/parasite.webp'),
  'peacemaker': require('@/assets/images/posters/peacemaker.webp'),
  'penguin': require('@/assets/images/posters/penguin.jpg'),
  'pirates': require('@/assets/images/posters/pirates.webp'),
  'rick-and-morty': require('@/assets/images/posters/rick-and-morty.webp'),
  'riverdale': require('@/assets/images/posters/riverdale.webp'),
  'sopranos': require('@/assets/images/posters/sopranos.webp'),
  'the-office': require('@/assets/images/posters/the-office.webp'),
  'vi-e-o-resto': require('@/assets/images/posters/vi-e-o-resto.webp'),
}


export default function Details() {
    const { filmeSerie, itemKey } = useLocalSearchParams();
    const content = JSON.parse(String(filmeSerie));
    
    const router = useRouter();
    const toast = useToast();

    const handleOpenTrailer = () => {
    Linking.openURL("https://www.youtube.com/watch?v=xIBiJ_SzJTA")
      .catch(err => console.error("Erro ao abrir link:", err));
  };
  
    const handleAddFavorite = () => {
    toast.show({
      placement: "top", 
      duration: 2000,   
      render: () => (
        <Toast>
          <ToastDescription>
            Conteúdo adicionado aos favoritos!
          </ToastDescription>
        </Toast>
      ),
    });
  }
  return (
    <View className="flex-1 bg-[#111111]">
      <View className="mx-auto"></View>
    
      <ScrollView className="flex-1">
        
        <Image
          source={imagesMap[String(itemKey)]}
          style={styles.poster}
          className="mx-auto"
          resizeMode="cover"
        
        />

        <View className="p-4">
          <Text className="text-white text-2xl font-bold mb-1">{content.name ? content.name : content.title}</Text>
          <Text className="text-gray-400 mb-2">{getGeneros(content, generos).join(", ")}</Text>

          <View className="flex-row items-center mb-4 ">
            <Text className="text-gray-400 mr-2" >{content.year}</Text>

            <View className="bg-gray-700 px-2 py-0.5 rounded-full mr-2">
              <Text className="text-white text-xs ">A16</Text>
            </View>
            
            <View className="flex-row items-center">
              <FontAwesome name="star" size={14} color="yellow" />
              <Text className="text-white ml-1">{content.vote_average}</Text>
            </View>
          </View>

          <Text className="text-gray-300 leading-6">
            {content.overview}
          </Text>
        </View>
        
        <Button
            size="md"
            style=
            {{
                width: "25%", 
                backgroundColor:"#D9D9D9",
                marginBottom:25,
                marginLeft:15
            }}
           
            onPress={handleAddFavorite}>
            <ButtonText style={{ color: "black" }}>+Favoritos</ButtonText>
        </Button>
            
       

        <View className="flex-1 justify-center items-center" style={{width:"100%"}}>
            <Button
            size="md"
            style=
            {{
                width: "92%", 
                backgroundColor: "#ffffff",
                marginBottom:10,
                
            }}
            onPress={() => router.push("/play")}
            >
          <ButtonText style={{ color: "black" }}>Assistir</ButtonText>
            </Button>
            <Button
            size="md"
            style=
            {{
                width: "92%", 
                backgroundColor:  "#242222",
                marginBottom:10
            }}
            onPress={handleOpenTrailer}
            >
          <ButtonText style={{ color: "white" }}>Trailer</ButtonText>
            </Button>
        </View>

      </ScrollView>


    </View>
  );

}
  const styles=StyleSheet.create({
    poster:{
        width: "100%",
        height: 200
    },
    button:{
        backgroundColor: "#FFD700"
    }
  })