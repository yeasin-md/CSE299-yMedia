import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "../../container";
import { getVideos, getCats } from "../../redux/apiCalls";
import CategoryBanner from "./CategoryBanner";
import CategoryContent from "./CategoryContent";
import "./CategoryPage.scss";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.video.videos);
  const categories = useSelector((state) => state.cat.categories);
  const loading = useSelector((state) => state.video.isFetching);

  const [categoryVideos, setCategoryVideos] = useState([]);
  const [categoryTheme, setCategoryTheme] = useState("default");

  useEffect(() => {
    getVideos(dispatch);
    getCats(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (categoryName && videos) {
      const decodedCategoryName = decodeURIComponent(categoryName);
      const filtered = videos.filter((video) => {
        const videoCategory = video.cName;
        if (!videoCategory) return false;
        const videoCategoryStr = String(videoCategory).toLowerCase();
        return videoCategoryStr.includes(decodedCategoryName.toLowerCase());
      });
      setCategoryVideos(filtered);
    }
  }, [categoryName, videos]);

  useEffect(() => {
    const themeMap = {
      action: "action",
      comedy: "comedy",
      drama: "drama",
      horror: "horror",
      thriller: "thriller",
      romance: "romance",
      "sci-fi": "sciFi",
      scifi: "sciFi",
      documentary: "documentary",
      music: "music",
      sports: "sports",
    };

    const decodedCategoryName = categoryName ? decodeURIComponent(categoryName) : "";
    const normalizedName = decodedCategoryName.toLowerCase().trim();
    setCategoryTheme(themeMap[normalizedName] || "default");
  }, [categoryName]);

  return (
    <div className={`category-page category-page-${categoryTheme}`}>
      <Navbar />
      <CategoryBanner
        categoryName={categoryName ? decodeURIComponent(categoryName) : "Category"}
        categoryTheme={categoryTheme}
      />
      <CategoryContent videos={categoryVideos} loading={loading} />
    </div>
  );
};

export default CategoryPage;

