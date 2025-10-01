import React, { useEffect, useState } from 'react'
import { Image } from 'react-native'
import { ScrollView, Text, View } from 'react-native'
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader } from '@/components/ui/modal';
import { Icon, CloseIcon } from '@/components/ui/icon';
import { Input, InputField } from '@/components/ui/input';
import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { useRouter } from 'expo-router';
import { useContext } from "react";
import { AuthContext } from "../../auth";
export default function PerfilScreen() {
    const router = useRouter();
    const authContext = useContext(AuthContext);
    if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
    const { logout } = authContext;
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [nome, setNome] = useState<string>('Bryce Sardothien');
    const [email, setEmail] = useState<string>('sardothien.bryce@mail.com');
    const [senha, setSenha] = useState<string>('dfendyrqsdsdrfd');
    const [showModal, setShowModal] = useState<boolean>(false);


    useEffect(() => {
        AsyncStorage.getItem('profileImage').then((uri) => {
            if (uri) setImageUri(uri);
        });

    }, []);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true, // permite recorte
            aspect: [1, 1], // formato quadrado
            quality: 1,
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            setImageUri(uri);
            await AsyncStorage.setItem('profileImage', uri); // salvar como se fosse localStorage
        }
    };

    return (
        <ScrollView>
            <View className='pt-[70px]'>
                <View className='mx-auto border-2 border-white p-2 rounded-full'>
                    {imageUri ? (
                        <Image
                            source={{ uri: imageUri }}
                            className='w-[150px] h-[150px] rounded-full '
                        />
                    ) : (
                        <FontAwesome6 name="user-large" size={90} color="white" className=' rounded-md px-[1px] m-2'/>
                    )}
                    <FontAwesome6 name="edit" size={30} color="white" className='absolute bottom-0 right-0 bg-black rounded-lg' onPress={() => { setShowModal(true) }} />
                </View>


                <View className='flex-row mx-auto gap-3 my-5'>
                    <Text className='text-white text-2xl'>{nome}</Text>
                    <FontAwesome6 name="edit" size={30} color="white" className=' rounded-md px-[1px]' onPress={() => { setShowModal(true) }} />
                </View>


                <View className='w-[95%] max-w-[600px] bg-[#333] p-5 rounded-md mx-auto'>
                    <Input variant="outline" size="md" className='my-3'
                    >
                        <InputField
                            placeholder="Email"
                            placeholderTextColor="#fff"
                            style={{ color: "#fff" }}
                            keyboardType="email-address"
                            value={email}
                        />
                        <MaterialIcons name="edit" size={25} color="white" className='absolute bottom-0 right-0 m-1 '/>
                    </Input>

                    <Input variant="outline" size="md" className='my-3'
                    >
                        <InputField
                            placeholder="Senha"
                            placeholderTextColor="#fff"
                            style={{ color: "#fff" }}
                            secureTextEntry={true}
                            value={senha}
                        />
                        <MaterialIcons name="edit" size={25} color="white" className='absolute bottom-0 right-0 m-1'/>
                    </Input>

                    <Button variant="solid" size="md" action="primary" className='my-[25px]' onPress={()=>{logout(),router.replace("/login")}}>
                        <ButtonText>Sair</ButtonText>
                    </Button>
                </View>


            </View>


            <Modal isOpen={showModal}
                onClose={() => { setShowModal(false); }}
                size="md">
                <ModalBackdrop />
                <ModalContent>
                    <ModalHeader>
                        <Heading size="lg">Editar imagem</Heading>
                        <ModalCloseButton>
                            <Icon as={CloseIcon} />
                        </ModalCloseButton>
                    </ModalHeader>
                    <ModalBody>
                        <View className="my-2 flex-column gap-3">
                            <Button onPress={pickImage}>
                                <ButtonText>Escolher foto da galeria</ButtonText>
                            </Button>
                            <Button variant="secondary" onPress={() => { setImageUri(null) }}>
                                <ButtonText className='text-black'>Remover foto</ButtonText>
                            </Button>
                        </View>
                    </ModalBody>
                </ModalContent>
            </Modal>

        </ScrollView>
    )
}
