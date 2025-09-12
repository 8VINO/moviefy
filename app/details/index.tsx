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

export default function Details() {
    
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
            Filme adicionado aos favoritos!
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
          source={require('@/assets/images/posters/mr-robot.jpeg')}
          style={styles.poster}
          className="mx-auto"
          resizeMode="cover"
        
        />

        <View className="p-4">
          <Text className="text-white text-2xl font-bold mb-1">Mr.Robot</Text>
          <Text className="text-gray-400 mb-2">Crime, Drama</Text>

          <View className="flex-row items-center mb-4 ">
            <Text className="text-gray-400 mr-2" >2015</Text>

            <View className="bg-gray-700 px-2 py-0.5 rounded-full mr-2">
              <Text className="text-white text-xs ">A16</Text>
            </View>
            
            <View className="flex-row items-center">
              <FontAwesome name="star" size={14} color="yellow" />
              <Text className="text-white ml-1">8.3</Text>
            </View>
          </View>

          <Text className="text-gray-300 leading-6">
            Elliot é um jovem programador que sofre de uma desordem que o torna anti-social. Acreditando que a única forma de se conectar com as pessoas é hackeando suas vidas, ele alia seu conhecimento ao fato de trabalhar em uma empresa de segurança online para proteger aqueles que ele ama daqueles que tentam, de alguma forma, prejudicá-los...
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