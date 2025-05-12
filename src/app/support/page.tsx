"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const TOPICS = [
  "Didn't Received my gift card",
  "Payment Issue",
  "Rank or Level Issue",
  "Game Specific Issue",
  "Bugs Faced",
  "Other Issue",
];

export default function SupportPage() {
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to email page with details as query params
    const params = new URLSearchParams({
      topic,
      subject,
      message,
    }).toString();
    router.push(`/email?${params}`);
  };

  return (
    <div
      className="min-h-screen bg-[#0A0C13] text-white flex flex-col pt-4 pl-16"
      style={{ fontFamily: "Impact, Poppins, sans-serif" }}
    >
      <h1
        className="text-4xl font-normal mt-8 mb-14"
        style={{
          fontFamily: "Impact",
          fontSize: 48,
          color: "#fff",
          lineHeight: "24px",
        }}
      >
        Support
      </h1>
      <div
        className="w-full max-w-xl p-8 rounded-lg border border-[#A084E8] bg-[#232025]"
        style={{ boxShadow: "0 0 0 1.5px #A084E8" }}
      >
        <h2
          className="text-2xl mb-6"
          style={{ fontFamily: "Impact", fontSize: 24, color: "#fff" }}
        >
          Submit your Request
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Topic */}
          <label
            className="block mb-2 mt-4"
            style={{ fontFamily: "Impact", fontSize: 16, color: "#fff" }}
          >
            Topic
          </label>
          <Select value={topic} onValueChange={setTopic}>
            <SelectTrigger
              className="w-full bg-[#383838] text-white border border-[#A084E8] focus:ring-0 focus:border-[#A084E8]"
              style={{ fontFamily: "sans-serif", fontSize: 16 }}
            >
              <SelectValue placeholder="Select a topic" />
            </SelectTrigger>
            <SelectContent className="bg-[#232025] text-white border-[#A084E8]">
              {TOPICS.map((t) => (
                <SelectItem
                  key={t}
                  value={t}
                  className="text-white"
                  style={{ fontFamily: "sans-serif" }}
                >
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Subject */}
          <label
            className="block mb-2 mt-6"
            style={{ fontFamily: "Impact", fontSize: 16, color: "#fff" }}
          >
            Subject
          </label>
          <Input
            className="w-full bg-[#383838] text-white border border-[#A084E8] focus:ring-0 focus:border-[#A084E8] mb-2"
            style={{ fontFamily: "sans-serif", fontSize: 16 }}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter subject"
            required
          />

          {/* Message */}
          <label
            className="block mb-2 mt-6"
            style={{ fontFamily: "Impact", fontSize: 16, color: "#fff" }}
          >
            Message
          </label>
          <textarea
            className="w-full h-32 bg-[#383838] text-white border border-[#A084E8] focus:ring-0 focus:border-[#A084E8] p-2 mb-6 rounded-md resize-none"
            style={{ fontFamily: "sans-serif", fontSize: 16 }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message"
            required
          />

          <div className="flex gap-4 mt-2">
            <Button
              type="submit"
              className="bg-[#A084E8] hover:bg-[#7c5fd3] text-white px-8 py-2 rounded-md"
              style={{ fontFamily: "sans-serif", fontWeight: 500 }}
            >
              Submit
            </Button>
            <Button
              type="button"
              className="bg-[#232025] border border-[#A084E8] text-white px-8 py-2 rounded-md"
              style={{ fontFamily: "sans-serif", fontWeight: 500 }}
              onClick={() => {
                setTopic("");
                setSubject("");
                setMessage("");
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
        <div
          className="mt-8 text-white"
          style={{ fontFamily: "sans-serif", fontSize: 14 }}
        >
          <p className="mb-1">Email us for any other assistance</p>
          <a
            href="mailto:support@onetap.com"
            className="text-[#A084E8] underline"
          >
            Drop a mail
          </a>
        </div>
      </div>
    </div>
  );
}
