import { UUID } from "node:crypto";

export interface User {
  id: UUID;
  username: string;
  password: string;
}
