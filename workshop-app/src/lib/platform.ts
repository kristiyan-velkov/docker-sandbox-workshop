import { redirect } from "next/navigation";
import { platformUrl } from "@/lib/site-config";

export function redirectToPlatform(path: string): never {
  redirect(platformUrl(path));
}
