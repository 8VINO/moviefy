import ContentSlider from '@/components/ContentSlider';
import { View, Image, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { img_route } from '@/routes/api/api.route';
import { useEffect, useState } from 'react';
import getData from '@/routes/api/GET';
import IMovie from '@/interfaces/Movie';

export default function HomeScreen() {
  const router = useRouter();
  const [mostViewedMovies, setMostViewedMovies] = useState<IMovie[]>([]);


  useEffect(() => {
    const loadData = async () => {
      const res = await getData('/trending/all/week?language=pt-BR');
      const resp = await res.json();

      setMostViewedMovies(resp.results)
    }

    loadData()
  }, [])

  return (
    <ScrollView>

      <Pressable onPress={() => router.push({
        pathname: `${mostViewedMovies[0].title ? "/detailsMovie": "/detailsSerie"}`,
        params: { id: mostViewedMovies[0].id },
      })}>
        <View className="w-full aspect-[2/3] mb-20 relative">
          {mostViewedMovies.length > 0 && mostViewedMovies[0]?.poster_path && (
            <Image
              source={{ uri: `${img_route}/original${mostViewedMovies[0].poster_path}` }}
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
            />
          )}


          <View className="absolute bottom-0 left-0 right-0 w-full h-[50px] bg-black/95" />
          <View className="absolute bottom-0 left-0 right-0 w-full h-[100px] bg-black/45" />
          <View className="absolute bottom-0 left-0 right-0 w-full h-[150px] bg-black/35" />
          <View className="absolute bottom-0 left-0 right-0 w-full h-[250px] bg-black/25" />
          <View className="absolute bottom-0 left-0 right-0 w-full h-[350px] bg-black/25" />
          <View className="absolute bottom-0 left-0 right-0 w-full h-full bg-black/25" />

          <Text className="absolute bottom-4 left-4 text-white font-bold text-2xl z-20">
            {mostViewedMovies[0]?.title}
          </Text>
        </View>
      </Pressable>

      <View className='flex-column gap-8'>
        <ContentSlider title='Em alta' url='/trending/all/week?language=pt-BR' />
        <ContentSlider title='Filmes' url='/movie/popular?language=pt-BR&page=1' />
        <ContentSlider title='Series' url='/tv/popular?language=pt-BR&page=1' />
      </View>

    </ScrollView>
  );
}
