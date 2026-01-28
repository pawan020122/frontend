import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const API = "http://localhost:5000/api";
const FALLBACK =
  "https://cdn-icons-png.flaticon.com/512/869/869636.png";

const ProductDetail = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API}/products/${id}`);
        setProduct(res.data.data);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#ff4d67" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.loader}>
        <Text>Product not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Details</Text>
        <Ionicons name="heart-outline" size={22} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* IMAGE */}
        <View style={styles.imageWrapper}>
          <Image
            source={{
              uri:
                product.thumbnail && product.thumbnail.length > 0
                  ? product.thumbnail
                  : product.images?.[0] || FALLBACK,
            }}
            style={styles.image}
          />
        </View>

        {/* CONTENT */}
        <View style={styles.content}>
          <Text style={styles.title}>{product.title}</Text>

          <View style={styles.ratingRow}>
            <Ionicons name="star" size={15} color="#facc15" />
            <Text style={styles.rating}>{product.rating}</Text>

            <View
              style={[
                styles.stockBadge,
                {
                  backgroundColor:
                    product.stock > 0 ? "#dcfce7" : "#fee2e2",
                },
              ]}
            >
              <Text
                style={[
                  styles.stockText,
                  {
                    color:
                      product.stock > 0 ? "#16a34a" : "#dc2626",
                  },
                ]}
              >
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </Text>
            </View>
          </View>

          <Text style={styles.price}>₹{product.price}</Text>

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.desc}>{product.description}</Text>

          <Text style={styles.sectionTitle}>Product Info</Text>
          <View style={styles.infoBox}>
            <InfoRow label="Brand" value={product.brand} />
            <InfoRow label="Category" value={product.category} />
            <InfoRow
              label="Warranty"
              value={product.warrantyInformation}
            />
            <InfoRow
              label="Shipping"
              value={product.shippingInformation}
            />
          </View>
        </View>
      </ScrollView>

      {/* FOOTER */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.cartBtn}>
          <Ionicons name="cart-outline" size={20} color="#fff" />
          <Text style={styles.cartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const InfoRow = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value || "-"}</Text>
  </View>
);

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
  },

  imageWrapper: {
    backgroundColor: "#ffffff",
    paddingVertical: 16,
  },

  image: {
    width: "100%",
    height: 260,
    resizeMode: "contain",
  },

  content: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 20,
    marginTop: -20,
  },

  title: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 8,
    color: "#111827",
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  rating: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "600",
  },

  stockBadge: {
    marginLeft: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },

  stockText: {
    fontSize: 12,
    fontWeight: "700",
  },

  price: {
    fontSize: 24,
    fontWeight: "900",
    color: "#ef4444",
    marginBottom: 14,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 10,
    marginBottom: 6,
  },

  desc: {
    fontSize: 14,
    color: "#4b5563",
    lineHeight: 22,
  },

  infoBox: {
    backgroundColor: "#f9fafb",
    borderRadius: 16,
    padding: 14,
    marginTop: 8,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  infoLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6b7280",
  },

  infoValue: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
  },

  footer: {
    padding: 14,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderColor: "#e5e7eb",
  },

  cartBtn: {
    height: 54,
    backgroundColor: "#040101",
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },

  cartText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
  },
});
