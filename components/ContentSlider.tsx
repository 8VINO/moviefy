import { useRouter } from 'expo-router';
import React from 'react';
import { Text, Image, ScrollView, View, Pressable } from 'react-native';
import data from '@/assets/data/content.json'

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

interface IProps {
  title: string;
  content: string[];
}

type DataType = typeof data;

export default function ContentSlider({ title, content }: IProps) {
  const router = useRouter();




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
            const imageSource = imagesMap[item];

            const filmeSerie = data[item as keyof DataType];

            if (!imageSource) return null;

            return (
              <Pressable key={index} onPress={() => router.push({
                pathname: "/details",
                params: { filmeSerie: JSON.stringify(filmeSerie), itemKey: item },
              })}>
                <Image
                  source={imageSource}
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