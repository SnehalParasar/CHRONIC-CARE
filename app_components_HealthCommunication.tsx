'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, Send } from 'lucide-react'

interface Message {
  id: number
  sender: 'patient' | 'provider'
  content: string
  timestamp: string
}

export function HealthCommunication() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'patient', content: "I've been experiencing frequent headaches. Could this be related to my medication?", timestamp: '2023-06-10 09:30' },
    { id: 2, sender: 'provider', content: "Thank you for reaching out. Headaches can sometimes be a side effect of certain medications. Can you provide more details about the frequency and intensity of your headaches?", timestamp: '2023-06-10 11:15' },
  ])
  const [newMessage, setNewMessage] = useState('')
  const [sharedData, setSharedData] = useState<string | null>(null)
  const [dataType, setDataType] = useState<string>('bloodSugar')

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        sender: 'patient',
        content: newMessage,
        timestamp: new Date().toLocaleString()
      }
      setMessages([...messages, message])
      setNewMessage('')
    }
  }

  const shareData = () => {
    if (sharedData) {
      const message: Message = {
        id: messages.length + 1,
        sender: 'patient',
        content: `Shared ${dataType} data: ${sharedData}`,
        timestamp: new Date().toLocaleString()
      }
      setMessages([...messages, message])
      setSharedData(null)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Communicate with Your Healthcare Provider</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="border rounded-lg p-4 h-64 overflow-y-auto">
            {messages.map((message) => (
              <div key={message.id} className={`mb-4 ${message.sender === 'patient' ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block p-2 rounded-lg ${message.sender === 'patient' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                  <p>{message.content}</p>
                  <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <Textarea
              placeholder="Type your message here..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={sendMessage} size="icon">
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
          <div className="border-t pt-4">
            <h4 className="font-semibold mb-2">Share Health Data</h4>
            <div className="flex items-end space-x-2">
              <div className="flex-grow space-y-2">
                <Label htmlFor="dataType">Data Type</Label>
                <Select value={dataType} onValueChange={setDataType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select data type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bloodSugar">Blood Sugar</SelectItem>
                    <SelectItem value="bloodPressure">Blood Pressure</SelectItem>
                    <SelectItem value="weight">Weight</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-grow space-y-2">
                <Label htmlFor="dataValue">Value</Label>
                <Input
                  id="dataValue"
                  placeholder="Enter value"
                  value={sharedData || ''}
                  onChange={(e) => setSharedData(e.target.value)}
                />
              </div>
              <Button onClick={shareData}>Share</Button>
            </div>
          </div>
          <Alert>
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Secure Communication</AlertTitle>
            <AlertDescription>
              This communication is encrypted and complies with healthcare privacy regulations.
            </AlertDescription>
          </Alert>
        </div>
      </CardContent>
    </Card>
  )
}

