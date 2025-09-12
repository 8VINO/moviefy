import React from "react";
import { View } from "react-native";
import { Spinner } from '@/components/ui/spinner';
export default function Play() {
  return (
    
    <View className="flex-1 bg-black justify-center items-start p-5 mx-auto">
      <Spinner color="white" size="large" />
    </View>
    
  );
}
