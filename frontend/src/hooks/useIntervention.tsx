import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import type { Intervention } from "@/lib/types";

export function useIntervention(id: number | string) {
  return useQuery<Intervention>({
    queryKey: [`intervention-${id}`],
    queryFn: () => api.getInterventionById(id),
  });
}
