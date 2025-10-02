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
import { main_route } from '@/routes/api/api.route';


export default function PerfilScreen() {
    const router = useRouter();
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    const { logout, userId, token } = authContext;
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [nome, setNome] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('dfendyr');
    const [showModal, setShowModal] = useState<boolean>(false);

    const [showModalCampos, setShowModalCampos] = useState<boolean>(false);
    const [campoModal, setCampoModal] = useState<string>('');
    const [campoModalNome, setCampoModalNome] = useState<string>('');
    const [campoModalValue, setCampoModalValue] = useState<string>('');



    useEffect(() => {
        AsyncStorage.getItem('profileImage').then((uri) => {
            if (uri) setImageUri(uri);
        });

        fetch(`${main_route}/user/${userId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => {
                return res.json()
            })
            .then((res) => {
                setNome(res.name)
                setEmail(res.email)
            })

    }, []);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            setImageUri(uri);
            await AsyncStorage.setItem('profileImage', uri);
            setShowModal(false)
        }

        
    };

    const alteraDados = async () => {
        const data: Record<string, string> = {}

        data[campoModal] = campoModalValue;

        await fetch(`${main_route}/user/edit/${userId}`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
            .then(res => { return res.json() })
            .then(() => setShowModalCampos(false))


        fetch(`${main_route}/user/${userId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => {
                return res.json()
            })
            .then((res) => {
                setNome(res.name)
                setEmail(res.email)
            })
    }

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
                        <FontAwesome6 name="user-large" size={70} color="white" className=' rounded-md px-[1px] m-2' />
                    )}
                    <FontAwesome6 name="edit" size={30} color="white" className='absolute bottom-0 right-0 bg-black rounded-lg' onPress={() => { setShowModal(true) }} />
                </View>


                <View className='flex-row mx-auto gap-3 my-5'>
                    <Text className='text-white text-2xl'>{nome}</Text>
                    <FontAwesome6 name="edit" size={30} color="white" className=' rounded-md px-[1px]' onPress={() => { setShowModalCampos(true); setCampoModal('name'); setCampoModalNome('nome') }} />
                </View>


                <View className='w-[95%] max-w-[600px] bg-[#333] p-5 rounded-md mx-auto'>
                    <Input variant="outline" size="md" className='my-3' isDisabled
                    >
                        <InputField
                            placeholder="Email"
                            placeholderTextColor="#fff"
                            style={{ color: "#fff" }}
                            keyboardType="email-address"
                            value={email}
                        />
                        <MaterialIcons name="edit" size={25} color="white" className='absolute bottom-0 right-0 m-1 ' onPress={() => { setShowModalCampos(true); setCampoModal('email'); setCampoModalNome('e-mail') }} />
                    </Input>

                    <Input variant="outline" size="md" className='my-3' isDisabled >
                        <InputField
                            placeholder="Senha"
                            placeholderTextColor="#fff"
                            style={{ color: "#fff" }}
                            secureTextEntry={true}
                            value={senha}
                        />
                        <MaterialIcons name="edit" size={25} color="white" className='absolute bottom-0 right-0 m-1' onPress={() => { setShowModalCampos(true); setCampoModal('password'); setCampoModalNome('senha') }} />
                    </Input>

                    <Button variant="solid" size="md" action="primary" className='my-[25px]' onPress={() => { logout(), router.replace("/login") }}>
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
                            <Button variant="secondary" onPress={() => {AsyncStorage.removeItem('profileImage'); setImageUri(null); setShowModal(false) }}>
                                <ButtonText className='text-black'>Remover foto</ButtonText>
                            </Button>
                        </View>
                    </ModalBody>
                </ModalContent>
            </Modal>


            <Modal isOpen={showModalCampos}
                onClose={() => { setShowModalCampos(false); }}
                size="md">
                <ModalBackdrop />
                <ModalContent>
                    <ModalHeader>
                        <Heading size="lg">Editar {campoModalNome}</Heading>
                        <ModalCloseButton>
                            <Icon as={CloseIcon} />
                        </ModalCloseButton>
                    </ModalHeader>
                    <ModalBody>
                        <View className="my-2 flex-column gap-3">
                            <Input variant="outline" size="md" className='my-3'
                            >
                                <InputField
                                    placeholder={campoModalNome}
                                    placeholderTextColor="#fff"
                                    onChangeText={(text) => setCampoModalValue(text)}
                                    style={{ color: "#fff" }}
                                    secureTextEntry={campoModal === 'password'}
                                    defaultValue={campoModal == 'email' ? email : campoModal === 'name' ? nome : ''}
                                />
                                <MaterialIcons name="edit" size={25} color="white" className='absolute bottom-0 right-0 m-1' onPress={() => { setShowModalCampos(true) }} />
                            </Input>

                            <Button variant="secondary" onPress={() => { alteraDados() }}>
                                <ButtonText className='text-black'>Alterar</ButtonText>
                            </Button>
                        </View>
                    </ModalBody>
                </ModalContent>
            </Modal>

        </ScrollView>
    )
}
