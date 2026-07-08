import { redirectToPlatform } from "@/lib/platform";

export const metadata = {
  title: "Labs",
};

export default function LabsPage() {
  redirectToPlatform("/labs");
}
