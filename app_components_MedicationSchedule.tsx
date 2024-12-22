'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNotifications } from './NotificationHandler'

interface Medication {
  name: string
  time: string
}

export function MedicationSchedule() {
  const [medications, setMedications] = useState<Medication[]>([
    { name: 'Medicine A', time: '08:00' },
    { name: 'Medicine B', time: '14:00' },
    { name: 'Medicine C', time: '20:00' },
  ])
  const [newMedication, setNewMedication] = useState<Medication>({ name: '', time: '' })
  const { scheduleNotification } = useNotifications()

  const addMedication = () => {
    if (newMedication.name && newMedication.time) {
      setMedications([...medications, newMedication])
      scheduleReminder(newMedication)
      setNewMedication({ name: '', time: '' })
    }
  }

  const scheduleReminder = (medication: Medication) => {
    const [hours, minutes] = medication.time.split(':').map(Number)
    const now = new Date()
    const reminderTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes)
    
    if (reminderTime < now) {
      reminderTime.setDate(reminderTime.getDate() + 1)
    }

    const delay = reminderTime.getTime() - now.getTime()
    scheduleNotification(
      'Medication Reminder',
      `Time to take ${medication.name}`,
      delay
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Medication Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {medications.map((med, index) => (
            <li key={index}>
              {med.name} - {med.time}
              <Button 
                variant="outline" 
                size="sm" 
                className="ml-2"
                onClick={() => scheduleReminder(med)}
              >
                Set Reminder
              </Button>
            </li>
          ))}
        </ul>
        <div className="mt-4 space-y-2">
          <div>
            <Label htmlFor="med-name">Medication Name</Label>
            <Input 
              id="med-name"
              value={newMedication.name}
              onChange={(e) => setNewMedication({...newMedication, name: e.target.value})}
              placeholder="Enter medication name"
            />
          </div>
          <div>
            <Label htmlFor="med-time">Time</Label>
            <Input 
              id="med-time"
              type="time"
              value={newMedication.time}
              onChange={(e) => setNewMedication({...newMedication, time: e.target.value})}
            />
          </div>
          <Button onClick={addMedication}>Add Medication</Button>
        </div>
      </CardContent>
    </Card>
  )
}

