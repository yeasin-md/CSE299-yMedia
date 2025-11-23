import React from "react";
import "./CategoryBanner.scss";

const CategoryBanner = ({ categoryName, categoryTheme }) => {
  const getGradient = (theme) => {
    const gradients = {
      action: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      comedy: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      drama: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      horror: "linear-gradient(135deg, #434343 0%, #000000 100%)",
      thriller: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      romance: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
      sciFi: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
      documentary: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      music: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      sports: "linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)",
      default: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    };
    return gradients[theme] || gradients.default;
  };

  const getCategoryTitle = (name) => {
    if (!name) return "Category";
    return name
      .split(/[\s-]+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <div
      className="category-banner"
      style={{ background: getGradient(categoryTheme) }}
    >
      <div className="category-banner-content">
        <h1 className="category-banner-title">{getCategoryTitle(categoryName)}</h1>
        <p className="category-banner-subtitle">Explore curated content</p>
      </div>
    </div>
  );
};

export default CategoryBanner;

