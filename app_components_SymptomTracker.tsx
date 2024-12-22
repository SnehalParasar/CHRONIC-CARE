'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertCircle, Calendar } from 'lucide-react'

interface Symptom {
  name: string
  severity: number
}

interface Solution {
  symptom: string
  advice: string
}

// Mock data for previous medical history and solutions
const mockMedicalHistory: Symptom[] = [
  { name: "Headache", severity: 5 },
  { name: "Nausea", severity: 3 },
  { name: "Fatigue", severity: 4 },
]

const mockSolutions: Solution[] = [
  { symptom: "Headache", advice: "Rest in a quiet, dark room. Apply a cold compress to your forehead. Stay hydrated." },
  { symptom: "Nausea", advice: "Eat small, frequent meals. Avoid strong odors. Try ginger tea or peppermint." },
  { symptom: "Fatigue", advice: "Ensure you're getting enough sleep. Consider light exercise. Check your diet for balanced nutrition." },
]

export function SymptomTracker() {
  const [symptom, setSymptom] = useState('')
  const [severity, setSeverity] = useState('')
  const [solution, setSolution] = useState<string | null>(null)
  const [showAppointmentDialog, setShowAppointmentDialog] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const severityNum = parseInt(severity)
    if (symptom && !isNaN(severityNum)) {
      const matchedSolution = mockSolutions.find(s => s.symptom.toLowerCase() === symptom.toLowerCase())
      if (matchedSolution) {
        setSolution(matchedSolution.advice)
      } else {
        setSolution("No specific advice found for this symptom. Please consult your healthcare provider.")
      }

      if (severityNum > 7) {
        setShowAppointmentDialog(true)
      }
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Symptom Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="symptom">Symptom</Label>
            <Input 
              id="symptom" 
              value={symptom} 
              onChange={(e) => setSymptom(e.target.value)} 
              placeholder="Enter symptom" 
            />
          </div>
          <div>
            <Label htmlFor="severity">Severity (1-10)</Label>
            <Input 
              id="severity" 
              type="number" 
              min="1" 
              max="10" 
              value={severity} 
              onChange={(e) => setSeverity(e.target.value)} 
            />
          </div>
          <Button type="submit">Log Symptom</Button>
        </form>

        {solution && (
          <Alert className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Recommended Action</AlertTitle>
            <AlertDescription>{solution}</AlertDescription>
          </Alert>
        )}

        <Dialog open={showAppointmentDialog} onOpenChange={setShowAppointmentDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule an Appointment</DialogTitle>
              <DialogDescription>
                Your symptom severity is high. We recommend scheduling an appointment with your doctor as soon as possible.
              </DialogDescription>
            </DialogHeader>
            <AppointmentScheduler />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}

function AppointmentScheduler() {
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string>('')

  const handleSchedule = () => {
    // In a real application, this would send the appointment request to the backend
    alert(`Appointment scheduled for ${selectedDate} at ${selectedTime}`)
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="date">Date</Label>
        <Input 
          id="date" 
          type="date" 
          value={selectedDate} 
          onChange={(e) => setSelectedDate(e.target.value)} 
        />
      </div>
      <div>
        <Label htmlFor="time">Time</Label>
        <Input 
          id="time" 
          type="time" 
          value={selectedTime} 
          onChange={(e) => setSelectedTime(e.target.value)} 
        />
      </div>
      <Button onClick={handleSchedule} className="w-full">
        <Calendar className="mr-2 h-4 w-4" /> Schedule Appointment
      </Button>
    </div>
  )
}

