import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState, useContext } from "react";
import {
  Modal,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { createPost } from "../api/PostsApi";
import ModalContext from "../context/ModalContext";

const AddPost = () => {
  const queryClient = useQueryClient();
  const { modalVisible, setModalVisible } = useContext(ModalContext);
  const [postInfo, setPostInfo] = useState({
    title: "",
    description: "",
    Comment: [],
  });

  const { mutate } = useMutation({
    mutationFn: createPost,
    mutationKey: "createPost",
    onSuccess: () => {
      setModalVisible(false);
      queryClient.invalidateQueries("getAllPosts");
    },
  });

  return (
    <Modal visible={modalVisible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TextInput
            placeholder="Post Title"
            style={styles.input}
            onChangeText={(value) => setPostInfo({ ...postInfo, title: value })}
          />
          <TextInput
            placeholder="Post Description"
            style={styles.input}
            onChangeText={(value) =>
              setPostInfo({ ...postInfo, description: value })
            }
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              mutate(postInfo);
            }}
          >
            <Text style={styles.buttonText}>Add Post</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.closeButton]}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AddPost;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
  },
  button: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#4ade80",
    alignItems: "center",
    marginTop: 10,
  },
  closeButton: {
    backgroundColor: "#ff4d4d",
  },
  buttonText: {
    fontWeight: "bold",
    color: "white",
  },
});
