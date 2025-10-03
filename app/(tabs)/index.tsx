import ContentSlider from '@/components/ContentSlider';
import { img_route } from '@/routes/api/api.route';
import getData from '@/routes/api/GET';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import IContent from '@/types/Content';

export default function HomeScreen() {
  const router = useRouter();
  const [mostViewedMovies, setMostViewedMovies] = useState<IContent[]>([]);


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

          <Text className="absolute bottom-4 left-4 text-white font-bold text-2xl z-20">
            {mostViewedMovies[0]?.title || mostViewedMovies[0]?.name}
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
