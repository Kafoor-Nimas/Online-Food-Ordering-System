import {
  TruckIcon,
  LeafIcon,
  ClockIcon,
  ShieldCheckIcon,
  MapPinIcon,
  PhoneIcon,
  MailIcon,
} from "lucide-react";

import basket_icon from "./basket_icon.png";
import logo from "./logo.png";
import header_img from "./header_img.png";
import search_icon from "./search_icon.png";
import menu_icon from "./menu_icon.svg";
import menu_1 from "./salad3.png";
import menu_2 from "./rolls.png";
import menu_3 from "./dessert.png";
import menu_4 from "./sandwich.png";
import menu_5 from "./cake.png";
import menu_6 from "./veg2.png";
import menu_7 from "./pasta3.png";
import menu_8 from "./noodle.png";
import menu_9 from "./biryani.png";
import menu_10 from "./beverages2.png";
import nav_cart_icon from "./nav_cart_icon.svg";

import food_a from "./food_a.png";
import food_b from "./food_b.png";
import food_c from "./food_c.png";
import food_d from "./food_d.png";
import food_e from "./food_e.png";
import food_f from "./food_f.webp";
import food_g from "./food_g.png";
import food_h from "./food_h.png";
import food_i from "./food_i.png";
import food_j from "./food_j.png";
import food_k from "./food_k.png";
import food_l from "./food_l.png";
import food_m from "./food_m.webp";
import food_n from "./food_n.png";
import food_o from "./food_o.png";
import food_p from "./food_p.webp";
import food_q from "./food_q.png";
import food_qq from "./food_q.webp";
import food_r from "./food_r.png";
import food_s from "./food_s.png";
import food_t from "./food_t.webp";
import food_u from "./food_u.webp";
import food_v from "./food_v.png";
import food_w from "./food_w.webp";
import food_x from "./food_x.webp";
import food_y from "./food_y.webp";
import food_z from "./food_z.png";
import food_aa from "./food_aa.webp";
import food_ab from "./food_ab.webp";
import food_ac from "./food_ac.png";
import food_ad from "./food_ad.webp";
import food_ae from "./food_ae.png";
import food_ba from "./food_ba.png";
import food_bb from "./food_bb.png";
import food_bc from "./food_bc.webp";
import food_bd from "./food_bd.png";

import add_icon_white from "./add_icon_white.png";
import add_icon_green from "./add_icon_green.png";
import remove_icon_red from "./remove_icon_red.png";
import app_store from "./app_store.png";
import play_store from "./play_store.png";
import linkedin_icon from "./linkedin_icon.png";
import facebook_icon from "./facebook_icon.png";
import twitter_icon from "./twitter_icon.png";
import cross_icon from "./cross_icon.png";
import selector_icon from "./selector_icon.png";
import rating_starts from "./rating_starts.png";
import profile_icon from "./profile_icon.png";
import bag_icon from "./bag_icon.png";
import logout_icon from "./logout_icon.png";
import parcel_icon from "./parcel_icon.png";

export const assets = {
  logo,
  basket_icon,
  header_img,
  search_icon,
  rating_starts,
  add_icon_green,
  add_icon_white,
  remove_icon_red,
  app_store,
  play_store,
  linkedin_icon,
  facebook_icon,
  twitter_icon,
  cross_icon,
  selector_icon,
  profile_icon,
  logout_icon,
  bag_icon,
  parcel_icon,
  nav_cart_icon,
  menu_icon,
};

export const heroSectionData = {
  hero_features: [
    { icon: TruckIcon, title: "Free Delivery", desc: "Orders over Rs.1000" },
    { icon: ClockIcon, title: "30 Min Delivery", desc: "Fast to your door" },
    { icon: ShieldCheckIcon, title: "Secure Pay", desc: "Safe checkout" },
    { icon: PhoneIcon, title: "24/7 Support", desc: "Always here to help" },
  ],
};

