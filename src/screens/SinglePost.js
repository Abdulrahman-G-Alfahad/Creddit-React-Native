import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPostById, deletePostById } from "../api/PostsApi";
import CommentCard from "../components/CommentCard";
import AddComment from "../components/AddComment";
import ModalContext from "../context/ModalContext";
import { useNavigation } from "@react-navigation/native";

const SinglePost = ({ route }) => {
  const navigation = useNavigation();
  const { post } = route.params;
  const queryClient = useQueryClient();
  const { setModalVisible } = useContext(ModalContext);

  const {
    data: updatedPost,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["getPostById", post.id],
    queryFn: () => getPostById(post.id),
  });

  const deleteMutation = useMutation({
    mutationFn: () => deletePostById(post.id),
    onSuccess: () => {
      queryClient.invalidateQueries("getAllPosts");
      queryClient.invalidateQueries(["getPostById", post.id]);
      queryClient.refetchQueries("getAllPosts");
      navigation.navigate("Posts");
    },
    onError: (error) => {
      console.error("Error deleting post:", error);
      alert("Failed to delete post. Please try again.");
    },
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

  if (!updatedPost) {
    return (
      <View style={styles.container}>
        <Text>No post found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{updatedPost.title}</Text>
        <Text style={styles.description}>{updatedPost.description}</Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteMutation.mutate()}
          disabled={deleteMutation.isLoading}
        >
          {deleteMutation.isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.deleteButtonText}>Delete Post</Text>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
        {updatedPost.comments?.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>Add Comment</Text>
      </TouchableOpacity>
      <AddComment postId={post.id} />
    </View>
  );
};

export default SinglePost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
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
    fontSize: 18,
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
    alignItems: "center",
    marginTop: 10,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#4ade80",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
