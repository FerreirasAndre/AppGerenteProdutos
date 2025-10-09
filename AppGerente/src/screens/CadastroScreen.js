import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Alert, TextInput, Platform } from "react-native";
import { db } from "../components/firebaseConnections";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";

export default function CadastroScreen({ navigation, route }) {
  const produtoParaEditar = route.params?.produto || null;

  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    if (produtoParaEditar) {
      setNome(produtoParaEditar.nome);
      setPreco(produtoParaEditar.preco.toString());
      setDescricao(produtoParaEditar.descricao);
    }
  }, [produtoParaEditar]);

  const handleSalvar = async () => {
    if (nome === "" || preco === "" || descricao === "") {
      const msg = "Por favor, preencha todos os campos.";
      Platform.OS === "web" ? window.alert(msg) : Alert.alert("Erro", msg);
      return;
    }

    const precoConvertido = parseFloat(preco);
    if (isNaN(precoConvertido)) {
      const msg = "Digite um preço válido.";
      Platform.OS === "web" ? window.alert(msg) : Alert.alert("Erro", msg);
      return;
    }

    try {
      if (produtoParaEditar) {
        const ref = doc(db, "produtos", produtoParaEditar.id);
        await updateDoc(ref, { nome, preco: precoConvertido, descricao });
        Platform.OS === "web"
          ? window.alert("Produto atualizado!")
          : Alert.alert("Sucesso", "Produto atualizado!");
      } else {
        await addDoc(collection(db, "produtos"), {
          nome,
          preco: precoConvertido,
          descricao,
        });
        Platform.OS === "web"
          ? window.alert("Produto cadastrado!")
          : Alert.alert("Sucesso", "Produto cadastrado!");
      }

      navigation.navigate("Lista");
    } catch (error) {
      console.error(error);
      const msg = "Falha ao salvar o produto!";
      Platform.OS === "web" ? window.alert(msg) : Alert.alert("Erro", msg);
    }
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

      <Button
        title={produtoParaEditar ? "Atualizar" : "Cadastrar"}
        onPress={handleSalvar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f0f0f0" },
  styleText: { fontSize: 16, marginBottom: 5, marginTop: 15 },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
