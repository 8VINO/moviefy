import { View, Text, ScrollView } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { Button, ButtonText } from '@/components/ui/button';
import {
  Toast,
  ToastDescription,
  useToast,
} from '@/components/ui/toast';
import { Linking } from "react-native";
import { useRouter } from "expo-router";
import { img_route } from "@/routes/api/api.route";
import { api_route } from "@/routes/api/api.route";
import { Image } from "@/components/ui/image";
import { useEffect, useState } from "react";


export default function DetailsMovie({idMovie}: {idMovie:number}) {
    const [content,setContent]=useState<any>(null);
    const [trailerLink, setTrailerLink]=useState<any>(null);
    
    const router = useRouter();
    const toast = useToast();

    useEffect(()=>{
      fetch(`${api_route}/movie/1311031?language=pt-BR`)
      .then(res=>res.json())
      .then(json=>setContent(json))
      .catch(err=>console.error(err))
    
    }
     ,[])

    useEffect(()=>{
      fetch(`${api_route}/movie/1311031/videos?language=pt-BR`)
      .then(res=>res.json())
      .then(json=>{
        const trailer = json.results.find(
          (item:any)=>item.type==="Trailer"
        );
        setTrailerLink(trailer?.key ?? null)
        
      })
      .catch(err=>console.error(err))
    }
     ,[])

    const handleOpenTrailer = () => {
    Linking.openURL(`https://www.youtube.com/watch?v=${trailerLink}`)
      .catch(err => console.error("Erro ao abrir link:", err));
  };
  
    const handleAddFavorite = () => {
    toast.show({
      id: "favorite-toast",
      placement: "top", 
      duration: 2000,   
      render: () => (
        <Toast className="mt-14">
          <ToastDescription>
            Conteúdo adicionado aos favoritos!
          </ToastDescription>
        </Toast>
      ),
    });
  }
  return (
      
      <ScrollView className="flex-1 ">
        <View className="h-64 mt-2">
    
        
        <Image
          source={`${img_route}/original${content?.poster_path}`}
          className="w-full h-full "
          resizeMode="cover"
          accessibilityLabel="Pôster do filme"
          
          />
          </View>

        <View className="p-4">
          <Text className="text-white text-2xl font-bold mb-1">{content?.title}</Text>
          <Text className="text-gray-400 mb-2">{content?.genres?.map((g:any) =>g.name).join(", ")}</Text>

          <View className="flex-row items-center mb-4 ">
            <Text className="text-gray-400 mr-2" >{content?.release_date?.substring(0,4)}</Text>

            <View className="bg-gray-700 px-2 py-0.5 rounded-full mr-2">
              <Text className="text-white text-xs ">A16</Text>
            </View>
            
            <View className="flex-row items-center">
              <FontAwesome name="star" size={14} color="yellow" />
              <Text className="text-white ml-1">{content?.vote_average != null ? content.vote_average.toFixed(1) : '—'}</Text>
            </View>
          </View>

          <Text className="text-gray-300 leading-6 text-justify">
            {content?.overview}
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
     


  );

}
