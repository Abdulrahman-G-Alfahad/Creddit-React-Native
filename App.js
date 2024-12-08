import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PostNavigation from "./src/navigation/PostNav/PostNavigation";
import ModalContext from "./src/context/ModalContext";
import { useState } from "react";

// Create a client
const queryClient = new QueryClient();

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <ModalContext.Provider value={{ modalVisible, setModalVisible }}>
          <View style={styles.container}>
            <PostNavigation />
          </View>
        </ModalContext.Provider>
      </QueryClientProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
});
