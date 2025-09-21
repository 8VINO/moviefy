import ContentSlider from '@/components/ContentSlider';
import { View, Text, ScrollView,Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import data from '@/assets/data/content.json';


type DataType = typeof data;

export default function HomeScreen() {
   const router = useRouter();
  return (
     <ScrollView>

      <Pressable onPress={() => router.push({
                pathname: "/detailsMovie"
                
              })}>
        <View className="w-full aspect-[2/3] mb-20 relative">
          <Image
            source={{
              uri: "http://10.0.0.185:8000/img?url=/original/c55sXCaQBj3vuHqZe62tv90xCQS.jpg",
            }}
            className='w-full h-full z-0'
        />

          <View className="absolute bottom-0 left-0 right-0 w-full h-[50px] bg-black/95" />
          <View className="absolute bottom-0 left-0 right-0 w-full h-[100px] bg-black/45" />
          <View className="absolute bottom-0 left-0 right-0 w-full h-[150px] bg-black/35" />
          <View className="absolute bottom-0 left-0 right-0 w-full h-[250px] bg-black/25" />
          <View className="absolute bottom-0 left-0 right-0 w-full h-[350px] bg-black/25" />
          <View className="absolute bottom-0 left-0 right-0 w-full h-full bg-black/25" />

          <Text className="absolute bottom-4 left-4 text-white font-bold text-2xl z-20">
            Demon Slayer
          </Text>
        </View>
      </Pressable>

      <View className='flex-column gap-8'>
        <ContentSlider title='Em alta' content={['mr-robot', 'ouatih', 'harry-potter-1', 'peacemaker', 'inception', 'dexter', 'vi-e-o-resto']} />
        <ContentSlider title='Filmes' content={['harry-potter-1', 'hangover', 'parasite', 'barbie', 'lion-king', 'inception', 'pirates', 'harry-potter-3']} />
        <ContentSlider title='Series' content={['vi-e-o-resto', 'anne', 'dexter', 'mr-robot', 'peacemaker', 'penguin', 'the-office', 'riverdale', 'rick-and-morty']} />
      </View>

    </ScrollView>
  );
}
