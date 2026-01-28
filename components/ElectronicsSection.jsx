import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

const API = "http://localhost:5000/api";
const FALLBACK =
  "https://cdn-icons-png.flaticon.com/512/869/869636.png";

const ElectronicsSection = () => {
  const [grouped, setGrouped] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const res = await axios.get(`${API}/products?limit=100`);
      const products = res.data.data.products;

      const map = {};
      products.forEach((p) => {
        if (!map[p.category]) map[p.category] = [];
        if (map[p.category].length < 2) map[p.category].push(p);
      });

      setGrouped(map);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 20 }} />;
  }

return (
  <View style={styles.wrapper}>
    {Object.keys(grouped).map((cat) =>
      grouped[cat].map((item) => (
        <View key={item._id} style={styles.cartItem}>
        
          <View style={styles.imageBox}>
            <Image
              source={{
                uri:
                  item.thumbnail ||
                  item.images?.[0] ||
                  FALLBACK,
              }}
              style={styles.image}
            />
          </View>
          <View style={styles.info}>
            <Text style={styles.name} numberOfLines={2}>
              {item.title}
            </Text>

            <Text style={styles.price}>₹{item.price}</Text>

            <View style={styles.qtyRow}>
              <TouchableOpacity style={styles.qtyBtn}>
                <Text style={styles.qtyText}>−</Text>
              </TouchableOpacity>

              <Text style={styles.qtyValue}>1</Text>

              <TouchableOpacity style={styles.qtyBtn}>
                <Text style={styles.qtyText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))
    )}
  </View>
);

};

export default ElectronicsSection;

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 20,
  },

  cartItem: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 12,
    marginBottom: 18,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },

  imageBox: {
    width: 90,
    height: 90,
    borderRadius: 16,
    backgroundColor: "#f3f4f6",
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

  name: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },

  price: {
    fontSize: 15,
    fontWeight: "800",
    color: "#111827",
    marginVertical: 6,
  },

  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    justifyContent: "center",
    alignItems: "center",
  },

  qtyText: {
    fontSize: 16,
    fontWeight: "700",
  },

  qtyValue: {
    marginHorizontal: 14,
    fontSize: 14,
    fontWeight: "700",
  },
});



