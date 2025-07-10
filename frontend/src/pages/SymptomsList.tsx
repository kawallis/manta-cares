import { useSymptoms } from "../hooks/useSymptoms";
import { useNavigate } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { PageContainer } from "@/components/ui/page-container";

export default function SymptomList() {
  const navigate = useNavigate();
  const { data: symptoms, isLoading, error } = useSymptoms();

  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (isLoading) return <p>Loading symptoms...</p>;
  if (error) return <p>Error loading symptoms</p>;

  return (
    <PageContainer className="flex flex-col min-h-screen">
      <h1 className="text-2xl font-bold">Select a Symptom</h1>
      <div className="relative flex-1 flex flex-col">
        <div className="flex-1 max-h-full overflow-y-auto my-4 space-y-2 pr-2">
          <RadioGroup onValueChange={setSelectedId} className="space-y-2">
            {symptoms?.map((symptom) => (
              <div key={symptom.id} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={String(symptom.id)}
                  id={`symptom-${symptom.id}`}
                />
                <Label
                  htmlFor={`symptom-${symptom.id}`}
                  className={`${
                    symptom.id.toString() === selectedId
                      ? "border-gray-500"
                      : "border-gray-200"
                  } w-full cursor-pointer rounded-xl border p-4 transition-all space-y-1 flex flex-col items-start`}
                >
                  <h2 className="font-medium capitalize text-lg">
                    {symptom.name}
                  </h2>
                  <p className="block text-sm text-muted-foreground">
                    {symptom.description}
                  </p>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-20" />
      </div>
      <div className="sticky bottom-0 bg-white pt-4 pb-2 z-10">
        <Button
          onClick={() => selectedId && navigate(`/symptoms/${selectedId}`)}
          disabled={!selectedId}
          className="w-full"
        >
          Continue
        </Button>
      </div>
    </PageContainer>
  );
}
