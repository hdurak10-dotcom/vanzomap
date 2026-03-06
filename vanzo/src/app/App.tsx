import { useState } from "react";
import { AvailabilityCalendar } from "./components/AvailabilityCalendar";
import { RentalBookingForm } from "./components/RentalBookingForm";
import { AdminDashboard } from "./components/AdminDashboard";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Toaster } from "./components/ui/sonner";
import {
  Truck,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Menu,
  X,
  Settings,
} from "lucide-react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import heroImage from "figma:asset/8ab56ca20a57b2ec597e66c186d77a7640345849.png";
import logoImage from "figma:asset/0edb65c3c45db4edcd331ef3f9603ed05af13de5.png";
import vanLoadingImage from "figma:asset/90903765dfa1e124469c9135cff13acbee6ce0b2.png";
import vanFleetImage from "figma:asset/20764778d272557190834958f0d0e459cbbe1034.png";

export default function App() {
  // Genereer alle datums tot en met juni als volgeboekt
  const generateBookedDates = () => {
    const dates: Date[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const endDate = new Date(2026, 5, 30); // 30 juni 2026 (maand 5 = juni)
    
    let currentDate = new Date(today);
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return dates;
  };

  const [selectedDate, setSelectedDate] = useState<Date>();
  const [bookedDates, setBookedDates] = useState<Date[]>(generateBookedDates());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [currentPage, setCurrentPage] = useState<"home" | "prijzen" | "specificaties" | "beschikbaar" | "reserveren">("home");

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setCurrentPage("reserveren");
    window.scrollTo(0, 0);
  };

  const pricingPlans = [
    {
      title: "3 Uur Huur",
      price: "€35",
      description: "Perfect voor kleine transportklussen.",
      features: ["3 uur huren", "Flexibel ophalen", "Alleen binnen Nederland", "Schoon en onderhouden", "Borg: €250", "Elke extra km: €0,20"],
    },
    {
      title: "Daghuur",
      price: "€70",
      period: "per dag",
      description: "Ideaal voor een volledige verhuisdag.",
      features: ["Hele dag beschikbaar", "200km vrij", "Alleen binnen Nederland", "Verzekering inbegrepen", "Borg: €250", "Elke extra km: €0,20"],
    },
    {
      title: "Week Deal",
      price: "€420",
      period: "per week",
      description: "Voordeliger dan losse dagen.",
      features: ["7 dagen huren", "Onbeperkt km", "Alleen binnen Nederland", "Beste prijs-kwaliteit", "Borg: €250"],
      popular: true,
    },
    {
      title: "Maand Deal",
      price: "€1500",
      period: "per maand",
      description: "Perfect voor bedrijven of langdurige huur.",
      features: ["30 dagen huren", "Onbeperkt km", "Alleen binnen Nederland", "Flexibele verlenging", "Borg: €250"],
      badge: "Goedkoopste",
    },
  ];

  const chauffeurServices = [
    {
      title: "Chauffeur Service",
      price: "€150",
      period: "3 uur",
      description: "24/7 beschikbaar met professionele chauffeur.",
      features: ["150km vrij", "Geen brandstofkosten", "24/7 beschikbaar", "Chauffeur rijdt alleen", "Geen hulp bij sjouwen", "Geen borg"],
      badge: "24/7",
    },
    {
      title: "Chauffeur + Sjouwen (Helpende)",
      price: "€200",
      period: "3 uur",
      description: "Chauffeur die ook helpt met tillen en dragen.",
      features: ["150km vrij", "Geen brandstofkosten", "Hulp bij sjouwen", "24/7 beschikbaar", "Geen borg"],
      popular: true,
    },
  ];

  const features = [
    {
      title: "Grote laadruimte voor meubels en dozen",
      description: "Ruim genoeg voor een complete verhuizing",
    },
    {
      title: "Zuinig dieselverbruik",
      description: "Bespaar op brandstofkosten",
    },
    {
      title: "Comfortabele cabine",
      description: "Rijd met gemak naar je bestemming",
    },
    {
      title: "Goed onderhouden en schoon",
      description: "Altijd in topconditie",
    },
    {
      title: "Ideaal voor verhuizingen en transport",
      description: "Professionele verhuisbus",
    },
  ];

  const navigateTo = (page: "home" | "prijzen" | "specificaties" | "beschikbaar" | "reserveren") => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  // Prijzen Page
  if (currentPage === "prijzen") {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#0A2540" }}>
        <Toaster />
        
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-24">
              <button onClick={() => navigateTo("home")} className="flex items-center">
                <img src={logoImage} alt="Vanzo Busverhuur" className="h-32" />
              </button>

              <div className="hidden md:flex items-center gap-6">
                <button onClick={() => navigateTo("home")} className="transition-colors hover:opacity-70" style={{ color: "#0A2540" }}>
                  Home
                </button>
                <button onClick={() => navigateTo("prijzen")} className="transition-colors hover:opacity-70" style={{ color: "#FF6B00" }}>
                  Prijzen
                </button>
                <button onClick={() => navigateTo("specificaties")} className="transition-colors hover:opacity-70" style={{ color: "#0A2540" }}>
                  Specificaties
                </button>
                <button onClick={() => navigateTo("beschikbaar")} className="transition-colors hover:opacity-70" style={{ color: "#0A2540" }}>
                  Beschikbaarheid
                </button>
                <button onClick={() => navigateTo("reserveren")} className="transition-colors hover:opacity-70" style={{ color: "#0A2540" }}>
                  Reserveren
                </button>
                <Button size="sm" variant="ghost" onClick={() => setShowAdmin(!showAdmin)}>
                  <Settings className="w-4 h-4" />
                </Button>
              </div>

              <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ color: "#0A2540" }}>
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {mobileMenuOpen && (
              <div className="md:hidden py-4 space-y-4 border-t">
                <button onClick={() => navigateTo("home")} className="block w-full text-left transition-colors hover:opacity-70" style={{ color: "#0A2540" }}>
                  Home
                </button>
                <button onClick={() => navigateTo("prijzen")} className="block w-full text-left transition-colors hover:opacity-70" style={{ color: "#FF6B00" }}>
                  Prijzen
                </button>
                <button onClick={() => navigateTo("specificaties")} className="block w-full text-left transition-colors hover:opacity-70" style={{ color: "#0A2540" }}>
                  Specificaties
                </button>
                <button onClick={() => navigateTo("beschikbaar")} className="block w-full text-left transition-colors hover:opacity-70" style={{ color: "#0A2540" }}>
                  Beschikbaarheid
                </button>
                <button onClick={() => navigateTo("reserveren")} className="block w-full text-left transition-colors hover:opacity-70" style={{ color: "#0A2540" }}>
                  Reserveren
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Pricing Page Content */}
        <section className="py-16 md:py-24 bg-white min-h-screen">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl mb-4" style={{ color: "#0A2540" }}>
                Duidelijke Prijzen
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Kies de huurperiode die het beste bij u past. Alle prijzen zijn inclusief BTW.
              </p>
              <p className="text-muted-foreground max-w-2xl mx-auto mt-3">
                Heeft u afwijkende tijden of andere vragen? Vermeld dit in het reserveringsformulier.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {pricingPlans.map((plan) => (
                <Card
                  key={plan.title}
                  className={`relative ${plan.popular ? "border-2" : ""}`}
                  style={plan.popular ? { borderColor: "#FF6B00" } : {}}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge style={{ backgroundColor: "#FF6B00", color: "white" }}>
                        Meest gekozen
                      </Badge>
                    </div>
                  )}
                  {plan.badge && !plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge style={{ backgroundColor: "#0A2540", color: "white" }}>
                        {plan.badge}
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle>{plan.title}</CardTitle>
                    <div className="pt-4">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-4xl" style={{ color: "#FF6B00" }}>
                          {plan.price}
                        </span>
                        {plan.period && (
                          <span className="text-muted-foreground">/{plan.period.split(" ")[1]}</span>
                        )}
                      </div>
                    </div>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <CheckCircle2
                            className="w-5 h-5 shrink-0 mt-0.5"
                            style={{ color: "#FF6B00" }}
                          />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full"
                      style={{ backgroundColor: "#FF6B00", color: "white" }}
                      onClick={() => navigateTo("reserveren")}
                    >
                      Reserveer Nu
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Chauffeur Services Section */}
            <div className="mt-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl mb-4" style={{ color: "#0A2540" }}>
                  Chauffeur Services
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Laat het rijden aan ons over - 24/7 beschikbaar
                </p>
                <p className="text-muted-foreground max-w-2xl mx-auto mt-3 font-medium">
                  Geen borg vereist bij chauffeur services
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {chauffeurServices.map((service) => (
                  <Card
                    key={service.title}
                    className={`relative ${service.popular ? "border-2" : ""}`}
                    style={service.popular ? { borderColor: "#FF6B00" } : {}}
                  >
                    {service.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <Badge style={{ backgroundColor: "#FF6B00", color: "white" }}>
                          Populair
                        </Badge>
                      </div>
                    )}
                    {service.badge && !service.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <Badge style={{ backgroundColor: "#0A2540", color: "white" }}>
                          {service.badge}
                        </Badge>
                      </div>
                    )}
                    <CardHeader className="text-center">
                      <CardTitle>{service.title}</CardTitle>
                      <div className="pt-4">
                        <div className="flex items-baseline justify-center gap-1">
                          <span className="text-4xl" style={{ color: "#FF6B00" }}>
                            {service.price}
                          </span>
                          <span className="text-muted-foreground">/{service.period}</span>
                        </div>
                      </div>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 mb-6">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2">
                            <CheckCircle2
                              className="w-5 h-5 shrink-0 mt-0.5"
                              style={{ color: "#FF6B00" }}
                            />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        className="w-full"
                        style={{ backgroundColor: "#FF6B00", color: "white" }}
                        onClick={() => navigateTo("reserveren")}
                      >
                        Reserveer Nu
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="text-center mt-8">
                <p className="text-muted-foreground mb-4">
                  Heeft u langer nodig? Vul een reserveringsformulier in.
                </p>
                <Button
                  variant="outline"
                  style={{ borderColor: "#0A2540", color: "#0A2540" }}
                  onClick={() => navigateTo("reserveren")}
                >
                  Naar Reserveringsformulier
                </Button>
              </div>
            </div>

            <div className="mt-16 max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle style={{ color: "#0A2540" }}>Extra Informatie</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="mb-2" style={{ color: "#0A2540" }}>Inbegrepen</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" style={{ color: "#FF6B00" }} />
                          Verzekering
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" style={{ color: "#FF6B00" }} />
                          Onbeperkte kilometers
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" style={{ color: "#FF6B00" }} />
                          24/7 pechhulp
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="mb-2" style={{ color: "#0A2540" }}>Voorwaarden</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Borg: €250</li>
                        <li>• Volle tank bij ophalen en inleveren</li>
                        <li>• Rijbewijs B vereist</li>
                        <li>• Max. gewicht: 3500 kg</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Specificaties Page
  if (currentPage === "specificaties") {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#0A2540" }}>
        <Toaster />
        
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-24">
              <button onClick={() => navigateTo("home")} className="flex items-center">
                <img src={logoImage} alt="Vanzo Busverhuur" className="h-32" />
              </button>

              <div className="hidden md:flex items-center gap-6">
                <button onClick={() => navigateTo("home")} className="transition-colors hover:opacity-70" style={{ color: "#0A2540" }}>
                  Home
                </button>
                <button onClick={() => navigateTo("prijzen")} className="transition-colors hover:opacity-70" style={{ color: "#0A2540" }}>
                  Prijzen
                </button>
                <button onClick={() => navigateTo("specificaties")} className="transition-colors hover:opacity-70" style={{ color: "#FF6B00" }}>
                  Specificaties
                </button>
                <button onClick={() => navigateTo("beschikbaar")} className="transition-colors hover:opacity-70" style={{ color: "#0A2540" }}>
                  Beschikbaarheid
                </button>
                <button onClick={() => navigateTo("reserveren")} className="transition-colors hover:opacity-70" style={{ color: "#0A2540" }}>
                  Reserveren
                </button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowAdmin(!showAdmin)}
                >
                  <Settings className="w-4 h-4" />
                </Button>
              </div>

              <button
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{ color: "#0A2540" }}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {mobileMenuOpen && (
              <div className="md:hidden py-4 space-y-4 border-t">
                <button onClick={() => navigateTo("home")} className="block w-full text-left transition-colors hover:opacity-70" style={{ color: "#0A2540" }}>
                  Home
                </button>
                <button onClick={() => navigateTo("prijzen")} className="block w-full text-left transition-colors hover:opacity-70" style={{ color: "#0A2540" }}>
                  Prijzen
                </button>
                <button onClick={() => navigateTo("specificaties")} className="block w-full text-left transition-colors hover:opacity-70" style={{ color: "#FF6B00" }}>
                  Specificaties
                </button>
                <button onClick={() => navigateTo("beschikbaar")} className="block w-full text-left transition-colors hover:opacity-70" style={{ color: "#0A2540" }}>
                  Beschikbaarheid
                </button>
                <button onClick={() => navigateTo("reserveren")} className="block w-full text-left transition-colors hover:opacity-70" style={{ color: "#0A2540" }}>
                  Reserveren
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Specificaties Content */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl mb-4" style={{ color: "#0A2540" }}>
                  Renault Master Specificaties
                </h1>
                <p className="text-muted-foreground text-lg">
                  Technische details en afmetingen van onze verhuisbus
                </p>
              </div>

              {/* Photo Section */}
              <div className="grid md:grid-cols-2 gap-6 mb-12">
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={vanLoadingImage}
                    alt="Bezorger laadt dozen in Renault Master busje bij Amsterdamse gracht"
                    className="w-full h-80 object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={vanFleetImage}
                    alt="Vloot van witte Renault Master busjes"
                    className="w-full h-80 object-cover"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Technische Specificaties */}
                <Card>
                  <CardHeader>
                    <CardTitle style={{ color: "#0A2540" }}>Technische Gegevens</CardTitle>
                    <CardDescription>Motor en prestaties</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Motor</span>
                      <span style={{ color: "#0A2540" }}>2.3 dCi Diesel</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Vermogen</span>
                      <span style={{ color: "#0A2540" }}>130 PK</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Transmissie</span>
                      <span style={{ color: "#0A2540" }}>Handgeschakeld, 6 versnellingen</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Brandstofverbruik</span>
                      <span style={{ color: "#0A2540" }}>7,5 L/100km (gemiddeld)</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Afmetingen */}
                <Card>
                  <CardHeader>
                    <CardTitle style={{ color: "#0A2540" }}>Afmetingen & Capaciteit</CardTitle>
                    <CardDescription>Laadruimte en gewichten</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Lengte</span>
                      <span style={{ color: "#0A2540" }}>5.998 mm</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Breedte</span>
                      <span style={{ color: "#0A2540" }}>2.069 mm</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Hoogte</span>
                      <span style={{ color: "#0A2540" }}>2.522 mm</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Laadruimte</span>
                      <span style={{ color: "#0A2540" }}>10,8 m³</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Max. laadvermogen</span>
                      <span style={{ color: "#0A2540" }}>3.500 kg</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Laadruimte Details */}
                <Card>
                  <CardHeader>
                    <CardTitle style={{ color: "#0A2540" }}>Laadruimte Details</CardTitle>
                    <CardDescription>Interne afmetingen</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Lengte laadruimte</span>
                      <span style={{ color: "#0A2540" }}>3.714 mm</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Breedte laadruimte</span>
                      <span style={{ color: "#0A2540" }}>1.870 mm</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Hoogte laadruimte</span>
                      <span style={{ color: "#0A2540" }}>1.819 mm</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Deuropening breedte</span>
                      <span style={{ color: "#0A2540" }}>1.546 mm</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Deuropening hoogte</span>
                      <span style={{ color: "#0A2540" }}>1.746 mm</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Comfort & Veiligheid */}
                <Card>
                  <CardHeader>
                    <CardTitle style={{ color: "#0A2540" }}>Comfort & Veiligheid</CardTitle>
                    <CardDescription>Uitrusting en features</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5" style={{ color: "#FF6B00" }} />
                        <span>Vrij nieuwe busjes (max. 3 jaar oud)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5" style={{ color: "#FF6B00" }} />
                        <span>Airconditioning</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5" style={{ color: "#FF6B00" }} />
                        <span>Elektrische ramen</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5" style={{ color: "#FF6B00" }} />
                        <span>Radio/Bluetooth</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5" style={{ color: "#FF6B00" }} />
                        <span>ABS & ESP</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5" style={{ color: "#FF6B00" }} />
                        <span>Airbags</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5" style={{ color: "#FF6B00" }} />
                        <span>Cruise control</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5" style={{ color: "#FF6B00" }} />
                        <span>Parkeersensoren achter</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5" style={{ color: "#FF6B00" }} />
                        <span>Trekhaak (optioneel)</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* CTA */}
              <div className="mt-12 text-center">
                <Card className="p-8">
                  <h3 className="text-2xl mb-4" style={{ color: "#0A2540" }}>
                    Klaar om te reserveren?
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Onze Renault Master staat voor u klaar - de goedkoopste in de regio!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      size="lg"
                      style={{ backgroundColor: "#FF6B00", color: "white" }}
                      className="hover:opacity-90"
                      onClick={() => navigateTo("reserveren")}
                    >
                      Reserveer Nu
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      style={{ color: "#0A2540", borderColor: "#0A2540" }}
                      onClick={() => navigateTo("beschikbaar")}
                    >
                      Bekijk Beschikbaarheid
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white py-12 border-t">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div>
                <h3 className="mb-4" style={{ color: "#0A2540" }}>Contact</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4" style={{ color: "#FF6B00" }} />
                    06 12345678
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4" style={{ color: "#FF6B00" }} />
                    info@busjeverhuur.nl
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" style={{ color: "#FF6B00" }} />
                    Amsterdam, Nederland
                  </p>
                </div>
              </div>
              <div>
                <h3 className="mb-4" style={{ color: "#0A2540" }}>Openingstijden</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <Clock className="w-4 h-4" style={{ color: "#FF6B00" }} />
                    Ma - Zo: 09:00 - 18:00
                  </p>
                </div>
              </div>
              <div>
                <h3 className="mb-4" style={{ color: "#0A2540" }}>Volg Ons</h3>
                <div className="flex gap-4">
                  <a href="#" className="transition-colors hover:opacity-70">
                    <Instagram className="w-6 h-6" style={{ color: "#FF6B00" }} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // Beschikbaar Page
  if (currentPage === "beschikbaar") {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#0A2540" }}>
        <Toaster />
        
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-24">
              <button onClick={() => navigateTo("home")} className="flex items-center">
                <img src={logoImage} alt="Vanzo Busverhuur" className="h-32" />
              </button>

              <div className="hidden md:flex items-center gap-6">
                <button onClick={() => navigateTo("home")} className="transition-colors hover:opacity-70" style={{ color: "#0A2540" }}>
                  Home
                </button>
                <button onClick={() => navigateTo("prijzen")} className="transition-colors hover:opacity-70" style={{ color: "#0A2540" }}>
                  Prijzen
                </button>
                <button onClick={() => navigateTo("specificaties")} className="transition-colors hover:opacity-70" style={{ color: "#0A2540" }}>
                  Specificaties
                </button>
                <button onClick={() => navigateTo("beschikbaar")} className="transition-colors hover:opacity-70" style={{ color: "#FF6B00" }}>
                  Beschikbaarheid
                </button>
                <button onClick={() => navigateTo("reserveren")} className="transition-colors hover:opacity-70" style={{ color: "#0A2540" }}>
                  Reserveren
                </button>
                <Button size="sm" variant="ghost" onClick={() => setShowAdmin(!showAdmin)}>
                  <Settings className="w-4 h-4" />
                </Button>
              </div>

              <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ color: "#0A2540" }}>
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {mobileMenuOpen && (
              <div className="md:hidden py-4 space-y-4 border-t">
                <button onClick={() => navigateTo("home")} className="block w-full text-left transition-colors hover:opacity-70" style={{ color: "#0A2540" }}>
                  Home
                </button>
                <button onClick={() => navigateTo("prijzen")} className="block w-full text-left transition-colors hover:opacity-70" style={{ color: "#0A2540" }}>
                  Prijzen
                </button>
                <button onClick={() => navigateTo("specificaties")} className="block w-full text-left transition-colors hover:opacity-70" style={{ color: "#0A2540" }}>
                  Specificaties
                </button>
                <button onClick={() => navigateTo("beschikbaar")} className="block w-full text-left transition-colors hover:opacity-70" style={{ color: "#FF6B00" }}>
                  Beschikbaarheid
                </button>
                <button onClick={() => navigateTo("reserveren")} className="block w-full text-left transition-colors hover:opacity-70" style={{ color: "#0A2540" }}>
                  Reserveren
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Beschikbaar Page Content */}
        <section className="py-16 md:py-24 bg-white min-h-screen">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl mb-4" style={{ color: "#0A2540" }}>
                Bekijk Beschikbaarheid
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Selecteer een beschikbare datum om direct te reserveren
              </p>
            </div>
            <div className="max-w-2xl mx-auto">
              <AvailabilityCalendar
                bookedDates={bookedDates}
                onDateSelect={handleDateSelect}
              />
            </div>
          </div>
        </section>

        {showAdmin && (
          <section className="py-16 bg-white border-y-4" style={{ borderColor: "#FF6B00" }}>
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl" style={{ color: "#0A2540" }}>
                    Admin Dashboard
                  </h2>
                  <Button variant="outline" onClick={() => setShowAdmin(false)}>
                    Sluiten
                  </Button>
                </div>
                <AdminDashboard
                  bookedDates={bookedDates}
                  onUpdateBookedDates={setBookedDates}
                />
              </div>
            </div>
          </section>
        )}
      </div>
    );
  }

  // Reserveren Page
  if (currentPage === "reserveren") {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#0A2540" }}>
        <Toaster />
        
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-24">
              <button onClick={() => navigateTo("home")} className="flex items-center">
                <img src={logoImage} alt="Vanzo Busverhuur" className="h-32" />
              </button>

              <div className="hidden md:flex items-center gap-6">
                <button onClick={() => navigateTo("home")} className="transition-colors hover:opacity-70" style={{ color: "#0A2540" }}>
                  Home
                </button>
                <button onClick={() => navigateTo("prijzen")} className="transition-colors hover:opacity-70" style={{ color: "#0A2540" }}>
                  Prijzen
                </button>
                <button onClick={() => navigateTo("specificaties")} className="transition-colors hover:opacity-70" style={{ color: "#0A2540" }}>
                  Specificaties
                </button>
                <button onClick={() => navigateTo("beschikbaar")} className="transition-colors hover:opacity-70" style={{ color: "#0A2540" }}>
                  Beschikbaarheid
                </button>
                <button onClick={() => navigateTo("reserveren")} className="transition-colors hover:opacity-70" style={{ color: "#FF6B00" }}>
                  Reserveren
                </button>
                <Button size="sm" variant="ghost" onClick={() => setShowAdmin(!showAdmin)}>
                  <Settings className="w-4 h-4" />
                </Button>
              </div>

              <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ color: "#0A2540" }}>
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {mobileMenuOpen && (
              <div className="md:hidden py-4 space-y-4 border-t">
                <button onClick={() => navigateTo("home")} className="block w-full text-left transition-colors hover:opacity-70" style={{ color: "#0A2540" }}>
                  Home
                </button>
                <button onClick={() => navigateTo("prijzen")} className="block w-full text-left transition-colors hover:opacity-70" style={{ color: "#0A2540" }}>
                  Prijzen
                </button>
                <button onClick={() => navigateTo("specificaties")} className="block w-full text-left transition-colors hover:opacity-70" style={{ color: "#0A2540" }}>
                  Specificaties
                </button>
                <button onClick={() => navigateTo("beschikbaar")} className="block w-full text-left transition-colors hover:opacity-70" style={{ color: "#0A2540" }}>
                  Beschikbaarheid
                </button>
                <button onClick={() => navigateTo("reserveren")} className="block w-full text-left transition-colors hover:opacity-70" style={{ color: "#FF6B00" }}>
                  Reserveren
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Reserveren Page Content */}
        <section className="py-16 md:py-24 bg-white min-h-screen">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl mb-4" style={{ color: "#0A2540" }}>
                  Reserveringsformulier
                </h1>
                <p className="text-muted-foreground text-lg">
                  Vul onderstaand formulier in en wij nemen snel contact met u op
                </p>
                {selectedDate && (
                  <Badge className="mt-4" style={{ backgroundColor: "#FF6B00", color: "white" }}>
                    Geselecteerde datum: {selectedDate.toLocaleDateString("nl-NL")}
                  </Badge>
                )}
              </div>
              <Card>
                <CardContent className="pt-6">
                  <RentalBookingForm selectedDate={selectedDate} />
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Home Page
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0A2540" }}>
      <Toaster />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-24">
            <button onClick={() => navigateTo("home")} className="flex items-center">
              <img src={logoImage} alt="Vanzo Busverhuur" className="h-32" />
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              <button onClick={() => navigateTo("home")} className="transition-colors hover:opacity-70" style={{ color: "#FF6B00" }}>
                Home
              </button>
              <button onClick={() => navigateTo("prijzen")} className="transition-colors hover:opacity-70" style={{ color: "#0A2540" }}>
                Prijzen
              </button>
              <button onClick={() => navigateTo("specificaties")} className="transition-colors hover:opacity-70" style={{ color: "#0A2540" }}>
                Specificaties
              </button>
              <button onClick={() => navigateTo("beschikbaar")} className="transition-colors hover:opacity-70" style={{ color: "#0A2540" }}>
                Beschikbaarheid
              </button>
              <button onClick={() => navigateTo("reserveren")} className="transition-colors hover:opacity-70" style={{ color: "#0A2540" }}>
                Reserveren
              </button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowAdmin(!showAdmin)}
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ color: "#0A2540" }}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-4 border-t">
              <button onClick={() => navigateTo("home")} className="block w-full text-left transition-colors hover:opacity-70" style={{ color: "#FF6B00" }}>
                Home
              </button>
              <button onClick={() => navigateTo("prijzen")} className="block w-full text-left transition-colors hover:opacity-70" style={{ color: "#0A2540" }}>
                Prijzen
              </button>
              <button onClick={() => navigateTo("specificaties")} className="block w-full text-left transition-colors hover:opacity-70" style={{ color: "#0A2540" }}>
                Specificaties
              </button>
              <button onClick={() => navigateTo("beschikbaar")} className="block w-full text-left transition-colors hover:opacity-70" style={{ color: "#0A2540" }}>
                Beschikbaarheid
              </button>
              <button onClick={() => navigateTo("reserveren")} className="block w-full text-left transition-colors hover:opacity-70" style={{ color: "#0A2540" }}>
                Reserveren
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `linear-gradient(rgba(10, 37, 64, 0.7), rgba(10, 37, 64, 0.7)), url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="flex justify-center">
              <img src={logoImage} alt="Vanzo" className="h-32" />
            </div>
            <p className="text-xl text-white/90">
              Wij zijn de goedkoopste! Betrouwbaar en perfect voor verhuizingen of transport.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                style={{ backgroundColor: "#FF6B00", color: "white" }}
                className="hover:opacity-90"
                onClick={() => navigateTo("reserveren")}
              >
                Reserveer Nu
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white hover:bg-white/90"
                style={{ color: "#0A2540", borderColor: "white" }}
                onClick={() => navigateTo("beschikbaar")}
              >
                Bekijk Beschikbaarheid
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img
                  src={vanLoadingImage}
                  alt="Bezorger laadt dozen in Renault Master busje bij Amsterdamse gracht"
                  className="w-full h-80 object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img
                  src={vanFleetImage}
                  alt="Vloot van witte Renault Master busjes"
                  className="w-full h-80 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4" style={{ color: "#0A2540" }}>
              Waarom Kiezen Voor Ons
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Wij zijn de goedkoopste! Betrouwbare Renault Master voor al uw transportbehoeften
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: "#FF6B00" }}>
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="mb-2" style={{ color: "#0A2540" }}>Grote Laadruimte</h3>
                <p className="text-sm text-muted-foreground">
                  10,8 m³ laadruimte - perfect voor complete verhuizingen
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: "#FF6B00" }}>
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="mb-2" style={{ color: "#0A2540" }}>Rijbewijs B</h3>
                <p className="text-sm text-muted-foreground">
                  Te rijden met een normaal rijbewijs - geen speciale vergunning nodig
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: "#FF6B00" }}>
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="mb-2" style={{ color: "#0A2540" }}>Goedkoopste Prijzen</h3>
                <p className="text-sm text-muted-foreground">
                  Van €35 voor 3 uur - wij zijn de goedkoopste in de regio!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl" style={{ color: "#0A2540" }}>
              Klaar om te reserveren?
            </h2>
            <p className="text-muted-foreground text-lg">
              Bekijk onze beschikbaarheid en reserveer direct online
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                style={{ backgroundColor: "#FF6B00", color: "white" }}
                className="hover:opacity-90"
                onClick={() => navigateTo("beschikbaar")}
              >
                Bekijk Beschikbaarheid
              </Button>
              <Button
                size="lg"
                variant="outline"
                style={{ borderColor: "#0A2540", color: "#0A2540" }}
                onClick={() => navigateTo("prijzen")}
              >
                Bekijk Prijzen
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Admin Dashboard Section (conditionally shown) */}
      {showAdmin && (
        <section className="py-16 bg-white border-y-4" style={{ borderColor: "#FF6B00" }}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl" style={{ color: "#0A2540" }}>
                  Admin Dashboard
                </h2>
                <Button variant="outline" onClick={() => setShowAdmin(false)}>
                  Sluiten
                </Button>
              </div>
              <AdminDashboard
                bookedDates={bookedDates}
                onUpdateBookedDates={setBookedDates}
              />
            </div>
          </div>
        </section>
      )}

      {/* Contact/Footer Section */}
      <footer className="py-16" style={{ backgroundColor: "#0A2540" }}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="mb-4">
                <img src={logoImage} alt="Vanzo Busverhuur" className="h-32" />
              </div>
              <p className="text-white/70 text-sm">
                Betrouwbare verhuisbus verhuur voor particulieren en bedrijven.
              </p>
            </div>

            <div>
              <h3 className="text-white mb-4">Contact</h3>
              <div className="space-y-3 text-white/70 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" style={{ color: "#FF6B00" }} />
                  <span>+31 6 12 34 56 78</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" style={{ color: "#FF6B00" }} />
                  <span>info@busjehuren.nl</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" style={{ color: "#FF6B00" }} />
                  <span>Amsterdam, Nederland</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-white mb-4">Openingstijden</h3>
              <div className="space-y-2 text-white/70 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" style={{ color: "#FF6B00" }} />
                  <div>
                    <p>Ma - Zo: 09:00 - 18:00</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-white mb-4">Volg Ons</h3>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:opacity-80"
                  style={{ backgroundColor: "#FF6B00" }}
                >
                  <Instagram className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 text-center">
            <div className="flex items-center justify-center gap-2">
              <p className="text-white/60 text-sm">© 2026</p>
              <img src={logoImage} alt="Vanzo" className="h-8" />
              <p className="text-white/60 text-sm">Alle rechten voorbehouden.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
