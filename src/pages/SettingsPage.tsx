import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import useLocale from "@/hooks/useLocale";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import MainLayout from "@/layout/MainLayout";
import { asyncSetLocale } from "@/states/locale/action";
import { asyncSetTheme } from "@/states/theme/action";

export default function SettingsPage() {
  const locale = useAppSelector((state) => state.locale) as "en" | "id";
  const theme = useAppSelector((state) => state.theme);

  const {
    txtSettings,
    txtSettingsDesc,
    txtLanguage,
    txtLanguageDesc,
    txtDarkMode,
    txtDarkModeDesc,
  } = useLocale();

  const dispatch = useAppDispatch();

  function handleThemeChange() {
    dispatch(asyncSetTheme(theme === "light" ? "dark" : "light"));
  }

  return (
    <MainLayout>
      <main className="flex-1 space-y-6 p-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold tracking-tight">
              {txtSettings}
            </CardTitle>
            <CardDescription className="text-gray-500 dark:text-gray-400">
              {txtSettingsDesc}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="w-full max-w-sm space-y-2">
              <h2 className="text-lg font-bold">{txtLanguage}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {txtLanguageDesc}
              </p>
              <Select
                value={locale === "en" ? "en" : "id"}
                onValueChange={(value) => {
                  dispatch(asyncSetLocale(value));
                }}
              >
                <SelectTrigger>
                  <SelectValue className="peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100">
                    {locale === "en" ? "English" : "Bahasa Indonesia"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="mt-1">
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="id">Bahasa Indonesia</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-full max-w-sm flex-col space-y-2">
              <h2 className="text-lg font-bold">{txtDarkMode}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {txtDarkModeDesc}
              </p>
              <Label htmlFor="dark-mode">{txtDarkMode}</Label>
              <Switch
                className="peer-hidden"
                id="dark-mode"
                checked={theme === "dark"}
                onClick={() => handleThemeChange()}
              />
            </div>
          </CardContent>
        </Card>
      </main>
    </MainLayout>
  );
}
