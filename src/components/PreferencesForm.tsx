import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { TripPreferences } from "@/lib/types";

export const PreferencesForm = () => {
  const { toast } = useToast();
  const [preferences, setPreferences] = useState<TripPreferences>({
    preferences: "",
    budget: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Itinerary Saved",
      description: "Your trip preferences have been saved successfully!",
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Customize Your Preferences</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="preferences" className="text-sm font-medium">
              Your Preferences
            </label>
            <Input
              id="preferences"
              placeholder="Enter your preferences"
              value={preferences.preferences}
              onChange={(e) =>
                setPreferences({ ...preferences, preferences: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="budget" className="text-sm font-medium">
              Your Budget
            </label>
            <Input
              id="budget"
              type="number"
              placeholder="Enter your budget"
              value={preferences.budget || ""}
              onChange={(e) =>
                setPreferences({
                  ...preferences,
                  budget: parseFloat(e.target.value) || 0,
                })
              }
            />
          </div>
          <Button type="submit" className="w-full">
            Save Itinerary
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};