"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Check } from "lucide-react";

interface ExportTicketProps {
  ticketRef: React.RefObject<HTMLDivElement | null>;
}

export default function ExportTicket({ ticketRef }: ExportTicketProps) {
  const [exporting, setExporting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const exportPDF = async () => {
    if (!ticketRef.current) return;

    setExporting(true);
    setError("");

    try {
      await new Promise((r) => setTimeout(r, 200));

      // Capture the inner ticket content (skip the glow aura)
      const innerEl = ticketRef.current.querySelector("#ticket-inner") as HTMLElement | null;
      const ticketEl: HTMLElement = innerEl || ticketRef.current;

      const { toPng } = await import("html-to-image");
      const { jsPDF } = await import("jspdf");

      const dataUrl = await toPng(ticketEl, {
        quality: 1,
        pixelRatio: 3,
        cacheBust: true,
      });

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a5",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight, undefined, "FAST");
      pdf.save("magisches-ticket.pdf");

      setDone(true);
      setTimeout(() => setDone(false), 3000);
    } catch (err) {
      console.error("PDF export failed:", err);
      setError("Export fehlgeschlagen 😅");
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="text-center">
      <motion.button
        onClick={exportPDF}
        disabled={exporting}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-rose-400 text-white font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {exporting ? (
          <>
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="inline-block"
            >
              ✨
            </motion.span>
            Wird erstellt...
          </>
        ) : done ? (
          <>
            <Check className="w-5 h-5" />
            Gespeichert!
          </>
        ) : (
          <>
            <Download className="w-5 h-5" />
            Ticket speichern
          </>
        )}
      </motion.button>

      {error && (
        <p className="text-rose-500 text-sm mt-2">{error}</p>
      )}
    </div>
  );
}
