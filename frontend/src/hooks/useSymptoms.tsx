import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import type { Symptom } from "@/lib/types";

export function useSymptoms() {
  return useQuery<Symptom[]>({
    queryKey: ["symptoms"],
    queryFn: api.getSymptoms,
  });
}
