import React, {useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Button, Alert } from "react-native";
import {useNavigation} from "@react-navigation/native"
import {db} from "../components/firebaseConnections"
import { collection, getDocs, deleteDoc, doc, onSnapshot } from "firebase/firestore";

export default function ListaScreen() {
  const [produtos, setProdutos] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "produtos"), (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProdutos(lista);
    });

    return () => unsubscribe();
  }, []);


   const excluirProduto = async (id) => {
    Alert.alert("Confirmar Exclusão", "Deseja realmente excluir este produto?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          await deleteDoc(doc(db, "produtos", id));
        },
      },
    ]);
  };


  const renderItem = ({ item }) => (
    <View>
      <Text style={styles.produto}>Produto: {item.nome}</Text>
    <Text style={styles.precoProduto}>
      Preço: R$ {item.preco ? item.preco.toFixed(2) : "0.00"}
    </Text>
    <Text style={styles.precoProduto}>Descrição: {item.descricao}</Text>

    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
      <Button
        title="Editar"
        color="#1E90FF"
        onPress={() => navigation.navigate("Cadastro", { produto: item })}
      />
      <Button
        title="Excluir"
        color="#FF3B30"
        onPress={() => excluirProduto(item.id)}
      />
    </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Produtos</Text>
     
      {produtos.length ===0 ?(
        <Text>Nenhum produto cadastrado!</Text>
      ): (
        <FlatList
        data={produtos}
        renderItem={renderItem}
        keyExtractor={(item)=> item.id}
        />
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f0f0f0" 
},
  title: { fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center"
},
  produto: {
    fontSize: 18,
    fontWeight: "bold"
},

 itemContainer: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },


  precoProduto: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
 noDataText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
    marginTop: 50,
  },

});
