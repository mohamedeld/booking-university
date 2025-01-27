import z from "zod";

export const signUpSchmea = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  universityId:z.coerce.number(),
  universityCard:z.string().nonempty('university card is required'),
  password: z.string().min(8),
})

export const signInSchmea = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})