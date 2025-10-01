import React, { useState, useContext } from "react";
import { View, Text, Button, StyleSheet, Alert, TextInput, Platform } from "react-native";
import { ProdutosContext } from "../components/ProdutosContext";

export default function CadastroScreen({ navigation }) {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [descricao, setDescricao] = useState("");

  const { adicionarProduto } = useContext(ProdutosContext);

  const handleCadastro = () => {
    if (nome === "" || preco === "" || descricao === "") {
      Platform.OS === "web"
        ? window.alert("Por favor, preencha todos os campos.")
        : Alert.alert("Erro!", "Por favor, preencha todos os campos.");
      return;
    }

    const precoConvertido = parseFloat(preco);
    if (isNaN(precoConvertido)) {
      Platform.OS === "web"
        ? window.alert("Digite um preço válido.")
        : Alert.alert("Erro!", "Digite um preço válido.");
      return;
    }

    const novoProduto = {
      id: Math.random().toString(),
      nome,
      preco: precoConvertido,
      descricao,
    };

    adicionarProduto(novoProduto);

    Platform.OS === "web"
      ? window.alert("Produto cadastrado com sucesso!")
      : Alert.alert("Sucesso!", "Produto cadastrado com sucesso!");

    setNome("");
    setPreco("");
    setDescricao("");

    // opcional → ir direto para a lista após cadastro
  //   navigation.navigate("Lista");
   };

  return (
    <View style={styles.container}>
      <Text style={styles.styleText}>Nome do Produto</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Digite o nome do produto"
      />

      <Text style={styles.styleText}>Preço</Text>
      <TextInput
        style={styles.input}
        value={preco}
        onChangeText={setPreco}
        placeholder="Ex: 99.99"
        keyboardType="numeric"
      />

      <Text style={styles.styleText}>Descrição</Text>
      <TextInput
        style={styles.input}
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Detalhes do produto"
        multiline
      />

      <Button title="Cadastrar" onPress={handleCadastro} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0"
  },

  styleText: { fontSize: 16,
    marginBottom: 5,
  marginTop: 15
  },

  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
