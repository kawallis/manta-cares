import { Card, CardContent } from "@/components/ui/card";
import { useInterventions } from "../hooks/useInterventions";
import type { FC } from "react";
import type { Intervention, Symptom } from "../lib/types";

interface InterventionsListProps {
  symptom: Symptom;
  severity: string | null;
}

export const InterventionsList: FC<InterventionsListProps> = ({
  symptom,
  severity,
}) => {
  const { data: interventions, isLoading, error } = useInterventions();

  if (error) return <p>Interventions could not be loaded.</p>;
  if (isLoading) return <p>Loading interventions...</p>;
  if (!interventions) return <p>Something went wrong</p>;

  const filtered = interventions.filter(
    (i: Intervention) =>
      symptom.interventions.includes(i.id) &&
      i.severity.includes(severity ?? "")
  );

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Recommended Interventions</h2>
      {filtered.length === 0 && (
        <p className="text-muted-foreground">
          No interventions found for this severity
        </p>
      )}
      {filtered.map((i: Intervention) => (
        <Card key={i.id} className={i.SOS ? "border-red-500 bg-red-50" : ""}>
          <CardContent className="p-4">
            <p className="text-lg font-medium">{i.name}</p>
            <p className="text-sm">{i.description}</p>
            {i.SOS && (
              <p className="text-red-600 font-bold mt-2">
                S.O.S — seek immediate attention
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
