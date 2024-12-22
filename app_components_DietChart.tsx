'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface MealPlan {
  [key: string]: string[]
}

const mealPlans: { [key: string]: MealPlan } = {
  diabetes: {
    breakfast: ['Oatmeal with berries', 'Greek yogurt with nuts', 'Whole grain toast with avocado'],
    lunch: ['Grilled chicken salad', 'Lentil soup with vegetables', 'Quinoa bowl with roasted veggies'],
    dinner: ['Baked salmon with asparagus', 'Turkey and vegetable stir-fry', 'Vegetarian chili'],
    snacks: ['Apple slices with almond butter', 'Carrot sticks with hummus', 'Handful of mixed nuts']
  },
  hypertension: {
    breakfast: ['Whole grain cereal with low-fat milk', 'Egg white omelet with spinach', 'Banana smoothie'],
    lunch: ['Tuna sandwich on whole wheat bread', 'Vegetable soup with crackers', 'Greek salad with feta cheese'],
    dinner: ['Grilled lean beef with sweet potato', 'Baked chicken with roasted vegetables', 'Tofu and vegetable curry'],
    snacks: ['Low-fat yogurt', 'Unsalted popcorn', 'Fresh fruit salad']
  },
  default: {
    breakfast: ['Balanced breakfast option'],
    lunch: ['Balanced lunch option'],
    dinner: ['Balanced dinner option'],
    snacks: ['Healthy snack option']
  }
}

export function DietChart() {
  const [condition, setCondition] = useState<string>('default')
  const [mealPlan, setMealPlan] = useState<MealPlan>(mealPlans.default)

  useEffect(() => {
    // Simulating an API call to fetch the user's condition
    const fetchUserCondition = async () => {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setCondition('diabetes') // Simulating that the user has diabetes
    }

    fetchUserCondition()
  }, [])

  useEffect(() => {
    setMealPlan(mealPlans[condition] || mealPlans.default)
  }, [condition])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personalized Diet Chart</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Select value={condition} onValueChange={setCondition}>
            <SelectTrigger>
              <SelectValue placeholder="Select health condition" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">General Health</SelectItem>
              <SelectItem value="diabetes">Diabetes</SelectItem>
              <SelectItem value="hypertension">Hypertension</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Meal</TableHead>
              <TableHead>Recommended Foods</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(mealPlan).map(([meal, foods]) => (
              <TableRow key={meal}>
                <TableCell className="font-medium capitalize">{meal}</TableCell>
                <TableCell>
                  <ul className="list-disc pl-4">
                    {foods.map((food, index) => (
                      <li key={index}>{food}</li>
                    ))}
                  </ul>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

