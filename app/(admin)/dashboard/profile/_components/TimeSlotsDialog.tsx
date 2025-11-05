"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Clock, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TimeSlotsDialogProps {
  selectedTimes: string[];
  onTimesChange: (times: string[]) => void;
}

const generateTimeSlots = (): string[] => {
  const times: string[] = [];
  for (let hour = 8; hour <= 20; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
      times.push(time);
    }
  }
  return times;
};

const TIME_SLOTS = generateTimeSlots();

export function TimeSlotsDialog({
  selectedTimes,
  onTimesChange,
}: TimeSlotsDialogProps) {
  const [open, setOpen] = useState(false);
  const [tempSelected, setTempSelected] = useState<string[]>(selectedTimes);

  const handleToggle = (time: string) => {
    setTempSelected((prev) =>
      prev.includes(time)
        ? prev.filter((t) => t !== time)
        : [...prev, time].sort()
    );
  };

  const handleSave = () => {
    onTimesChange(tempSelected);
    setOpen(false);
  };

  const handleCancel = () => {
    setTempSelected(selectedTimes);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="w-full justify-start"
        >
          <Clock className="mr-2 h-4 w-4" />
          {selectedTimes.length > 0
            ? `${selectedTimes.length} time${selectedTimes.length > 1 ? "s" : ""} selected`
            : "Select available times"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Available Times
          </DialogTitle>
          <DialogDescription>
            Select the time slots when your clinic is available for appointments
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
            {TIME_SLOTS.map((time) => {
              const isSelected = tempSelected.includes(time);
              return (
                <button
                  key={time}
                  type="button"
                  onClick={() => handleToggle(time)}
                  className={`relative flex items-center justify-center rounded-lg border p-2 text-sm font-medium transition-all hover:bg-accent ${
                    isSelected
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "bg-background border-border"
                  }`}
                >
                  {time}
                  {isSelected && (
                    <Check className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary-foreground text-primary" />
                  )}
                </button>
              );
            })}
          </div>
          {tempSelected.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2 border-t">
              <span className="text-sm font-medium text-muted-foreground">
                Selected:
              </span>
              {tempSelected.map((time) => (
                <Badge key={time} variant="secondary">
                  {time}
                </Badge>
              ))}
            </div>
          )}
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSave}>
            <Check className="mr-2 h-4 w-4" />
            Save Times
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
