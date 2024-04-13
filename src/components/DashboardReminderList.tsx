import ReminderItem from "./ReminderItem"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"

export default function DashboardReminderList() {
  return (
    <Card>
      <CardHeader className="pb-0">
        <CardTitle>Reminders</CardTitle>
        <CardDescription>Upcoming events</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          <ReminderItem />
          <ReminderItem />
          <ReminderItem />
          <ReminderItem />
        </div>
      </CardContent>
    </Card>
  )
}
