'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface User {
  id: string
  name: string
  avatar: string
  conditions: string[]
}

const mockUsers: User[] = [
  { id: '1', name: 'Alice Johnson', avatar: '/placeholder.svg?height=40&width=40', conditions: ['Diabetes', 'Hypertension'] },
  { id: '2', name: 'Bob Smith', avatar: '/placeholder.svg?height=40&width=40', conditions: ['Diabetes', 'Asthma'] },
  { id: '3', name: 'Carol Williams', avatar: '/placeholder.svg?height=40&width=40', conditions: ['Hypertension', 'Arthritis'] },
  { id: '4', name: 'David Brown', avatar: '/placeholder.svg?height=40&width=40', conditions: ['Diabetes', 'Heart Disease'] },
]

export function CommunitySupport() {
  const [similarUsers, setSimilarUsers] = useState<User[]>([])

  useEffect(() => {
    // Simulating an API call to fetch similar users
    const fetchSimilarUsers = async () => {
      // In a real app, this would be an API call that matches users based on their medical history
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSimilarUsers(mockUsers)
    }

    fetchSimilarUsers()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Community Support</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">Connect with others who have similar health experiences:</p>
        <ul className="space-y-4">
          {similarUsers.map(user => (
            <li key={user.id} className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-500">{user.conditions.join(', ')}</p>
              </div>
              <Button variant="outline" size="sm">Connect</Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

