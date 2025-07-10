import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import type { Symptom } from "@/lib/types";

export function useSymptom(id: number | string) {
  return useQuery<Symptom>({
    queryKey: ["symptom" + id],
    queryFn: () => api.getSymptomById(id),
  });
}
