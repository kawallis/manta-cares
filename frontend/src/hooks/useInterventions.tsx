import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import type { Intervention } from "@/lib/types";

export function useInterventions() {
  return useQuery<Intervention[]>({
    queryKey: ["interventions"],
    queryFn: api.getInterventions,
  });
}
