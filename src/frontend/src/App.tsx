import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertCircle,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  ExternalLink,
  Phone,
  Server,
  Shield,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

const servers = [
  {
    name: "Bihar Board Official",
    url: "https://biharboardonline.bihar.gov.in",
    tag: "Official",
  },
  {
    name: "Results Bihar Board",
    url: "https://results.biharboardonline.com",
    tag: "Primary",
  },
  {
    name: "Bihar Board Result",
    url: "https://result.biharboard.ac.in",
    tag: "Mirror",
  },
  { name: "India Results", url: "https://www.indiaresults.com", tag: "Backup" },
  { name: "Exam Results", url: "https://www.examresults.net", tag: "Backup" },
  { name: "Results.gov.in", url: "https://results.gov.in", tag: "Govt" },
  { name: "Jagran Result", url: "https://result.jagran.com", tag: "Mirror" },
  { name: "Manabadi", url: "https://www.manabadi.co.in", tag: "Backup" },
  { name: "Schools9", url: "https://www.schools9.com", tag: "Mirror" },
  {
    name: "Bihar Results NIC",
    url: "https://biharresults.nic.in",
    tag: "Govt",
  },
];

const steps = [
  {
    num: 1,
    title: "अपना Roll Number डालें",
    desc: "ऊपर दिए गए form में अपना 8-अंकीय Roll Number सावधानी से भरें।",
  },
  {
    num: 2,
    title: "Roll Code भरें",
    desc: "अपने Admit Card से Roll Code नोट करके भरें।",
  },
  {
    num: 3,
    title: "Check Result पर Click करें",
    desc: "बटन दबाएं — आप Official BSEB Result Page पर redirect होंगे।",
  },
  {
    num: 4,
    title: "Result देखें",
    desc: "आपका Result screen पर show होगा — सभी subjects के marks दिखेंगे।",
  },
  {
    num: 5,
    title: "Marksheet Download करें",
    desc: "Result page से official digital marksheet download/print करें।",
  },
];

const importantDates = [
  { event: "Intermediate Exam शुरू", date: "1 February 2026", status: "done" },
  {
    event: "Intermediate Exam समाप्त",
    date: "13 February 2026",
    status: "done",
  },
  { event: "Result घोषणा", date: "23 March 2026 — AAJ", status: "live" },
  {
    event: "Original Marksheet",
    date: "Result के बाद स्कूल से",
    status: "upcoming",
  },
  { event: "Compartment Exam", date: "Announced later", status: "upcoming" },
];

const stats = [
  {
    icon: Users,
    value: "13 लाख+",
    label: "Students (2026)",
    color: "text-blue-600",
  },
  {
    icon: TrendingUp,
    value: "80%+",
    label: "Pass Rate",
    color: "text-green-600",
  },
  {
    icon: Clock,
    value: "समय पर",
    label: "Result घोषणा",
    color: "text-orange-600",
  },
];

const highlights = [
  {
    icon: Award,
    title: "Topper List",
    desc: "Result के साथ District और State Toppers list देखें।",
  },
  {
    icon: Shield,
    title: "सुरक्षित Portal",
    desc: "यह portal सिर्फ Official links redirect करता है।",
  },
  {
    icon: Phone,
    title: "Helpline",
    desc: "BSEB Helpline: 0612-2232074 | समस्या होने पर call करें।",
  },
];

const tagColors: Record<string, string> = {
  Official: "bg-green-100 text-green-800 border-green-200",
  Primary: "bg-blue-100 text-blue-800 border-blue-200",
  Govt: "bg-purple-100 text-purple-800 border-purple-200",
  Mirror: "bg-orange-100 text-orange-800 border-orange-200",
  Backup: "bg-gray-100 text-gray-700 border-gray-200",
};

const COUNTDOWN_SECONDS = 90 * 60; // 90 minutes

function formatCountdown(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [
    String(h).padStart(2, "0"),
    String(m).padStart(2, "0"),
    String(s).padStart(2, "0"),
  ].join(":");
}

