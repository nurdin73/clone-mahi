import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Recipes from "../views/Recipes.vue";
import Recipe from "../views/Recipe.vue";
import Articles from "../views/Articles.vue";
import Article from "../views/Article.vue";
import ArticleByCategory from "../views/ArticleByCategory.vue";
import Products from "../views/Products.vue";
import Product from "../views/Product.vue";
import ProductByCategory from "../views/ProductByCategory.vue";
import RecipesByCategory from "../views/RecipesByCategory.vue";
import Tag from "../views/Tag.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/recipes",
    name: "Recipes",
    component: Recipes,
  },
  {
    path: "/recipe/:category",
    name: "RecipesByCategory",
    component: RecipesByCategory,
  },
  {
    path: "/recipe/:category/:key",
    name: "Recipe",
    component: Recipe,
  },
  {
    path: "/articles",
    name: "Articles",
    component: Articles,
  },
  {
    path: "/article/:category",
    name: "ArticleByCategory",
    component: ArticleByCategory,
  },
  {
    path: "/article/:category/:key",
    name: "Article",
    component: Article,
  },
  {
    path: "/tag/:key",
    name: "Tag",
    component: Tag,
  },
  {
    path: "/products",
    name: "Products",
    component: Products,
  },
  {
    path: "/product/:category",
    name: "ProductByCategory",
    component: ProductByCategory,
  },
  {
    path: "/product/:category/:key",
    name: "Product",
    component: Product,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
