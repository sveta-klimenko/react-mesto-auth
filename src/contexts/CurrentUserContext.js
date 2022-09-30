import { createContext } from "react";
import base_icon from "../images/base_icon.jpg";

export const defaultCurrentUser = {
  name: "Загрузка...",
  about: "Загрузка...",
  avatar: base_icon,
};
export const CurrentUserContext = createContext(defaultCurrentUser);
