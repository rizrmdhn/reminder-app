import localeData from "@/locale";
import { useAppSelector } from "./useRedux";

export default function useLocale() {
  const locale = useAppSelector((state) => state.locale) as "en" | "id";

  return localeData[locale];
}