export const categoriesData = [
  {
    slug: "salad",
    name: "Salad",
    image: menu_1,
  },
  { slug: "rolls", name: "Rolls", image: menu_2 },
  { slug: "deserts", name: "Deserts", image: menu_3 },
  { slug: "sandwich", name: "Sandwich", image: menu_4 },
  { slug: "cake", name: "Cake", image: menu_5 },
  { slug: "Pure Veg", name: "Pure Veg", image: menu_6 },
  { slug: "pasta", name: "Pasta", image: menu_7 },
  { slug: "noodles", name: "Noodles", image: menu_8 },
  { slug: "biryani", name: "Biryani", image: menu_9 },
  { slug: "beverages", name: "Beverages", image: menu_10 },
];

export const menu_list = [
  {
    menu_name: "Salad",
    menu_image: menu_1,
  },
  {
    menu_name: "Rolls",
    menu_image: menu_2,
  },
  {
    menu_name: "Deserts",
    menu_image: menu_3,
  },
  {
    menu_name: "Sandwich",
    menu_image: menu_4,
  },
  {
    menu_name: "Cake",
    menu_image: menu_5,
  },
  {
    menu_name: "Pure Veg",
    menu_image: menu_6,
  },
  {
    menu_name: "Pasta",
    menu_image: menu_7,
  },
  {
    menu_name: "Noodles",
    menu_image: menu_8,
  },
];

