import { img_route } from '@/routes/api/api.route';
import getData from '@/routes/api/GET';
import { IMovie } from '@/types/Movie';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';


interface IProps {
  title: string;
  url: string;
}


export default function ContentSlider({ title, url }: IProps) {
  const router = useRouter();

  const [content, setContent] = useState<IMovie[]>([])

  useEffect(() => {
    const loadData = async () => {
          const res = await getData(url);
          const resp = await res.json();
    
          setContent(resp.results)
        }
    
        loadData()
  },[])

  return (
    <View>
      <Text className="text-white font-bold text-lg px-2">{title}</Text>


      <View style={{ height: 210 }} className='mt-2'>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 16, paddingRight: 16 }}
          className='px-4'
        >
          {content.map((item, index) => {

            return (
              <Pressable key={index} onPress={() => router.push({
                pathname: `${item.title ? "/detailsMovie" : "/detailsSerie"}`,
                params: { id: item.id },
              })}>
                <Image
                  source={{ uri: `${img_route}/w500${item.poster_path}` }}
                  style={{ width: 140, height: '100%', borderRadius: 8 }}
                  resizeMode="cover"
                />
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}