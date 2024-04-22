import { z } from 'zod'

export const envSchema = z.object({
  ACCESS_TOKEN: z.string().default('ABCDE12345'),
  DATABASE_CONNECTION_URL: z.string().url(),
})

export type Env = z.infer<typeof envSchema>