export const food_list = [
  {
    _id: "1",
    name: "Greek salad",
    image: food_a,
    price: 12,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Salad",
    unit: "plate",
    rating: 4.8,
    reviewCount: 124,
    discount: 15,
    originalPrice: 14,
  },

  {
    _id: "2",
    name: "Veg salad",
    image: food_b,
    price: 18,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Salad",
    unit: "plate",
    rating: 4.5,
    reviewCount: 98,
    discount: 10,
    originalPrice: 20,
  },
  {
    _id: "3",
    name: "Clover Salad",
    image: food_c,
    price: 16,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Salad",
    unit: "bowl",
    rating: 4.7,
    reviewCount: 76,
    discount: 8,
    originalPrice: 18,
  },
  {
    _id: "4",
    name: "Chicken Salad",
    image: food_d,
    price: 24,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Salad",
    unit: "plate",
    rating: 4.9,
    reviewCount: 210,
    discount: 20,
    originalPrice: 30,
  },
  {
    _id: "5",
    name: "Lasagna Rolls",
    image: food_e,
    price: 14,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Rolls",
    unit: "piece",
    rating: 4.3,
    reviewCount: 55,
    discount: 5,
    originalPrice: 15,
  },
  {
    _id: "6",
    name: "Peri Peri Rolls",
    image: food_f,
    price: 12,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Rolls",
    unit: "piece",
    rating: 4.6,
    reviewCount: 143,
    discount: 12,
    originalPrice: 14,
  },
  {
    _id: "7",
    name: "Chicken Rolls",
    image: food_g,
    price: 20,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Rolls",
    unit: "piece",
    rating: 4.4,
    reviewCount: 88,
    discount: 18,
    originalPrice: 25,
  },
  {
    _id: "8",
    name: "Veg Rolls",
    image: food_h,
    price: 15,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Rolls",
    unit: "piece",
    rating: 4.2,
    reviewCount: 34,
    discount: 6,
    originalPrice: 16,
  },
  {
    _id: "9",
    name: "Ripple Ice Cream",
    image: food_i,
    price: 14,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Deserts",
    unit: "cup",
    rating: 4.7,
    reviewCount: 167,
    discount: 14,
    originalPrice: 16,
  },
  {
    _id: "10",
    name: "Fruit Ice Cream",
    image: food_j,
    price: 22,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Deserts",
    unit: "cup",
    rating: 4.5,
    reviewCount: 92,
    discount: 9,
    originalPrice: 24,
  },
  {
    _id: "11",
    name: "Jar Ice Cream",
    image: food_k,
    price: 10,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Deserts",
    unit: "jar",
    rating: 4.3,
    reviewCount: 61,
    discount: 7,
    originalPrice: 11,
  },
  {
    _id: "12",
    name: "Vanilla Ice Cream",
    image: food_l,
    price: 12,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Deserts",
    unit: "cup",
    rating: 4.6,
    reviewCount: 115,
    discount: 11,
    originalPrice: 14,
  },
  {
    _id: "13",
    name: "Chicken Sandwich",
    image: food_m,
    price: 12,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Sandwich",
    unit: "piece",
    rating: 4.8,
    reviewCount: 189,
    discount: 16,
    originalPrice: 14,
  },
  {
    _id: "14",
    name: "Vegan Sandwich",
    image: food_n,
    price: 18,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Sandwich",
    unit: "piece",
    rating: 4.4,
    reviewCount: 73,
    discount: 8,
    originalPrice: 20,
  },
  {
    _id: "15",
    name: "Grilled Sandwich",
    image: food_o,
    price: 16,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Sandwich",
    unit: "piece",
    rating: 4.5,
    reviewCount: 102,
    discount: 10,
    originalPrice: 18,
  },
  {
    _id: "16",
    name: "Bread Sandwich",
    image: food_p,
    price: 24,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Sandwich",
    unit: "piece",
    rating: 4.1,
    reviewCount: 45,
    discount: 5,
    originalPrice: 26,
  },
  {
    _id: "17",
    name: "Cup Cake",
    image: food_q,
    price: 14,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Cake",
    unit: "piece",
    rating: 4.7,
    reviewCount: 138,
    discount: 13,
    originalPrice: 16,
  },
  {
    _id: "18",
    name: "Vegan Cake",
    image: food_r,
    price: 12,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Cake",
    unit: "slice",
    rating: 4.3,
    reviewCount: 67,
    discount: 7,
    originalPrice: 13,
  },
  {
    _id: "19",
    name: "Butterscotch Cake",
    image: food_s,
    price: 20,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Cake",
    unit: "slice",
    rating: 4.6,
    reviewCount: 156,
    discount: 17,
    originalPrice: 24,
  },
  {
    _id: "20",
    name: "Sliced Cake",
    image: food_qq,
    price: 15,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Cake",
    unit: "slice",
    rating: 4.4,
    reviewCount: 84,
    discount: 9,
    originalPrice: 17,
  },
  {
    _id: "21",
    name: "Garlic Mushroom",
    image: food_t,
    price: 14,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Pure Veg",
    unit: "plate",
    rating: 4.5,
    reviewCount: 110,
    discount: 11,
    originalPrice: 16,
  },
  {
    _id: "22",
    name: "Fried Cauliflower",
    image: food_u,
    price: 22,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Pure Veg",
    unit: "plate",
    rating: 4.7,
    reviewCount: 178,
    discount: 14,
    originalPrice: 26,
  },
  {
    _id: "23",
    name: "Mix Veg Pulao",
    image: food_v,
    price: 10,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Pure Veg",
    unit: "bowl",
    rating: 4.2,
    reviewCount: 42,
    discount: 6,
    originalPrice: 11,
  },
  {
    _id: "24",
    name: "Rice Zucchini",
    image: food_w,
    price: 12,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Pure Veg",
    unit: "plate",
    rating: 4.6,
    reviewCount: 129,
    discount: 12,
    originalPrice: 14,
  },
  {
    _id: "25",
    name: "Cheese Pasta",
    image: food_x,
    price: 12,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Pasta",
    unit: "plate",
    rating: 4.8,
    reviewCount: 201,
    discount: 19,
    originalPrice: 15,
  },
  {
    _id: "26",
    name: "Tomato Pasta",
    image: food_y,
    price: 18,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Pasta",
    unit: "plate",
    rating: 4.4,
    reviewCount: 77,
    discount: 8,
    originalPrice: 20,
  },
  {
    _id: "27",
    name: "Creamy Pasta",
    image: food_z,
    price: 16,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Pasta",
    unit: "plate",
    rating: 4.5,
    reviewCount: 95,
    discount: 10,
    originalPrice: 18,
  },
  {
    _id: "28",
    name: "Chicken Pasta",
    image: food_aa,
    price: 24,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Pasta",
    unit: "plate",
    rating: 4.3,
    reviewCount: 58,
    discount: 7,
    originalPrice: 26,
  },
  {
    _id: "29",
    name: "Butter Noodles",
    image: food_ab,
    price: 14,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Noodles",
    unit: "bowl",
    rating: 4.6,
    reviewCount: 133,
    discount: 13,
    originalPrice: 16,
  },
  {
    _id: "30",
    name: "Veg Noodles",
    image: food_ac,
    price: 12,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Noodles",
    unit: "bowl",
    rating: 4.4,
    reviewCount: 69,
    discount: 8,
    originalPrice: 13,
  },
  {
    _id: "31",
    name: "Somen Noodles",
    image: food_ad,
    price: 20,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Noodles",
    unit: "bowl",
    rating: 4.7,
    reviewCount: 148,
    discount: 15,
    originalPrice: 24,
  },
  {
    _id: "32",
    name: "Cooked Noodles",
    image: food_ae,
    price: 15,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Noodles",
    unit: "bowl",
    rating: 4.5,
    reviewCount: 86,
    discount: 9,
    originalPrice: 17,
  },

  {
    _id: "33",
    name: "Chicken Biryani",
    image: food_ba,
    price: 28,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Biryani",
    unit: "plate",
    rating: 4.9,
    reviewCount: 312,
    discount: 15,
    originalPrice: 33,
  },

  {
    _id: "34",
    name: "Mutton Biryani",
    image: food_bb,
    price: 35,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Biryani",
    unit: "plate",
    rating: 4.8,
    reviewCount: 245,
    discount: 12,
    originalPrice: 40,
  },

  {
    _id: "35",
    name: "Mango Lassi",
    image: food_bc,
    price: 8,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Beverages",
    unit: "glass",
    rating: 4.7,
    reviewCount: 167,
    discount: 10,
    originalPrice: 9,
  },

  {
    _id: "36",
    name: "Masala Chai",
    image: food_bd,
    price: 4,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Beverages",
    unit: "cup",
    rating: 4.8,
    reviewCount: 289,
    discount: 5,
    originalPrice: 5,
  },
];
export const food_list_home = [
  {
    _id: "1",
    name: "Greek salad",
    image: food_a,
    price: 12,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Salad",
    unit: "plate",
    rating: 4.8,
    reviewCount: 124,
    discount: 15,
    originalPrice: 14,
  },
  {
    _id: "7",
    name: "Chicken Rolls",
    image: food_g,
    price: 20,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Rolls",
    unit: "piece",
    rating: 4.4,
    reviewCount: 88,
    discount: 18,
    originalPrice: 25,
  },
  {
    _id: "11",
    name: "Jar Ice Cream",
    image: food_k,
    price: 10,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Deserts",
    unit: "jar",
    rating: 4.3,
    reviewCount: 61,
    discount: 7,
    originalPrice: 11,
  },
  {
    _id: "13",
    name: "Chicken Sandwich",
    image: food_m,
    price: 12,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Sandwich",
    unit: "piece",
    rating: 4.8,
    reviewCount: 189,
    discount: 16,
    originalPrice: 14,
  },
  {
    _id: "20",
    name: "Sliced Cake",
    image: food_qq,
    price: 15,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Cake",
    unit: "slice",
    rating: 4.4,
    reviewCount: 84,
    discount: 9,
    originalPrice: 17,
  },
  {
    _id: "22",
    name: "Fried Cauliflower",
    image: food_u,
    price: 22,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Pure Veg",
    unit: "plate",
    rating: 4.7,
    reviewCount: 178,
    discount: 14,
    originalPrice: 26,
  },
  {
    _id: "25",
    name: "Cheese Pasta",
    image: food_x,
    price: 12,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Pasta",
    unit: "plate",
    rating: 4.8,
    reviewCount: 201,
    discount: 19,
    originalPrice: 15,
  },
  {
    _id: "30",
    name: "Veg Noodles",
    image: food_ac,
    price: 12,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Noodles",
    unit: "bowl",
    rating: 4.4,
    reviewCount: 69,
    discount: 8,
    originalPrice: 13,
  },
  {
    _id: "34",
    name: "Mutton Biryani",
    image: food_bb,
    price: 35,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Biryani",
    unit: "plate",
    rating: 4.8,
    reviewCount: 245,
    discount: 12,
    originalPrice: 40,
  },

  {
    _id: "35",
    name: "Mango Lassi",
    image: food_bc,
    price: 8,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Beverages",
    unit: "glass",
    rating: 4.7,
    reviewCount: 167,
    discount: 10,
    originalPrice: 9,
  },

  {
    _id: "2",
    name: "Veg salad",
    image: food_b,
    price: 18,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Salad",
    unit: "plate",
    rating: 4.5,
    reviewCount: 98,
    discount: 10,
    originalPrice: 20,
  },

  {
    _id: "3",
    name: "Clover Salad",
    image: food_c,
    price: 16,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Salad",
    unit: "bowl",
    rating: 4.7,
    reviewCount: 76,
    discount: 8,
    originalPrice: 18,
  },
  {
    _id: "4",
    name: "Chicken Salad",
    image: food_d,
    price: 24,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Salad",
    unit: "plate",
    rating: 4.9,
    reviewCount: 210,
    discount: 20,
    originalPrice: 30,
  },
  {
    _id: "5",
    name: "Lasagna Rolls",
    image: food_e,
    price: 14,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Rolls",
    unit: "piece",
    rating: 4.3,
    reviewCount: 55,
    discount: 5,
    originalPrice: 15,
  },
  {
    _id: "6",
    name: "Peri Peri Rolls",
    image: food_f,
    price: 12,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Rolls",
    unit: "piece",
    rating: 4.6,
    reviewCount: 143,
    discount: 12,
    originalPrice: 14,
  },
  {
    _id: "7",
    name: "Chicken Rolls",
    image: food_g,
    price: 20,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Rolls",
    unit: "piece",
    rating: 4.4,
    reviewCount: 88,
    discount: 18,
    originalPrice: 25,
  },
  {
    _id: "8",
    name: "Veg Rolls",
    image: food_h,
    price: 15,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Rolls",
    unit: "piece",
    rating: 4.2,
    reviewCount: 34,
    discount: 6,
    originalPrice: 16,
  },
  {
    _id: "9",
    name: "Ripple Ice Cream",
    image: food_i,
    price: 14,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Deserts",
    unit: "cup",
    rating: 4.7,
    reviewCount: 167,
    discount: 14,
    originalPrice: 16,
  },
  {
    _id: "10",
    name: "Fruit Ice Cream",
    image: food_j,
    price: 22,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Deserts",
    unit: "cup",
    rating: 4.5,
    reviewCount: 92,
    discount: 9,
    originalPrice: 24,
  },
  {
    _id: "11",
    name: "Jar Ice Cream",
    image: food_k,
    price: 10,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Deserts",
    unit: "jar",
    rating: 4.3,
    reviewCount: 61,
    discount: 7,
    originalPrice: 11,
  },
  {
    _id: "12",
    name: "Vanilla Ice Cream",
    image: food_l,
    price: 12,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Deserts",
    unit: "cup",
    rating: 4.6,
    reviewCount: 115,
    discount: 11,
    originalPrice: 14,
  },
  {
    _id: "13",
    name: "Chicken Sandwich",
    image: food_m,
    price: 12,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Sandwich",
    unit: "piece",
    rating: 4.8,
    reviewCount: 189,
    discount: 16,
    originalPrice: 14,
  },
  {
    _id: "14",
    name: "Vegan Sandwich",
    image: food_n,
    price: 18,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Sandwich",
    unit: "piece",
    rating: 4.4,
    reviewCount: 73,
    discount: 8,
    originalPrice: 20,
  },
  {
    _id: "15",
    name: "Grilled Sandwich",
    image: food_o,
    price: 16,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Sandwich",
    unit: "piece",
    rating: 4.5,
    reviewCount: 102,
    discount: 10,
    originalPrice: 18,
  },
  {
    _id: "16",
    name: "Bread Sandwich",
    image: food_p,
    price: 24,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Sandwich",
    unit: "piece",
    rating: 4.1,
    reviewCount: 45,
    discount: 5,
    originalPrice: 26,
  },
  {
    _id: "17",
    name: "Cup Cake",
    image: food_q,
    price: 14,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Cake",
    unit: "piece",
    rating: 4.7,
    reviewCount: 138,
    discount: 13,
    originalPrice: 16,
  },
  {
    _id: "18",
    name: "Vegan Cake",
    image: food_r,
    price: 12,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Cake",
    unit: "slice",
    rating: 4.3,
    reviewCount: 67,
    discount: 7,
    originalPrice: 13,
  },
  {
    _id: "19",
    name: "Butterscotch Cake",
    image: food_s,
    price: 20,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Cake",
    unit: "slice",
    rating: 4.6,
    reviewCount: 156,
    discount: 17,
    originalPrice: 24,
  },

  {
    _id: "21",
    name: "Garlic Mushroom",
    image: food_t,
    price: 14,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Pure Veg",
    unit: "plate",
    rating: 4.5,
    reviewCount: 110,
    discount: 11,
    originalPrice: 16,
  },

  {
    _id: "23",
    name: "Mix Veg Pulao",
    image: food_v,
    price: 10,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Pure Veg",
    unit: "bowl",
    rating: 4.2,
    reviewCount: 42,
    discount: 6,
    originalPrice: 11,
  },
  {
    _id: "24",
    name: "Rice Zucchini",
    image: food_w,
    price: 12,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Pure Veg",
    unit: "plate",
    rating: 4.6,
    reviewCount: 129,
    discount: 12,
    originalPrice: 14,
  },

  {
    _id: "26",
    name: "Tomato Pasta",
    image: food_y,
    price: 18,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Pasta",
    unit: "plate",
    rating: 4.4,
    reviewCount: 77,
    discount: 8,
    originalPrice: 20,
  },
  {
    _id: "27",
    name: "Creamy Pasta",
    image: food_z,
    price: 16,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Pasta",
    unit: "plate",
    rating: 4.5,
    reviewCount: 95,
    discount: 10,
    originalPrice: 18,
  },
  {
    _id: "28",
    name: "Chicken Pasta",
    image: food_aa,
    price: 24,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Pasta",
    unit: "plate",
    rating: 4.3,
    reviewCount: 58,
    discount: 7,
    originalPrice: 26,
  },
  {
    _id: "29",
    name: "Butter Noodles",
    image: food_ab,
    price: 14,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Noodles",
    unit: "bowl",
    rating: 4.6,
    reviewCount: 133,
    discount: 13,
    originalPrice: 16,
  },

  {
    _id: "31",
    name: "Somen Noodles",
    image: food_ad,
    price: 20,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Noodles",
    unit: "bowl",
    rating: 4.7,
    reviewCount: 148,
    discount: 15,
    originalPrice: 24,
  },
  {
    _id: "32",
    name: "Cooked Noodles",
    image: food_ae,
    price: 15,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Noodles",
    unit: "bowl",
    rating: 4.5,
    reviewCount: 86,
    discount: 9,
    originalPrice: 17,
  },

  {
    _id: "33",
    name: "Chicken Biryani",
    image: food_ba,
    price: 28,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Biryani",
    unit: "plate",
    rating: 4.9,
    reviewCount: 312,
    discount: 15,
    originalPrice: 33,
  },

  {
    _id: "36",
    name: "Masala Chai",
    image: food_bd,
    price: 4,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Beverages",
    unit: "cup",
    rating: 4.8,
    reviewCount: 289,
    discount: 5,
    originalPrice: 5,
  },
];

