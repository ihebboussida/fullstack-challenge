"use client";

import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Category, Client } from "../page";
import { lightenColor } from "../utils/lightenColor";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  eventId: string | null;
  isCreating: boolean;
  onSuccess: () => void;
  categories: Category[];
  clients: Client[];
}

type FormState = {
  title: string;
  category: string;
  patient: string;
  start: string;
  end: string;
  location: string;
  notes: string;
};

export default function AppointmentDialog({
  isOpen,
  onClose,
  eventId,
  isCreating,
  onSuccess,
  categories,
  clients,
}: Props) {
  const [form, setForm] = useState<FormState>({
    title: "",
    category: "",
    patient: "",
    start: "",
    location: "",
    end: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});

  useEffect(() => {
    if (!isCreating && eventId) {
      setLoading(true);
      fetch(`/api/appointments/${eventId}`)
        .then(async (res) => {
          if (!res.ok) throw new Error(`Status ${res.status}`);
          return res.json();
        })
        .then((data) => {
          setForm({
            title: data.title,
            category: data.category,
            patient: data.patient,
            start: new Date(data.start).toISOString().slice(0, 16),
            end: new Date(data.end).toISOString().slice(0, 16),
            notes: data.notes || "",
            location: data.location || "",
          });
        })
        .catch((err) => {
          console.error(err);
          setError("Failed to load appointment");
        })
        .finally(() => setLoading(false));
    } else {
      setForm({
        title: "",
        category: "",
        patient: "",
        start: "",
        end: "",
        location: "",
        notes: "",
      });
      setError(null);
    }
  }, [isCreating, eventId]);

  const handleSubmit = async () => {
    const newErrors: typeof errors = {};

    if (!form.title.trim()) newErrors.title = "Titel ist erforderlich.";
    if (!form.category) newErrors.category = "Kategorie auswählen.";
    if (!form.patient) newErrors.patient = "Patient auswählen.";
    if (!form.start) newErrors.start = "Startzeit ist erforderlich.";
    if (!form.end) newErrors.end = "Endzeit ist erforderlich.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    setLoading(true);
    setError(null);

    const url = isCreating
      ? "/api/appointments"
      : `/api/appointments/${eventId}`;
    const method = isCreating ? "POST" : "PUT";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || `Status ${res.status}`);
      }
      onSuccess();
    } catch (err) {
      if (err instanceof Error) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } else {
        console.error("Unknown error", err);
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogTitle>
          Termin {isCreating ? "erstellen" : "bearbeiten"}{" "}
        </DialogTitle>
        {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
        <div className="space-y-4 mt-2">
          <Input
            placeholder="Titel"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            disabled={loading}
          />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title}</p>
          )}

          <Select
            value={form.category}
            onValueChange={(v) => setForm({ ...form, category: v })}
            disabled={loading}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Kategorie" />
            </SelectTrigger>
            {categories && (
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    <span
                      className="inline-block w-2 h-2 rounded-full mr-2"
                      style={{
                        backgroundColor: lightenColor(category.color, 70),
                      }}
                    ></span>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            )}
          </Select>

          {errors.category && (
            <p className="text-sm text-red-500">{errors.category}</p>
          )}

          <Select
            value={form.patient}
            onValueChange={(v) => setForm({ ...form, patient: v })}
            disabled={loading}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Patient" />
            </SelectTrigger>
            {clients && (
              <SelectContent>
                {clients.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            )}
          </Select>

          {errors.patient && (
            <p className="text-sm text-red-500">{errors.patient}</p>
          )}

          <Input
            type="datetime-local"
            value={form.start}
            onChange={(e) => setForm({ ...form, start: e.target.value })}
            disabled={loading}
          />

          {errors.start && (
            <p className="text-sm text-red-500">{errors.start}</p>
          )}

          <Input
            type="datetime-local"
            value={form.end}
            onChange={(e) => setForm({ ...form, end: e.target.value })}
            disabled={loading}
          />

          {errors.end && <p className="text-sm text-red-500">{errors.end}</p>}

          <Input
            placeholder="Ort"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            disabled={loading}
          />

          <textarea
            className="w-full p-2 border rounded"
            placeholder="Notizen"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            disabled={loading}
          />
        </div>

        <div className="mt-4 flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Abbrechen
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Speichern..." : isCreating ? "Erstellen" : "Speichern"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
