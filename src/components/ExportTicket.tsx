"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Check } from "lucide-react";

interface ExportTicketProps {
  ticketRef: React.RefObject<HTMLDivElement | null>;
}

// A5 aspect ratio: 148mm × 210mm = 0.70476
const A5_ASPECT_RATIO = 148 / 210;

export default function ExportTicket({ ticketRef }: ExportTicketProps) {
  const [exporting, setExporting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const exportPDF = async () => {
    const ticketContainer = ticketRef.current;
    if (!ticketContainer) return;

    setExporting(true);
    setError("");

    try {
      await new Promise((r) => setTimeout(r, 200));

      // Find the inner ticket element to capture
      const innerEl = ticketContainer.querySelector("#ticket-inner") as HTMLElement | null;
      const ticketEl: HTMLElement = innerEl || ticketContainer;

      // Get the actual rendered dimensions of the ticket
      const ticketRect = ticketEl.getBoundingClientRect();
      
      // Calculate capture dimensions to match A5 aspect ratio
      // Use the ticket's width, calculate height to match A5 ratio
      const captureWidth = ticketRect.width;
      const captureHeight = captureWidth / A5_ASPECT_RATIO;

      const { toPng } = await import("html-to-image");
      const { jsPDF } = await import("jspdf");

      // Capture with explicit dimensions matching A5 aspect ratio
      // This prevents stretching by ensuring the captured image has the correct proportions
      const dataUrl = await toPng(ticketEl, {
        quality: 1,
        pixelRatio: 3,
        cacheBust: true,
        width: captureWidth,
        height: captureHeight,
        style: {
          transform: "none",
          transformOrigin: "top left",
          width: `${captureWidth}px`,
          height: `${captureHeight}px`,
        },
      });

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a5",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Image now matches A5 aspect ratio exactly, so it fits perfectly
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
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-rose-400 text-white font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 min-h-[44px] min-w-[44px]"
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