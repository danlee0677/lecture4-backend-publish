import { z } from "zod"

export type State = {
  start: number
}

export const userZodSchema = z.object({
  
})

export type User = z.infer<typeof userZodSchema>
