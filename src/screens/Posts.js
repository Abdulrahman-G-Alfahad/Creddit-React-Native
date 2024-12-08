import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Button,
} from "react-native";
import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../api/PostsApi";
import PostCard from "../components/PostCard";
import AddPost from "../components/AddPost";
import ModalContext from "../context/ModalContext";

const Posts = () => {
  const { modalVisible, setModalVisible } = useContext(ModalContext);
  const { data, isLoading, error } = useQuery({
    queryKey: ["getAllPosts"],
    queryFn: getAllPosts,
  });

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>Add Post</Text>
      </TouchableOpacity>
      <FlatList
        data={data}
        renderItem={({ item }) => <PostCard post={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
      <AddPost />
    </View>
  );
};

export default Posts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    paddingHorizontal: 20,
  },
  addButton: {
    backgroundColor: "#4ade80",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
    width: "90%",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
