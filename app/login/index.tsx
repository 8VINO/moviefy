import { View, Text, StyleSheet,ImageBackground } from "react-native";

import { Input, InputField } from '@/components/ui/input';
import { Button, ButtonText } from '@/components/ui/button';
import { useRouter } from 'expo-router';
const router = useRouter();
export default function Login() {
  
  return (
<ImageBackground
    source={require('assets/images/backgroundLogin.jpg')}
    style={styles.background}
    resizeMode="cover"
>
    <View style={styles.container}>
      <Text style={styles.title}>Entrar</Text>

      <View style={styles.loginBox}>
        <Input
          variant="outline"
          size="md"
          style={styles.input}
          
        >
          <InputField
            placeholder="Email"
            placeholderTextColor="#fff"
            style={{ color: "#fff" }}
          />
        </Input>

        <Input
          variant="outline"
          size="md"
          style={styles.input}
        >
          <InputField
            placeholder="Senha"
            placeholderTextColor="#fff"
            style={{ color: "#fff" }}
            
          />
        </Input>

        <Button
        variant="solid"
        size="md"
        action="primary"
        onPress={() => router.push("/(tabs)")}
        >
          <ButtonText>Entrar</ButtonText>
        </Button>
      </View>

      <Text style={styles.forgot}>Esqueceu a senha?</Text>
      <Text style={styles.signup}>Novo usuário? Cadastre-se já!</Text>
    </View>
</ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginBottom: 20,
    color: "#fff"
  },
  loginBox: {
    width: "100%",
    backgroundColor: "#333",
    padding: 20,
    borderRadius: 12
  },
  input: {
    marginBottom: 20,
    color:"#fff"
  },
  forgot: {
    color: "#fff",
    marginTop: 10,
    textDecorationLine: "underline",
    marginBottom:10
  },
  signup: {
    color: "#fff",
    marginTop: 10
  },
  background:{
    flex:1,
    width:"100%",
    height:"100%"
  }
});
