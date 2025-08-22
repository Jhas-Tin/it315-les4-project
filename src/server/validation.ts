import {z} from "zod";

export const CreateKeySchema = z.object({name: z.string().min(1).max(256)});
export const DeleteKeySchema = z.object({ keyId: z.string().uuid() })


