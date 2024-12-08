import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Comments from "../../screens/Comments";
import Posts from "../../screens/Posts";
import SinglePost from "../../screens/SinglePost";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
const PostNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Posts"
        component={Posts}
        options={{
          title: "CReddit",
        }}
      />
      <Stack.Screen
        name="SinglePost"
        component={SinglePost}
        options={{
          title: "Post",
        }}
      />
    </Stack.Navigator>
  );
};

export default PostNavigation;

const styles = StyleSheet.create({});
