import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import MainLayout from "@/layout/MainLayout"

export default function SettingsPage() {
  return (
    <MainLayout>
      <main className="flex-1 space-y-6 p-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold tracking-tight">Settings</CardTitle>
            <CardDescription className="text-gray-500 dark:text-gray-400">Update your preferences.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="w-full max-w-sm space-y-2">
              <h2 className="text-lg font-bold">Language</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Choose your preferred language.</p>
              <Select>
                <SelectTrigger>
                  <SelectValue className="peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100">
                    Select language
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="mt-1">
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-full max-w-sm flex-col space-y-2">
              <h2 className="text-lg font-bold">Dark Mode</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Enable dark mode for a different look.</p>
              <Label htmlFor="dark-mode">Dark Mode</Label>
              <Switch className="peer-hidden" id="dark-mode" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save</Button>
          </CardFooter>
        </Card>
      </main>
    </MainLayout>
  )
}
