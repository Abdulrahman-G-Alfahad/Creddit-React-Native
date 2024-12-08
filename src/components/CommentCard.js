import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCommentById } from "../api/PostsApi";

const CommentCard = ({ comment }) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => deleteCommentById(comment.id),
    onSuccess: () => {
      queryClient.invalidateQueries(["getPostById", comment.postId]);
    },
  });

  return (
    <View style={styles.card}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <Text style={styles.title}>{comment.username}</Text>
          <Text style={styles.description}>{comment.comment}</Text>
        </View>
        <TouchableOpacity onPress={() => mutate()} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommentCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: "100%",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
  deleteButton: {
    backgroundColor: "#ff4d4d",
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
