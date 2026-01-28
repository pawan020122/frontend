import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { useRouter } from "expo-router";

const API = "http://localhost:5000/api";
const FALLBACK =
  "https://cdn-icons-png.flaticon.com/512/869/869636.png";

const ProductScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get(`${API}/products?limit=20`);
      setProducts(res.data.data.products);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const openProduct = (id) => {
    router.push(`/product/${id}`);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => openProduct(item._id)}
      activeOpacity={0.9}
    >
      {/* Image */}
      <View style={styles.imageBox}>
        <Image
          source={{
            uri:
              item.thumbnail && item.thumbnail.length > 0
                ? item.thumbnail
                : item.images?.[0] || FALLBACK,
          }}
          style={styles.image}
        />
      </View>

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>

        <Text style={styles.price}>₹{item.price}</Text>

        {/* Quantity UI (static – UI only) */}
        <View style={styles.qtyRow}>
          <View style={styles.qtyBtn}>
            <Text style={styles.qtyText}>−</Text>
          </View>

          <Text style={styles.qtyNumber}>1</Text>

          <View style={styles.qtyBtn}>
            <Text style={styles.qtyText}>+</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#ff4d67" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
    backgroundColor: "#f4f6fb",
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 22,
    padding: 12,
    marginBottom: 16,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },

  imageBox: {
    width: 90,
    height: 90,
    borderRadius: 18,
    backgroundColor: "#f1f5f9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  image: {
    width: 70,
    height: 70,
    resizeMode: "contain",
  },

  info: {
    flex: 1,
    justifyContent: "space-between",
  },

  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },

  price: {
    fontSize: 15,
    fontWeight: "700",
    color: "#2563eb",
    marginTop: 4,
  },

  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  qtyBtn: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "#f1f5f9",
    justifyContent: "center",
    alignItems: "center",
  },

  qtyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },

  qtyNumber: {
    marginHorizontal: 12,
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
});
