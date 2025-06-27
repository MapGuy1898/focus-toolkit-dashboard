
// Focus Toolkit Home Base - Dashboard Layout
// Device-optimized for Apple ecosystem (iPhone, iPad, MacBook, Watch)
// Purpose: ADHD-friendly daily planning, reminders, notes, and grounding tools

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";

export default function FocusToolkitDashboard() {
  const [exportText, setExportText] = useState("");
  const [energyStatus, setEnergyStatus] = useState("");
  const [afternoonPlan, setAfternoonPlan] = useState("");
  const [middayNotes, setMiddayNotes] = useState("");
  const [taskChecks, setTaskChecks] = useState({});
  const [customMorningTask, setCustomMorningTask] = useState("");
  const [completedTasks, setCompletedTasks] = useState([
    "Morning Priority Task",
    "Team Sync Meeting",
    "Emails + Admin Block"
  ]);
  const [savedPlans, setSavedPlans] = useState([]);
  const [promptSuggestion, setPromptSuggestion] = useState("");
  const [startupNote, setStartupNote] = useState("");
  const [startupText, setStartupText] = useState("");
  const [tomorrowPreview, setTomorrowPreview] = useState("");
  const [anchorWord, setAnchorWord] = useState("");
  const [mood, setMood] = useState("");
  const [recenterPrompt, setRecenterPrompt] = useState("");
  const [musicRec, setMusicRec] = useState("");

  const handleStartupRoutine = () => {
    const now = new Date();
    const greeting = now.getHours() < 12 ? "Good morning! ☀️" : "Hello again 👋";
    const prompt = `${greeting}\n\nToday is ${now.toDateString()}. Let's kick things off with intention.`;
    setStartupNote(prompt);
    generateTomorrowPreview();
    handleAutoReset();
  };

  const handleAutoReset = () => {
    setPromptSuggestion("");
    setStartupText("");
    setTaskChecks({});
    setAfternoonPlan("");
    setRecenterPrompt("");
    setAnchorWord("");
    setMood("");
    setMusicRec("");
  };

  useEffect(() => {
    const now = new Date();
    if (now.getHours() === 19 && now.getMinutes() >= 30) {
      if (afternoonPlan) {
        setSavedPlans(prev => [...prev, afternoonPlan]);
        setAfternoonPlan("");
      }
    }
  }, [afternoonPlan]);

  const handleMoodChange = (emoji) => {
    setMood(emoji);
    let rec = "";
    switch (emoji) {
      case "😴":
        rec = "🎧 Try: Calm Piano – Apple Music";
        break;
      case "😐":
        rec = "🎧 Try: Lo-Fi Chillhop – Apple Music";
        break;
      case "💪":
        rec = "🎧 Try: Motivation Mix – Apple Music";
        break;
      case "🚀":
        rec = "🎧 Try: Upbeat Productivity – Apple Music";
        break;
      default:
        rec = "🎧 Choose a playlist that fits your flow today.";
    }
    setMusicRec(rec);
  };

  const handleRecenter = () => {
    const actions = [
      "Take 3 slow breaths — in through your nose, out through your mouth.",
      "Stand up, stretch for 30 seconds.",
      "Write down the one task that feels most doable right now.",
      "Set a 5-minute timer and start something low pressure.",
      "Drink a glass of water, then reassess."
    ];
    const pick = actions[Math.floor(Math.random() * actions.length)];
    setRecenterPrompt(pick);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-center">🧠 Focus Toolkit Home Base</h1>
        <div className="flex items-center gap-2">
          <label className="font-medium">📌 Today's Anchor Word:</label>
          <Input value={anchorWord} onChange={(e) => setAnchorWord(e.target.value)} placeholder="e.g. Steady, Present, Listen" className="max-w-xs" />
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">🧩 Mood:</span>
          {["😴", "😐", "💪", "🚀"].map((emoji) => (
            <Button key={emoji} size="sm" variant={mood === emoji ? "default" : "outline"} onClick={() => handleMoodChange(emoji)}>{emoji}</Button>
          ))}
        </div>
        {musicRec && <div className="text-sm bg-gray-100 border rounded p-2 whitespace-pre-wrap">{musicRec}</div>}
        <div className="flex items-center gap-4 pt-2">
          <Button variant="outline" onClick={handleRecenter}>🔄 Recenter Now</Button>
          {recenterPrompt && <span className="text-sm italic">{recenterPrompt}</span>}
        </div>
      </div>
    </div>
  );
}
