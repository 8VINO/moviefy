import { Toast, ToastDescription, useToast } from "@/components/ui/toast";
import { Button, ButtonText } from '@/components/ui/button';
import { api_route, img_route, main_route } from "@/routes/api/api.route";
import { FontAwesome } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import { Linking, ScrollView, Text, View, Image, Pressable } from "react-native";
import { Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger } from "@/components/ui/select";
import { ChevronDownIcon } from "@/components/ui/icon";
import { ISeries, ISeason } from "@/types/index";
import { useContext } from "react";
import { AuthContext } from '../../auth';

import ContentSlider from "@/components/ContentSlider";
import { LinearGradient } from "expo-linear-gradient";

export default function DetailsSerie() {
  const authContext = useContext(AuthContext);
  const { id } = useLocalSearchParams();
  const [seasonId, setSeasonId] = useState<string>('1');
  const [seasonData, setSeasonData] = useState<ISeason>({} as ISeason);
  const [minimumAge, setMinimumAge] = useState<any>(null);
  const [series, setSeries] = useState<ISeries>({} as ISeries);
  const [trailerLink, setTrailerLink] = useState<number>(1);

  const router = useRouter();
  const toast = useToast();


  useEffect(() => {
    fetch(`${api_route}/tv/${id}?language=pt-BR`)
      .then(res => res.json())
      .then(json => {
        // se json estiver vazio ou overview vazio, tenta sem language
        if (!json || Object.keys(json).length === 0 || !json.overview) {
          return fetch(`${api_route}/tv/${id}`)
            .then(res2 => res2.json());
        }
        return json;
      })
      .then(json => setSeries(json))
      .catch(err => {
        console.error("Erro ao buscar detalhes de series:", err);
      });

    //trailer
    fetch(`${api_route}/tv/${id}/videos`)
      .then(res => res.json())
      .then(json => {
        const trailer = json.results.find(
          (item: any) => item.type === "Trailer"
        );
        setTrailerLink(trailer?.key ?? null)

      })
      .catch(err => console.error(err))
    //minimum age
    fetch(`${api_route}/tv/${id}/content_ratings`)
      .then(res => res.json())
      .then(json => {
        const releaseDateBR = json.results.find((item: any) => item.iso_3166_1 === "BR");
        if (releaseDateBR?.rating) {
          const latest = releaseDateBR.rating
          setMinimumAge(latest || 18)
        } else {
          setMinimumAge(18)
        }
      })
  }, [])

  useEffect(() => {
    fetch(`${api_route}/tv/${id}/season/${seasonId}?language=pt-BR`)
      .then(res => res.json())
      .then(res => setSeasonData(res))
      .catch(err => console.error(err))
  }, [seasonId])

  const handleOpenTrailer = () => {
    Linking.openURL(`https://www.youtube.com/watch?v=${trailerLink}`)
      .catch(err => console.error("Erro ao abrir link:", err));
  };

  const handleAddFavorite = () => {
    let message = '';
    fetch(`${main_route}/user/favorites/series/${authContext?.userId}/${id}
           `, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${authContext?.token}`
      }
    })
      .then((res) => {
        if (res.status === 200) {
          message = 'Conteúdo adicionado aos favoritos!';
        }
        else {
          message = 'Não foi possivel adicionar aos favoritos';
        }
      })
      .catch((err) => {
        console.error(err)
        message = 'Erro ao adicionar aos favoritos';
      })
      .finally(() => {
        toast.show({
          id: "favorite-toast",
          placement: "top",
          duration: 2000,
          render: () => (
            <Toast className="mt-14">
              <ToastDescription>
                {message}
              </ToastDescription>
            </Toast>
          ),
        });
      })

  }

  return (
    <ScrollView className="flex-1">
      <View className="h-64" >

        <Pressable onPress={() => router.back()} className="bg-black/25"
          style={{ position: "absolute", top: 25, left: 20, zIndex: 10, backgroundColor: 'rgb(0, 0, 0, 0.3)' }}
        >
          <View className="bg-black/25 p-3 rounded-full">
            <FontAwesome name="arrow-left" size={15} color="white" />
          </View>
        </Pressable>

        <Image
          source={{ uri: `${img_route}/original${series?.last_episode_to_air?.still_path}` }}
          className="w-full h-full"
          resizeMode="cover"
          accessibilityLabel="Pôster do filme"
          alt=""
        />

        <LinearGradient
              colors={["black", "rgba(0,0,0,0.4)", "rgba(0,0,0,0.2)", "black"]}
              locations={[0.05, 0.3, 0.7, 1]}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                top: 0,
              }}
            />
      </View>

      <View className="p-4">
        <Text className="text-white text-2xl font-bold mb-1">{series.name}</Text>
        <Text className="text-gray-400 mb-2">{series?.genres?.map((g: any) => g.name).join(", ")}</Text>

        <View className="flex-row items-center mb-4 ">
          <Text className="text-gray-400 mr-2" >{series.first_air_date?.substring(0, 4)}</Text>

          <View className="bg-gray-700 px-2 py-0.5 rounded-full mr-2">
            <Text className="text-white text-xs ">A{minimumAge}</Text>
          </View>



          <View className="flex-row items-center">
            <FontAwesome name="star" size={14} color="yellow" />
            <Text className="text-white ml-1">{series?.vote_average != null ? series.vote_average.toFixed(1) : '—'}</Text>
          </View>
        </View>

        <Text className="text-gray-300 leading-6 text-justify">
          {series?.overview}
        </Text>
      </View>

      <Button
        size="md"
        style={{ width: "35%", backgroundColor: "#D9D9D9", marginBottom: 25, marginLeft: 15 }}
        onPress={handleAddFavorite}>
        <ButtonText style={{ color: "black" }}>+ Favoritos</ButtonText>
      </Button>

      <View className="flex justify-center items-center" style={{ width: "100%" }}>
        <Button
          size="md"
          style={{ width: "92%", backgroundColor: "#ffffff", marginBottom: 10 }}
          onPress={() => router.push("/play")}
        >
          <ButtonText style={{ color: "black" }}>Assistir</ButtonText>
        </Button>
        <Button
          size="md"
          style={{ width: "92%", backgroundColor: "#242222", marginBottom: 10 }} onPress={handleOpenTrailer}
        >
          <ButtonText style={{ color: "white" }}>Trailer</ButtonText>
        </Button>
      </View>

      <View style={{ width: 200 }}>
        <Select onValueChange={(value) => setSeasonId(value)}>
          <SelectTrigger variant="underlined" size="lg" className="ms-4 mb-6 w-fit">
            <SelectInput placeholder="1ª Temporada" />
            <SelectIcon as={ChevronDownIcon} />
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>

              {[...Array(series.number_of_seasons)].map((_, seasonId) =>
              (
                <SelectItem label={`${seasonId + 1}ª Temporada`} value={String(seasonId + 1)} key={seasonId} />
              )
              )}

            </SelectContent>
          </SelectPortal>
        </Select>
      </View>


      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 16, paddingRight: 16 }} className='px-4'>
        {
          seasonData?.episodes?.map((ep, key) => {
            return (
              <Pressable key={key} onPress={() => router.push("/play")} >
                <Image
                  source={{ uri: `${img_route}/w500${ep.still_path}` }}
                  resizeMode="cover"
                  style={{ width: 200, aspectRatio: 15 / 9 }}
                  alt="teste"
                />
                <Text className="text-white font-semibold mt-1 ms-1 text-wrap" style={{ flexWrap: "wrap", width: 200 }}>
                  E{key + 1}: {ep?.name}
                </Text>
                <View className="flex gap-4" style={{ flexWrap: "wrap", width: 200, flexDirection: "row", }}>
                  <Text className="text-gray-400 mt-1 ms-1 text-wrap">{ep.runtime} min</Text>
                  <Text className="text-gray-400 mt-1 ms-1 text-wrap">{(ep.air_date).split('-')[0]}</Text>
                </View>
              </Pressable>
            )
          })
        }
      </ScrollView>

      <View className='flex-column gap-8 mt-14 pb-14'>
        <ContentSlider title={`Parecidos com ${series.name || '...'}`} url={`/tv/${id}/recommendations`} />
        <View style={{ height: 40 }}></View>
      </View>
    </ScrollView>
  )
}