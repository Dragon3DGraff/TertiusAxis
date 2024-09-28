import { createContext } from "react";
import { TertiusAxis } from "../../engine/TertiusAxis";

export const TertiusAxisContext = createContext<TertiusAxis | null>(null);
