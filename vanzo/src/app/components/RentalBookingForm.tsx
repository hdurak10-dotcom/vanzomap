import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { toast } from "sonner";

interface RentalBookingFormProps {
  selectedDate?: Date;
}

export function RentalBookingForm({ selectedDate }: RentalBookingFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    period: "",
    pickupDate: selectedDate ? selectedDate.toISOString().split("T")[0] : "",
    returnDate: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Reservering ontvangen!", {
      description: "We nemen zo snel mogelijk contact met u op.",
    });
    // Reset form
    setFormData({
      name: "",
      phone: "",
      email: "",
      period: "",
      pickupDate: "",
      returnDate: "",
      notes: "",
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Naam *</Label>
          <Input
            id="name"
            placeholder="Uw naam"
            required
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Telefoonnummer *</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="06 12345678"
            required
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">E-mail *</Label>
        <Input
          id="email"
          type="email"
          placeholder="uw@email.nl"
          required
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="period">Huurperiode *</Label>
        <Select value={formData.period} onValueChange={(value) => handleChange("period", value)}>
          <SelectTrigger id="period">
            <SelectValue placeholder="Selecteer een periode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3hour">3 Uur - €35</SelectItem>
            <SelectItem value="day">Daghuur - €70</SelectItem>
            <SelectItem value="week">Week Deal - €420</SelectItem>
            <SelectItem value="month">Maand Deal - €1500</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="pickupDate">Ophaaldatum *</Label>
          <Input
            id="pickupDate"
            type="date"
            required
            min="2026-07-01"
            value={formData.pickupDate}
            onChange={(e) => handleChange("pickupDate", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="returnDate">Inleverdatum *</Label>
          <Input
            id="returnDate"
            type="date"
            required
            min={formData.pickupDate || "2026-07-01"}
            value={formData.returnDate}
            onChange={(e) => handleChange("returnDate", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Extra opmerkingen</Label>
        <Textarea
          id="notes"
          placeholder="Eventuele bijzonderheden of vragen..."
          rows={4}
          value={formData.notes}
          onChange={(e) => handleChange("notes", e.target.value)}
        />
      </div>

      <Button type="submit" className="w-full" size="lg">
        Reservering Bevestigen
      </Button>
    </form>
  );
}
