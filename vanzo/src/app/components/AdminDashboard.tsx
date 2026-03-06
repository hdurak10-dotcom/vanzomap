import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Calendar, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

interface Booking {
  id: string;
  name: string;
  phone: string;
  email: string;
  period: string;
  pickupDate: string;
  returnDate: string;
  notes?: string;
}

interface AdminDashboardProps {
  onUpdateBookedDates: (dates: Date[]) => void;
  bookedDates: Date[];
}

export function AdminDashboard({ onUpdateBookedDates, bookedDates }: AdminDashboardProps) {
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "1",
      name: "Jan de Vries",
      phone: "06 12345678",
      email: "jan@email.nl",
      period: "week",
      pickupDate: "2026-03-10",
      returnDate: "2026-03-17",
      notes: "Extra verhuisdekens graag",
    },
    {
      id: "2",
      name: "Marie Peters",
      phone: "06 98765432",
      email: "marie@email.nl",
      period: "day",
      pickupDate: "2026-03-15",
      returnDate: "2026-03-15",
    },
  ]);

  const [blockDate, setBlockDate] = useState("");

  const handleBlockDate = () => {
    if (blockDate) {
      const newDate = new Date(blockDate);
      onUpdateBookedDates([...bookedDates, newDate]);
      toast.success("Datum geblokkeerd");
      setBlockDate("");
    }
  };

  const handleDeleteBooking = (id: string) => {
    setBookings(bookings.filter((b) => b.id !== id));
    toast.success("Reservering verwijderd");
  };

  const getPeriodLabel = (period: string) => {
    switch (period) {
      case "3hour":
        return "3 Uur";
      case "day":
        return "Dag";
      case "week":
        return "Week";
      case "month":
        return "Maand";
      default:
        return period;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Datum Blokkeren</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="blockDate">Selecteer datum</Label>
              <Input
                id="blockDate"
                type="date"
                value={blockDate}
                onChange={(e) => setBlockDate(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handleBlockDate} disabled={!blockDate}>
                <Plus className="w-4 h-4 mr-2" />
                Blokkeer Datum
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Alle Reserveringen ({bookings.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bookings.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Geen reserveringen gevonden
              </p>
            ) : (
              bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="p-4 border rounded-lg space-y-3 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{booking.name}</h4>
                      <p className="text-sm text-muted-foreground">{booking.email}</p>
                      <p className="text-sm text-muted-foreground">{booking.phone}</p>
                    </div>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDeleteBooking(booking.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">
                      <Calendar className="w-3 h-3 mr-1" />
                      {booking.pickupDate} - {booking.returnDate}
                    </Badge>
                    <Badge>{getPeriodLabel(booking.period)}</Badge>
                  </div>
                  {booking.notes && (
                    <p className="text-sm bg-muted p-2 rounded">
                      <span className="font-medium">Notities:</span> {booking.notes}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