export const footerLinks = [
  {
    title: "Quick Links",
    links: [
      { text: "Home", url: "/" },
      { text: "Menu", url: "/menu" },
      { text: "My Orders", url: "/my-orders" },
      { text: "Cart", url: "/cart" },
      { text: "Contact Us", url: "#contact" },
    ],
  },
  {
    title: "Food Categories",
    links: [
      { text: "Salads", url: "/menu?category=salad" },
      { text: "Rolls", url: "/menu?category=rolls" },
      { text: "Desserts", url: "/menu?category=deserts" },
      { text: "Pasta", url: "/menu?category=pasta" },
      { text: "Noodles", url: "/menu?category=noodles" },
    ],
  },
  {
    title: "Follow Us",
    links: [
      { text: "Instagram", url: "#" },
      { text: "Twitter", url: "#" },
      { text: "Facebook", url: "#" },
      { text: "YouTube", url: "#" },
    ],
  },
];

export const categories_Data = [
  { slug: "salad", name: "Salad" },
  { slug: "rolls", name: "Rolls" },
  { slug: "deserts", name: "Deserts" },
  { slug: "sandwich", name: "Sandwich" },
  { slug: "cake", name: "Cake" },
  { slug: "Pure Veg", name: "Pure Veg" },
  { slug: "pasta", name: "Pasta" },
  { slug: "noodles", name: "Noodles" },
  { slug: "biryani", name: "Biryani" },
  { slug: "beverages", name: "Beverages" },
];
