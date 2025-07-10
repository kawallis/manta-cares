import { useParams } from "react-router-dom";
import { useSymptom } from "../hooks/useSymptom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { InterventionsList } from "../components/interventions-list";

const severityLevels = ["mild", "moderate", "severe"] as const;

export default function SymptomDetail() {
  const { id } = useParams<{ id: string }>();

  const {
    data: symptom,
    isLoading: loadingSymptom,
    error: symptomError,
  } = useSymptom(id ?? "");

  const [severity, setSeverity] = useState<string | null>(null);

  if (loadingSymptom) return <p>Loading...</p>;
  if (symptomError) return <p>Symptom not found or an error occurred.</p>;
  if (!symptom) return <p>Something went wrong</p>;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-5xl font-bold capitalize mb-2">{symptom.name}</h1>
        <p className="text-muted-foreground">{symptom.description}</p>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-medium">How severe is this symptom?</h2>
        <RadioGroup onValueChange={setSeverity} className="space-y-2">
          {severityLevels.map((level) => (
            <div key={level} className="flex items-center space-x-2">
              <RadioGroupItem value={level} id={level} />
              <Label htmlFor={level} className="capitalize">
                {level}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {severity && <InterventionsList symptom={symptom} severity={severity} />}
    </div>
  );
}
