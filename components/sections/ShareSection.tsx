"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { toPng } from "html-to-image";
import confetti from "canvas-confetti";
import { Share2, Link2, MessageCircle, Download, ImagePlus, X, Instagram, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

const COUPLE = "George & Victoria";
const DATE = "14 February 2026";
const HASHTAG = "#G&V lovesymphony";
const MAX_PHOTO_SIZE_MB = 5;
const CARD_SIZE = 320;
const INSTAGRAM_SIZE = 1080;

type CardStyle = "minimal" | "photo" | "photo-side";

function getShareUrl() {
  if (typeof window === "undefined") return "";
  return window.location.href;
}

function getShareText() {
  return `${COUPLE} — ${DATE}. ${HASHTAG}`;
}

function blobUrlToDataUrl(blobUrl: string): Promise<string> {
  return fetch(blobUrl)
    .then((r) => r.blob())
    .then(
      (blob) =>
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
    );
}

export function ShareSection() {
  const cardRef = useRef<HTMLDivElement>(null);
  const photoPreviewRef = useRef<string | null>(null);
  const [guestName, setGuestName] = useState("");
  const [guestMessage, setGuestMessage] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  photoPreviewRef.current = photoPreview;
  const [photoLoaded, setPhotoLoaded] = useState(true);
  const [cardStyle, setCardStyle] = useState<CardStyle>("photo");
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [downloadedMessage, setDownloadedMessage] = useState(false);
  const [copyImageMessage, setCopyImageMessage] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    setCanNativeShare(typeof navigator !== "undefined" && !!navigator.share);
  }, []);

  useEffect(() => {
    return () => {
      if (photoPreview) URL.revokeObjectURL(photoPreview);
    };
  }, [photoPreview]);

  const handleCopyLink = useCallback(async () => {
    const url = getShareUrl();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: prompt
      window.prompt("Copy this link:", url);
    }
  }, []);

  const handleNativeShare = useCallback(async () => {
    const url = getShareUrl();
    const text = getShareText();
    if (navigator.share) {
      try {
        await navigator.share({
          title: COUPLE,
          text,
          url,
        });
      } catch (err) {
        if ((err as Error).name !== "AbortError") console.error(err);
      }
    }
  }, []);

  const handleWhatsApp = useCallback(() => {
    const url = getShareUrl();
    const text = encodeURIComponent(`${getShareText()} ${url}`);
    window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer");
  }, []);

  const handlePhotoChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    if (file.size > MAX_PHOTO_SIZE_MB * 1024 * 1024) return;
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setPhotoLoaded(false);
    setPhotoPreview(URL.createObjectURL(file));
    e.target.value = "";
  }, [photoPreview]);

  const removePhoto = useCallback(() => {
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setPhotoPreview(null);
    setPhotoLoaded(true);
  }, [photoPreview]);

  const captureCard = useCallback(async (pixelRatio: number = 2): Promise<string | null> => {
    const node = cardRef.current;
    if (!node) return null;
    const img = node.querySelector<HTMLImageElement>("img[src^='blob:']");
    let originalSrc: string | null = null;
    if (img?.src && photoPreviewRef.current) {
      try {
        originalSrc = img.src;
        const dataUrl = await blobUrlToDataUrl(originalSrc);
        img.src = dataUrl;
        await new Promise((r) => setTimeout(r, 150));
      } catch {
        // continue with blob URL
      }
    }
    try {
      const dataUrl = await toPng(node, {
        pixelRatio,
        backgroundColor: "oklch(0.98 0.012 85)",
        cacheBust: true,
      });
      return dataUrl;
    } finally {
      if (img && originalSrc) img.src = originalSrc;
    }
  }, []);

  const showSuccessFeedback = useCallback(() => {
    setDownloadedMessage(true);
    setTimeout(() => setDownloadedMessage(false), 2500);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#8b4a5c", "#c9a9a6", "#f5f0eb"],
    });
  }, []);

  const handleDownloadCard = useCallback(async () => {
    setDownloading(true);
    try {
      const dataUrl = await captureCard(2);
      if (dataUrl) {
        const link = document.createElement("a");
        link.download = `george-victoria-${guestName.trim() || "guest"}.png`;
        link.href = dataUrl;
        link.click();
        showSuccessFeedback();
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("Download card failed:", msg || err);
    } finally {
      setDownloading(false);
    }
  }, [guestName, captureCard, showSuccessFeedback]);

  const handleDownloadInstagram = useCallback(async () => {
    setDownloading(true);
    try {
      const pixelRatio = INSTAGRAM_SIZE / CARD_SIZE;
      const dataUrl = await captureCard(pixelRatio);
      if (dataUrl) {
        const link = document.createElement("a");
        link.download = `george-victoria-instagram-${guestName.trim() || "guest"}.png`;
        link.href = dataUrl;
        link.click();
        showSuccessFeedback();
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("Instagram download failed:", msg || err);
    } finally {
      setDownloading(false);
    }
  }, [guestName, captureCard, showSuccessFeedback]);

  const handleCopyImage = useCallback(async () => {
    try {
      const dataUrl = await captureCard(2);
      if (!dataUrl) return;
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
      setCopyImageMessage(true);
      setTimeout(() => setCopyImageMessage(false), 2500);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("Copy image failed:", msg || err);
    }
  }, [captureCard]);

  return (
    <motion.section
      id="share"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="bg-[#101922] py-24 md:py-32"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid min-w-0 gap-14 lg:grid-cols-[minmax(0,0.9fr),minmax(0,1.1fr)] lg:gap-16 lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08, ease: "easeOut" }}
            className="min-w-0 lg:sticky lg:top-28"
          >
            <h2 className="font-display text-3xl font-medium text-white md:text-4xl">
              Share the joy
            </h2>
            <p className="mt-4 font-body text-neutral-300">
              Share our day with friends or create your own shareable card.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleWhatsApp}
            className={cn(
              "inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-5 py-2.5 font-body text-sm font-medium text-white",
              "transition hover:bg-white/20 hover:border-white/50"
            )}
            aria-label="Share on WhatsApp"
          >
            <MessageCircle className="size-5" />
            WhatsApp
          </button>
          <button
            type="button"
            onClick={handleCopyLink}
            className={cn(
              "inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-5 py-2.5 font-body text-sm font-medium text-white",
              "transition hover:bg-white/20 hover:border-white/50",
              copied && "border-white/60 bg-white/20"
            )}
            aria-label="Copy link"
          >
            <Link2 className="size-5" />
            {copied ? "Copied!" : "Copy link"}
          </button>
          {canNativeShare && (
            <button
              type="button"
              onClick={handleNativeShare}
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-5 py-2.5 font-body text-sm font-medium text-white transition hover:bg-white/20 hover:border-white/50"
              aria-label="Share"
            >
              <Share2 className="size-5" />
              Share
            </button>
          )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="min-w-0 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:p-8"
          >
            <p className="font-body text-sm font-medium text-white">Create your shareable card</p>
            <p className="mt-1 font-body text-sm text-neutral-400">
              Add your name, optional photo and message, then download to share.
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="Your name"
              className="w-full min-w-0 max-w-xs rounded-lg border border-neutral-300 bg-white px-4 py-2.5 font-body text-neutral-800 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-300"
              aria-label="Your name for the shareable card"
            />
            <input
              type="text"
              value={guestMessage}
              onChange={(e) => setGuestMessage(e.target.value)}
              placeholder="Short message (e.g. Can't wait!)"
              maxLength={60}
              className="w-full min-w-0 max-w-xs rounded-lg border border-neutral-300 bg-white px-4 py-2.5 font-body text-sm text-neutral-800 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-300"
              aria-label="Optional short message for the card"
            />
          </div>
          <div className="mt-4">
            <p className="font-body text-xs font-medium text-neutral-400">Card style</p>
            <div className="mt-2 flex flex-wrap justify-center gap-2">
              {(
                [
                  { value: "minimal" as CardStyle, label: "Minimal" },
                  { value: "photo" as CardStyle, label: "With photo" },
                  { value: "photo-side" as CardStyle, label: "Photo on side" },
                ] as const
              ).map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setCardStyle(value)}
                  className={cn(
                    "rounded-lg border px-3 py-1.5 font-body text-sm",
                    cardStyle === value
                      ? "border-white/50 bg-white/20 text-white"
                      : "border-white/30 bg-white/10 text-neutral-200 hover:bg-white/20 hover:border-white/50"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          {(cardStyle === "photo" || cardStyle === "photo-side") && (
            <div className="mt-4 flex flex-col items-center gap-2">
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-4 py-2.5 font-body text-sm text-white transition hover:bg-white/20 hover:border-white/50">
                <ImagePlus className="size-5 text-white/90" />
                <span>{photoPreview ? "Change photo" : "Add your photo"}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="sr-only"
                  aria-label="Upload your photo for the card"
                />
              </label>
              {photoPreview && (
                <button
                  type="button"
                  onClick={removePhoto}
                  className="inline-flex items-center gap-1 font-body text-xs text-neutral-400 hover:text-neutral-200"
                  aria-label="Remove photo"
                >
                  <X className="size-3.5" /> Remove photo
                </button>
              )}
            </div>
          )}
          <div className="mt-6 flex flex-col items-center gap-6">
            <motion.div
              ref={cardRef}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "flex w-[320px] max-w-full rounded-2xl border border-neutral-200 bg-dominant p-5 shadow-xl",
                cardStyle === "minimal" && "h-[320px] flex-col items-center justify-center",
                cardStyle === "photo" && (photoPreview ? "min-h-[360px] flex-col items-center" : "h-[320px] flex-col items-center justify-center"),
                cardStyle === "photo-side" && "min-h-[320px] flex-row gap-3"
              )}
            >
              {cardStyle !== "minimal" && photoPreview && (
                <div
                  className={cn(
                    "flex shrink-0 items-center justify-center",
                    cardStyle === "photo" && "mb-3",
                    cardStyle === "photo-side" && "mb-0"
                  )}
                >
                  {cardStyle === "photo" ? (
                    <div className="flex size-[140px] items-center justify-center rounded-full border-[3px] border-neutral-300 bg-neutral-100 p-0.5 shadow-inner">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={photoPreview}
                        alt=""
                        className="size-[126px] rounded-full object-cover border-2 border-white shadow"
                        onLoad={() => setPhotoLoaded(true)}
                      />
                    </div>
                  ) : (
                    <div className="flex size-[100px] shrink-0 items-center justify-center rounded-xl border-[3px] border-neutral-300 bg-neutral-100 p-0.5 shadow-inner">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={photoPreview}
                        alt=""
                        className="size-[90px] rounded-[10px] object-cover border-2 border-white shadow"
                        onLoad={() => setPhotoLoaded(true)}
                      />
                    </div>
                  )}
                </div>
              )}
              <div className={cn("flex flex-col items-center text-center", cardStyle === "photo-side" && "items-start flex-1 justify-center text-left")}>
                <p className="font-body text-[0.65rem] uppercase tracking-[0.2em] text-neutral-500">
                  I&apos;m celebrating with
                </p>
                <p className="mt-1.5 font-display text-xl font-medium text-neutral-800">
                  {COUPLE}
                </p>
                <p className="mt-0.5 font-body text-[0.7rem] text-neutral-600">{DATE}</p>
                {guestName.trim() && (
                  <p className="mt-1.5 font-body text-[0.7rem] font-medium text-neutral-800">— {guestName.trim()}</p>
                )}
                {guestMessage.trim() && (
                  <p className="mt-1 font-body text-[0.65rem] italic text-neutral-600">&ldquo;{guestMessage.trim()}&rdquo;</p>
                )}
                <p className="mt-3 font-body text-[0.6rem] text-neutral-500">{HASHTAG}</p>
              </div>
            </motion.div>
            {downloadedMessage && (
              <p className="font-body text-sm font-medium text-neutral-200 animate-in fade-in" role="status">
                Image downloaded! Check your Downloads folder.
              </p>
            )}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <motion.button
                type="button"
                onClick={handleDownloadCard}
                disabled={downloading || (!photoLoaded && !!photoPreview && cardStyle !== "minimal")}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "inline-flex items-center gap-2 rounded-lg bg-rose px-4 py-2.5 font-body text-sm font-medium text-white",
                  "transition focus:outline-none focus:ring-2 focus:ring-rose focus:ring-offset-2",
                  "disabled:opacity-60"
                )}
              >
                <Download className="size-5" />
                {downloading ? "Creating…" : "Download image"}
              </motion.button>
              <button
                type="button"
                onClick={handleDownloadInstagram}
                disabled={downloading || (!photoLoaded && !!photoPreview && cardStyle !== "minimal")}
                className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-4 py-2.5 font-body text-sm font-medium text-white transition hover:bg-white/20 hover:border-white/50 disabled:opacity-60"
              >
                <Instagram className="size-5" />
                Instagram (1080×1080)
              </button>
              <button
                type="button"
                onClick={handleCopyImage}
                disabled={downloading}
                className={cn(
                  "inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-4 py-2.5 font-body text-sm font-medium text-white transition hover:bg-white/20 hover:border-white/50 disabled:opacity-60",
                  copyImageMessage && "border-white/60 bg-white/20"
                )}
              >
                <Copy className="size-5" />
                {copyImageMessage ? "Copied! Paste in Stories" : "Copy image"}
              </button>
            </div>
          </div>
          <p className="mx-auto mt-10 max-w-md font-body text-xs text-neutral-500">
            Cards are created on your device and saved to your Downloads folder. We don&apos;t store your photos or data.
          </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
