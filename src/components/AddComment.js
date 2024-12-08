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
import { addComment } from "../api/PostsApi";
import ModalContext from "../context/ModalContext";

const AddComment = ({ postId }) => {
  const queryClient = useQueryClient();
  const { modalVisible, setModalVisible } = useContext(ModalContext);
  const [commentInfo, setCommentInfo] = useState({
    username: "",
    comment: "",
  });

  const { mutate } = useMutation({
    mutationFn: (newComment) => addComment(postId, newComment),
    onSuccess: () => {
      setModalVisible(false);
      queryClient.invalidateQueries(["getPostById", postId]);
    },
  });

  return (
    <Modal visible={modalVisible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TextInput
            placeholder="Username"
            style={styles.input}
            onChangeText={(value) =>
              setCommentInfo({ ...commentInfo, username: value })
            }
          />
          <TextInput
            placeholder="Comment"
            style={styles.input}
            onChangeText={(value) =>
              setCommentInfo({ ...commentInfo, comment: value })
            }
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              mutate(commentInfo);
            }}
          >
            <Text style={styles.buttonText}>Add Comment</Text>
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

export default AddComment;

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
