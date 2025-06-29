"use client";

import React, { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import Calendar from "./components/Calendar";
import AppointmentDialog from "./components/AppointmentDialog";
import { ComponentWithOverlayLoader } from "./components/ComponentWithOverlayLoader";
import { lightenColor } from "./utils/lightenColor";

export interface Category {
  id: string;
  label: string;
  color: string;
}
export interface Client {
  id: string;
  name: string;
}

export default function Home() {
  // our live filters
  const [filters, setFilters] = useState({
    category: "", // empty = no filter
    patient: "", // empty = no filter
    start: "",
    end: "",
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [clients, setClients] = useState<Client[]>([]);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data: Category[]) => setCategories(data))
      .catch(console.error);

    fetch("/api/clients")
      .then((res) => res.json())
      .then((data: Client[]) => setClients(data))
      .catch(console.error);
  }, []);

  const handleNew = () => {
    setIsCreating(true);
    setEditingId(null);
    setOpenDialog(true);
  };
  const handleEdit = (id: string) => {
    setIsCreating(false);
    setEditingId(id);
    setOpenDialog(true);
  };
  const onSuccess = () => {
    setOpenDialog(false);
    setFilters({ ...filters });
  };

  const updateFilter = (key: "category" | "patient", value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value === "all" ? "" : value,
    }));
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center space-x-4">
        <Select
          value={filters.category || "all"}
          onValueChange={(v) => updateFilter("category", v)}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Alle Kategorien" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alle Kategorien</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                <span
                  className="inline-block w-2 h-2 rounded-full mr-2"
                  style={{ backgroundColor: lightenColor(cat.color, 70) }}
                ></span>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.patient || "all"}
          onValueChange={(v) => updateFilter("patient", v)}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Patients" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alle Patienten</SelectItem>
            {clients.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button onClick={handleNew}>+ Neuer Termin</Button>
      </div>

      <ComponentWithOverlayLoader isLoading={isLoading}>
        <Calendar
          filters={filters}
          onEventSelect={handleEdit}
          setIsLoading={(isLoading: boolean) => setIsLoading(isLoading)}
        />
      </ComponentWithOverlayLoader>

      <AppointmentDialog
        isOpen={openDialog}
        onClose={() => setOpenDialog(false)}
        eventId={editingId}
        isCreating={isCreating}
        onSuccess={onSuccess}
        clients={clients}
        categories={categories}
      />
    </div>
  );
}
