import type { User } from "./user.interface"

interface AuthState {
  user: User | null
  authToken: string
  accessToken: string
}