export default function App() {
  const [rollNumber, setRollNumber] = useState("");
  const [rollCode, setRollCode] = useState("");
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);
  const isLive = countdown === 0;

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleCheckResult = () => {
    window.open(
      "https://results.biharboardonline.com/",
      "_blank",
      "noopener,noreferrer",
    );
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col font-body bg-background">
      {/* LIVE Alert Banner */}
      <div
        className={`relative overflow-hidden text-white text-center py-3 px-4 text-sm font-bold ${
          isLive
            ? "bg-green-600"
            : "bg-gradient-to-r from-red-600 via-orange-500 to-red-600"
        }`}
        style={{
          animation: isLive ? "none" : "pulse-bg 2s ease-in-out infinite",
        }}
        data-ocid="alert.section"
      >
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
          {isLive ? (
            <span className="text-base animate-bounce">
              🟢 RESULT LIVE HO GAYA! Abhi Check Karein — Official Site Open
              Karein!
            </span>
          ) : (
            <>
              <span className="flex items-center gap-2">
                <span
                  className="inline-block w-3 h-3 rounded-full bg-white"
                  style={{ animation: "blink 1s step-end infinite" }}
                />
                🔴 BREAKING NEWS: Bihar Board Intermediate Result 2026 आज घोषित
                होगा!
              </span>
              <span className="hidden sm:block opacity-60">|</span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 flex-shrink-0" />
                <span>
                  समय:{" "}
                  <span className="font-mono text-yellow-200 text-base tracking-widest">
                    {formatCountdown(countdown)}
                  </span>{" "}
                  में
                </span>
              </span>
            </>
          )}
        </div>
        {/* shimmer effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)",
            animation: "shimmer 3s linear infinite",
          }}
        />
      </div>

      {/* Notification Bar */}
      <div className="bg-secondary text-secondary-foreground text-center py-2 px-4 text-sm font-medium">
        <span className="mr-2">🔔</span>
        LIVE UPDATE: Bihar Board Inter Result 2026 — Aaj Announce Hoga |
        Official site:{" "}
        <a
          href="https://biharboardonline.bihar.gov.in"
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-bold"
        >
          biharboardonline.bihar.gov.in
        </a>
      </div>

      {/* Header */}
      <header
        className="bg-primary text-primary-foreground shadow-lg"
        data-ocid="header.section"
      >
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-6 h-6 text-secondary-foreground" />
            </div>
            <div>
              <h1 className="font-heading text-xl md:text-2xl font-bold tracking-tight leading-tight">
                Prakash Enterprises
              </h1>
              <p className="text-primary-foreground/75 text-xs md:text-sm">
                Bihar Board Result 2026 | Official Information Portal
              </p>
            </div>
          </div>
          <nav
            className="hidden md:flex items-center gap-6 text-sm font-medium"
            data-ocid="nav.section"
          >
            <a
              href="#check-result"
              className="hover:text-secondary transition-colors"
              data-ocid="nav.link"
            >
              Result Check
            </a>
            <a
              href="#servers"
              className="hover:text-secondary transition-colors"
              data-ocid="nav.link"
            >
              Servers
            </a>
            <a
              href="#how-to"
              className="hover:text-secondary transition-colors"
              data-ocid="nav.link"
            >
              Guide
            </a>
            <a
              href="#dates"
              className="hover:text-secondary transition-colors"
              data-ocid="nav.link"
            >
              Dates
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section
          id="check-result"
          className="relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.22 0.12 255) 0%, oklch(0.32 0.14 255) 60%, oklch(0.28 0.10 240) 100%)",
          }}
        >
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5 bg-secondary translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-5 bg-secondary -translate-x-1/3 translate-y-1/3" />

          <div className="relative max-w-3xl mx-auto px-4 py-10 md:py-16 text-center text-primary-foreground">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm mb-6">
              <Shield className="w-4 h-4 text-secondary" />
              विश्वसनीय परिणाम पोर्टल — Server Down नहीं होगा
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-extrabold leading-tight mb-4">
              Bihar Board
              <span className="block text-secondary flex items-center justify-center gap-3">
                Intermediate Result 2026
                <span
                  className="inline-flex items-center gap-1 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full"
                  style={{ animation: "pulse-badge 1.5s ease-in-out infinite" }}
                >
                  <Zap className="w-3.5 h-3.5" />
                  LIVE
                </span>
              </span>
            </h2>
            <p className="text-primary-foreground/80 text-lg md:text-xl mb-6 max-w-xl mx-auto">
              आज का दिन! Result कुछ ही देर में आएगा — अभी Roll Number तैयार रखें
            </p>

            {/* Hero Countdown */}
            {!isLive && (
              <div className="inline-flex items-center gap-3 bg-white/10 border border-white/25 rounded-2xl px-6 py-3 mb-8">
                <Clock className="w-5 h-5 text-yellow-300" />
                <span className="text-white/80 text-sm">Result आने में:</span>
                <span className="font-mono text-yellow-200 text-2xl font-bold tracking-widest">
                  {formatCountdown(countdown)}
                </span>
              </div>
            )}
            {isLive && (
              <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-400/40 rounded-2xl px-6 py-3 mb-8 animate-bounce">
                <span className="text-green-300 font-bold text-lg">
                  🟢 Result LIVE है! अभी Check करें!
                </span>
              </div>
            )}

            {/* Result Form */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl text-left max-w-xl mx-auto">
              <h3 className="font-heading text-xl font-bold text-foreground mb-5">
                Result Check करें
              </h3>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="roll-number"
                    className="block text-sm font-semibold text-foreground mb-1.5"
                  >
                    Roll Number
                  </label>
                  <Input
                    id="roll-number"
                    type="text"
                    placeholder="जैसे: 12345678"
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                    className="h-12 text-base border-2 focus:border-primary"
                    maxLength={12}
                    data-ocid="result.input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="roll-code"
                    className="block text-sm font-semibold text-foreground mb-1.5"
                  >
                    Roll Code
                  </label>
                  <Input
                    id="roll-code"
                    type="text"
                    placeholder="जैसे: 12345"
                    value={rollCode}
                    onChange={(e) => setRollCode(e.target.value)}
                    className="h-12 text-base border-2 focus:border-primary"
                    maxLength={8}
                    data-ocid="result.search_input"
                  />
                </div>
                <Button
                  onClick={handleCheckResult}
                  className={`w-full h-12 text-base font-bold text-secondary-foreground rounded-lg mt-2 ${
                    isLive
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-secondary hover:bg-secondary/90"
                  }`}
                  style={
                    isLive
                      ? { animation: "pulse-badge 1s ease-in-out infinite" }
                      : {}
                  }
                  data-ocid="result.submit_button"
                >
                  {isLive ? "🟢 LIVE Result देखें!" : "Result देखें"}
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-4 text-center">
                <AlertCircle className="inline w-3.5 h-3.5 mr-1 text-yellow-500" />
                यह portal आपको Official BSEB website पर redirect करेगा।
              </p>
            </div>
          </div>

          {/* Marquee ticker */}
          <div className="bg-black/30 border-t border-white/10 overflow-hidden">
            <div
              className="whitespace-nowrap text-white/85 text-sm py-2 px-4 font-medium"
              style={{ animation: "marquee 30s linear infinite" }}
            >
              📢 Bihar Board Intermediate Result 2026 &nbsp;|&nbsp; Official
              Website: biharboardonline.bihar.gov.in &nbsp;|&nbsp; Roll Number
              Ready Rakhein &nbsp;|&nbsp; Server Down hone par backup links use
              karein &nbsp;|&nbsp; 13 Lakh+ Students Ka Result Aaj Ghoshit Hoga
              &nbsp;|&nbsp; Prakash Enterprises — Aapka Bharosemand Result
              Portal &nbsp;|&nbsp; 📢 Bihar Board Intermediate Result 2026
              &nbsp;|&nbsp; Official Website: biharboardonline.bihar.gov.in
              &nbsp;|&nbsp; Roll Number Ready Rakhein &nbsp;|&nbsp; Server Down
              hone par backup links use karein
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-white border-b border-border">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-4 p-5 rounded-xl border border-border bg-background"
                >
                  <div
                    className={`w-12 h-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0 ${stat.color}`}
                  >
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-heading text-2xl font-extrabold text-foreground">
                      {stat.value}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Servers */}
        <section id="servers" className="py-12 bg-background">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-semibold mb-3">
                <Server className="w-4 h-4" />
                Multiple Server Links
              </div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                10 Official Servers — एक Down हो तो दूसरा Try करें
              </h2>
              <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
                Result Day पर servers slow हो सकते हैं। नीचे दिए गए सभी links आज़माएं।
              </p>
            </div>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              data-ocid="servers.list"
            >
              {servers.map((server, i) => (
                <a
                  key={server.url}
                  href={server.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid={`servers.item.${i + 1}`}
                  className="group block"
                >
                  <Card className="h-full border-2 hover:border-primary/50 hover:shadow-card transition-all duration-200 cursor-pointer">
                    <CardHeader className="pb-2 pt-4 px-4">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-base font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                          {server.name}
                        </CardTitle>
                        <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5 group-hover:text-primary transition-colors" />
                      </div>
                    </CardHeader>
                    <CardContent className="pb-4 px-4">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded-full border ${tagColors[server.tag] ?? "bg-gray-100 text-gray-700"}`}
                        >
                          {server.tag}
                        </span>
                        <div className="flex items-center gap-1 text-green-600 text-xs font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Live
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2 truncate">
                        {server.url.replace("https://", "")}
                      </p>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* How To */}
        <section id="how-to" className="py-12 bg-muted">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-semibold mb-3">
                <BookOpen className="w-4 h-4" />
                Step-by-Step Guide
              </div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                Result कैसे Check करें?
              </h2>
            </div>
            <div className="space-y-4">
              {steps.map((step) => (
                <div
                  key={step.num}
                  className="flex items-start gap-4 bg-white rounded-xl p-5 border border-border shadow-xs"
                >
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-heading font-bold text-lg flex-shrink-0">
                    {step.num}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-base mb-1">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Important Dates */}
        <section id="dates" className="py-12 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-semibold mb-3">
                <Calendar className="w-4 h-4" />
                Important Dates
              </div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                BSEB Intermediate 2026 — महत्वपूर्ण तारीखें
              </h2>
            </div>
            <div className="rounded-xl border-2 border-border overflow-hidden shadow-xs">
              <Table>
                <TableHeader>
                  <TableRow className="bg-primary">
                    <TableHead className="text-primary-foreground font-bold py-3">
                      Event
                    </TableHead>
                    <TableHead className="text-primary-foreground font-bold py-3">
                      Date
                    </TableHead>
                    <TableHead className="text-primary-foreground font-bold py-3">
                      Status
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {importantDates.map((row, i) => (
                    <TableRow
                      key={row.event}
                      className={`${
                        row.status === "live"
                          ? "bg-red-50"
                          : i % 2 === 0
                            ? "bg-background"
                            : "bg-muted/50"
                      }`}
                    >
                      <TableCell
                        className={`font-medium py-3 ${
                          row.status === "live"
                            ? "text-red-700 font-bold"
                            : "text-foreground"
                        }`}
                      >
                        {row.event}
                      </TableCell>
                      <TableCell
                        className={`py-3 ${
                          row.status === "live"
                            ? "text-red-700 font-bold"
                            : "text-foreground"
                        }`}
                      >
                        {row.date}
                      </TableCell>
                      <TableCell className="py-3">
                        {row.status === "done" ? (
                          <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-100">
                            Completed
                          </Badge>
                        ) : row.status === "live" ? (
                          <Badge
                            className="bg-red-100 text-red-700 border-red-300 hover:bg-red-100 flex items-center gap-1 w-fit"
                            style={{
                              animation:
                                "pulse-badge 1.2s ease-in-out infinite",
                            }}
                          >
                            <span
                              className="w-2 h-2 rounded-full bg-red-500 inline-block"
                              style={{
                                animation: "blink 1s step-end infinite",
                              }}
                            />
                            LIVE TODAY
                          </Badge>
                        ) : (
                          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100">
                            Upcoming
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </section>

        {/* Highlights */}
        <section className="py-10 bg-muted">
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="bg-white rounded-xl p-5 border border-border flex items-start gap-4 shadow-xs"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="font-heading font-bold text-lg">
                Prakash Enterprises
              </p>
              <p className="text-primary-foreground/70 text-sm mt-1">
                Bihar Board Result 2026 Information Portal
              </p>
            </div>
            <div className="text-center">
              <p className="text-primary-foreground/70 text-xs max-w-sm">
                <strong>Disclaimer:</strong> यह एक informational portal है।
                Result data Official BSEB website से provide किया जाता है। हम किसी
                भी result accuracy की guarantee नहीं देते।
              </p>
            </div>
          </div>
          <div className="border-t border-white/10 mt-6 pt-6 text-center">
            <p className="text-primary-foreground/60 text-sm">
              © {currentYear} Prakash Enterprises. Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-secondary transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Global keyframe styles */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes pulse-badge {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.85; transform: scale(1.04); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
