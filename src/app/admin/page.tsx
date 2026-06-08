"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Lock,
  ClipboardCopy,
  Check,
  Calendar,
  MapPin,
  Star,
} from "lucide-react";
import { ResponseData } from "@/types";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [responses, setResponses] = useState<ResponseData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [loginError, setLoginError] = useState("");

  const fetchResponses = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/responses?password=${password}`);
      const data = await res.json();
      if (data.success) {
        setResponses(data.responses);
      } else {
        setError(data.error || "Failed to load");
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    setLoginError("");
    fetchResponses().then(() => {
      if (!error) setIsAuthenticated(true);
    });
  };

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    try {
      const d = new Date(dateStr + "T00:00:00");
      return d.toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-amber-50">
        {/* Decorative orbs */}
        <div className="absolute top-20 left-20 text-5xl opacity-20">🧚</div>
        <div className="absolute bottom-20 right-20 text-5xl opacity-20">🌙</div>
        <div className="absolute top-40 right-40 text-3xl opacity-10">✨</div>
        <div className="absolute bottom-40 left-40 text-3xl opacity-10">⭐</div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-md p-10 rounded-[2rem] shadow-2xl border border-emerald-200/50 max-w-md w-full mx-4 relative"
        >
          {/* Decorative top */}
          <div className="flex justify-center gap-1 mb-4 text-2xl opacity-30">
            <span>🌿</span>
            <span>✨</span>
            <span>🌿</span>
          </div>

          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center border-2 border-emerald-200/50">
              <Lock className="w-8 h-8 text-emerald-600" />
            </div>
          </div>
          <h1 className="text-2xl font-display font-bold text-emerald-800 text-center mb-2">
            Admin Zugang
          </h1>
          <p className="text-emerald-600 text-center mb-8 text-sm italic">
            Nur für den Veranstalter dieser magischen Reise
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setLoginError("");
            }}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="Passwort eingeben..."
            className="w-full px-4 py-3 rounded-2xl border border-emerald-200 bg-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 text-emerald-800 mb-4 text-center"
          />
          {loginError && (
            <p className="text-rose-500 text-sm mb-4 text-center">{loginError}</p>
          )}
          <motion.button
            onClick={handleLogin}
            disabled={!password}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold hover:shadow-lg transition-all disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Anmelden
          </motion.button>

          {/* Decorative bottom */}
          <div className="flex justify-center gap-1 mt-6 text-2xl opacity-30">
            <span>🌸</span>
            <span>✨</span>
            <span>🌸</span>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-amber-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-emerald-800">
              ✨ Antworten
            </h1>
            <p className="text-emerald-600 text-sm mt-1">
              Deine magischen Rückmeldungen
            </p>
          </div>
          <button
            onClick={fetchResponses}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:shadow-lg transition-all"
          >
            Aktualisieren
          </button>
        </div>

        {loading && (
          <div className="text-center py-16">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="inline-block text-4xl mb-4"
            >
              🧚
            </motion.div>
            <p className="text-emerald-600">Lade Antworten...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-16">
            <span className="text-4xl block mb-4">😅</span>
            <p className="text-rose-500">{error}</p>
          </div>
        )}

        {!loading && !error && responses.length === 0 && (
          <div className="text-center py-16">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-7xl mb-6"
            >
              🦋
            </motion.div>
            <h2 className="text-2xl font-display font-bold text-emerald-700 mb-2">
              Noch keine Antworten...
            </h2>
            <p className="text-emerald-500">
              Warte auf die magische Zusage ✨
            </p>
          </div>
        )}

        {!loading &&
          !error &&
          responses.length > 0 && (
            <>
              <p className="text-emerald-600 text-sm mb-4">
                {responses.length} {responses.length === 1 ? "Antwort" : "Antworten"} eingegangen
              </p>
              {responses.map((response, idx) => (
                <motion.div
                  key={response.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-emerald-200/60 mb-4 shadow-sm hover:shadow-lg transition-all relative overflow-hidden"
                >
                  {/* Decorative corners */}
                  <div className="absolute top-2 left-2 text-xs opacity-20">🌸</div>
                  <div className="absolute top-2 right-2 text-xs opacity-20">🌿</div>
                  <div className="absolute bottom-2 left-2 text-xs opacity-20">🍃</div>
                  <div className="absolute bottom-2 right-2 text-xs opacity-20">✨</div>

                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-emerald-500 font-medium">
                        {new Date(response.submittedAt).toLocaleString("de-DE")}
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        copyToClipboard(JSON.stringify(response, null, 2), response.id)
                      }
                      className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-100/80 text-emerald-700 hover:bg-emerald-200 transition-all text-xs"
                    >
                      {copiedId === response.id ? (
                        <>
                          <Check className="w-3.5 h-3.5" /> Kopiert
                        </>
                      ) : (
                        <>
                          <ClipboardCopy className="w-3.5 h-3.5" /> Kopieren
                        </>
                      )}
                    </button>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-amber-500" />
                        <span className="font-semibold text-emerald-800">
                          {response.trailName}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-emerald-600" />
                        <span>
                          {formatDate(response.date)} um {response.time} Uhr
                        </span>
                      </div>
                      {response.altDate && (
                        <div className="flex items-center gap-2 text-emerald-600">
                          <Calendar className="w-5 h-5 text-amber-500" />
                          <span className="text-sm">
                            Alternativ: {formatDate(response.altDate)} um{" "}
                            {response.altTime} Uhr
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-amber-500" />
                        <span>
                          {Array.from({ length: Math.min(response.excitement, 10) }).map(
                            (_, i) => (
                              <span key={i}>⭐</span>
                            )
                          )}
                        </span>
                      </div>
                      {response.notes && (
                        <div className="p-4 bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl border border-rose-200/60">
                          <p className="text-sm text-rose-700 italic leading-relaxed">
                            &ldquo;{response.notes}&rdquo;
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </>
          )}
      </div>
    </div>
  );
}
