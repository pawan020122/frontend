import {StyleSheet,Text,TouchableOpacity,View,TextInput,ActivityIndicator,Image,ScrollView,} from "react-native";
import { useEffect, useState, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

import ElectronicsSection from "../../components/ElectronicsSection";
import { CategoryContext } from "../context/Category";

const API = "http://localhost:5000/api";

const Index = () => {
  const categoryContext = useContext(CategoryContext);

  const categories = categoryContext?.categories || [];
  const categoryLoading = categoryContext?.loading || false;

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("user").then((u) => {
      if (u) setUser(JSON.parse(u));
    });
  }, []);

  const login = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${API}/auth/login`, {
        email,
        password,
      });
      await AsyncStorage.setItem(
        "user",
        JSON.stringify(res.data.data)
      );
      setUser(res.data.data);
    } catch (err) {
      console.log("Login failed", err.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("user");
    setUser(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      {user ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* HEADER */}
          <View style={styles.topHeader}>
            <Text style={styles.headerTitle}>E-commerce</Text>
      <View style={styles.headerIcons}>
              <Ionicons name="search-outline" size={22} />
              <Ionicons name="cart-outline" size={22} />
            </View>
          </View>

          <Image
            source={{
              uri: "https://i.pinimg.com/1200x/16/95/6e/16956eb9de3e27707651aff3e055c168.jpg",
            }}
            style={styles.banner}
          />

          <Text style={styles.sectionTitle}>Categories</Text>

          {categoryLoading ? (
            <ActivityIndicator />
          ) : (
            <View style={styles.categoryGrid}>
              {categories.map((c) => (
                <View key={c._id || c.id} style={styles.categoryCard}>
                  <Image
                    source={{
                      uri:
                        c.image && c.image.length > 0
                          ? c.image
                          : "https://cdn-icons-png.flaticon.com/512/1828/1828817.png",
                    }}
                    style={styles.categoryIcon}
                  />
                  <Text style={styles.categoryText}>
                    {c.name}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* PRODUCTS */}
          <ElectronicsSection />

          {/* LOGOUT */}
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={logout}
          >
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        /* LOGIN */
        <View style={styles.card}>
          <Text style={styles.heading}>Welcome Back</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={styles.loginBtn}
            onPress={login}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.loginText}>Login</Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    paddingHorizontal: 16,
  },

  topHeader: {
    height: 58,
    backgroundColor: "#b0ed08",
    borderRadius: 16,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
  },

  headerIcons: {
    flexDirection: "row",
    gap: 16,
  },

  banner: {
    width: "100%",
    height: 170,
    borderRadius: 18,
    marginBottom: 22,
    resizeMode: "cover",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 14,
  },

  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  categoryCard: {
    width: "23%",
    backgroundColor: "#fff",
    borderRadius: 16,
    alignItems: "center",
    paddingVertical: 14,
    marginBottom: 18,
    elevation: 3,
  },

  categoryIcon: {
    width: 46,
    height: 46,
    marginBottom: 6,
  },

  categoryText: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 26,
    marginTop: 90,
  },

  heading: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 16,
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 16,
  },

  loginBtn: {
    height: 50,
    backgroundColor: "#ff4d67",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  loginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  logoutBtn: {
    height: 48,
    borderWidth: 1.5,
    borderColor: "#ef4444",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 28,
  },

  logoutText: {
    color: "#ef4444",
    fontWeight: "700",
  },
});
