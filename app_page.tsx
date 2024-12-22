import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NotificationHandler } from './components/NotificationHandler'
import { MedicationSchedule } from './components/MedicationSchedule'
import { DietChart } from './components/DietChart'
import { CommunitySupport } from './components/CommunitySupport'
import { InsightsAndReports } from './components/InsightsAndReports'
import { HealthCommunication } from './components/HealthCommunication'
import { SymptomTracker } from './components/SymptomTracker'

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Your Health Dashboard</h2>
      
      <NotificationHandler />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <InsightsAndReports />
          <SymptomTracker />
          <MedicationSchedule />
          <HealthMetrics />
        </div>
        <div className="space-y-6">
          <HealthCommunication />
          <DietChart />
          <CommunitySupport />
          <Reminders />
        </div>
      </div>
    </div>
  )
}

function HealthMetrics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Health Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div>
            <Label htmlFor="metric">Metric</Label>
            <Input id="metric" placeholder="e.g., Blood Sugar" />
          </div>
          <div>
            <Label htmlFor="value">Value</Label>
            <Input id="value" placeholder="Enter value" />
          </div>
          <Button type="submit">Log Metric</Button>
        </form>
      </CardContent>
    </Card>
  )
}

function Reminders() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reminders & Tips</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          <li>Remember to take Medicine A at 8:00 AM</li>
          <li>Tip: Stay hydrated throughout the day</li>
          <li>Your doctor's appointment is tomorrow at 2:00 PM</li>
        </ul>
      </CardContent>
    </Card>
  )
}

