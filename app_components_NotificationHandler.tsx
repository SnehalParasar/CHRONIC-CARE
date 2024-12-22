'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"

export function NotificationHandler() {
  const [permission, setPermission] = useState<NotificationPermission>('default')

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission)
    }
  }, [])

  const requestPermission = async () => {
    if ('Notification' in window) {
      const result = await Notification.requestPermission()
      setPermission(result)
    }
  }

  const scheduleNotification = (title: string, body: string, delay: number) => {
    if (permission === 'granted') {
      setTimeout(() => {
        new Notification(title, { body })
      }, delay)
    }
  }

  return (
    <div>
      {permission === 'default' && (
        <Button onClick={requestPermission}>Enable Notifications</Button>
      )}
      {permission === 'denied' && (
        <p>Please enable notifications in your browser settings.</p>
      )}
      {permission === 'granted' && (
        <p>Notifications are enabled. You will receive reminders for your medications.</p>
      )}
    </div>
  )
}

export function useNotifications() {
  const scheduleNotification = (title: string, body: string, delay: number) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      setTimeout(() => {
        new Notification(title, { body })
      }, delay)
    }
  }

  return { scheduleNotification }
}

