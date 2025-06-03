import { z } from "zod"

export type State = {
  start: number
}

export const userZodSchema = z.object({
  username: z.string(),
  password: z.string(),
  roles: z.array(z.string()),
  asset: z.number()
})

export type User = z.infer<typeof userZodSchema>
