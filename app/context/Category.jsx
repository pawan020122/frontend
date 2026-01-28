import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const CategoryContext = createContext();

const API = "http://localhost:5000/api";


const CATEGORY_IMAGES = {
  smartphones: "https://i.pinimg.com/736x/83/39/82/8339823656ee1fb3d5487e9ecd86c971.jpg",
  laptops: "https://i.pinimg.com/736x/ae/73/2e/ae732ecfef3e2a6c6d6d19b73d080ca6.jpg",
  audio: "https://i.pinimg.com/736x/1f/d1/6a/1fd16aaad2f9150a6425876d26ff4c06.jpg",
  footwear: "https://i.pinimg.com/1200x/ab/94/77/ab9477826708ce854e4e5b08cc7df193.jpg",
  gaming: "https://i.pinimg.com/474x/c1/f6/5d/c1f65d71c68a5191d7280a50fff4cdc9.jpg",
  televisions: "https://i.pinimg.com/1200x/70/db/b7/70dbb78aa32eaddd440250833661b086.jpg",
  "home-appliances": "https://i.pinimg.com/736x/9c/9c/9a/9c9c9af5b47d23db3ee71fbc32575dd3.jpg",
  cameras: "https://i.pinimg.com/736x/8b/6b/3d/8b6b3d9602fa5c34422d4bf4f78a8989.jpg",
};

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API}/products/categories`);

    
      const formatted = res.data.data.map((name, index) => ({
        id: index + 1,
        name,
        image:
          CATEGORY_IMAGES[name] ||
          "https://cdn-icons-png.flaticon.com/512/1828/1828817.png",
      }));

      setCategories(formatted);
    } catch (error) {
      console.log("Category fetch failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{ categories, loading }}>
      {children}
    </CategoryContext.Provider>
  );
};