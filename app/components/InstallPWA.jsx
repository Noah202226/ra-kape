"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useSettingsStore from "@/app/stores/useSettingsStore";

export default function InstallPWA() {
  const settings = useSettingsStore((state) => state.settings);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();

      // Check if user has already dismissed this recently
      const isDismissed = sessionStorage.getItem("pwa-dismissed");

      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);

      if (!isDismissed) {
        setIsVisible(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handler);

    // Hide if already in standalone mode (app is installed and open)
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsVisible(false);
    }

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the native install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("User accepted the RA KAPE install");
    }

    // Reset state
    setDeferredPrompt(null);
    setIsVisible(false);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    // Use sessionStorage so it asks again in a new tab/session, but not every refresh
    // sessionStorage.setItem("pwa-dismissed", "true");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 50, x: "-50%", opacity: 0 }}
          animate={{ y: 0, x: "-50%", opacity: 1 }}
          exit={{ y: 50, x: "-50%", opacity: 0 }}
          className="fixed bottom-6 left-1/2 z-9999 w-[92%] max-w-md"
        >
          <div className="bg-white/90 backdrop-blur-lg border border-gray-200 shadow-[0_20px_50px_rgba(0,0,0,0.2)] rounded-2xl p-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {/* BRAND ICON */}
              <div className="bg-(--title) w-12 h-12 flex items-center justify-center rounded-xl text-black text-xl shadow-inner">
                <img
                  src="/r.jpg"
                  alt="RA KAPE"
                  className="w-6 h-6 object-contain"
                />
              </div>
              <div className="flex-1">
                <p className="font-extrabold text-gray-900 text-sm leading-tight">
                  Install {settings?.webTitle || "RA KAPE"}
                </p>
                <p className="text-[10px] text-gray-500 font-medium">
                  Fast access & offline menu viewing!
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <button
                onClick={handleInstallClick}
                className="bg-(--title) text-white text-xs font-bold px-5 py-2.5 rounded-lg hover:brightness-110 active:scale-95 transition-all shadow-md"
              >
                Install
              </button>
              <button
                onClick={handleDismiss}
                className="text-[10px] text-gray-400 font-bold hover:text-gray-600 py-1"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
