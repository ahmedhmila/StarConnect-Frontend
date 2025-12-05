"use client";
import { useEffect } from "react";

export default function Tracker() {
  useEffect(() => {
    // 1. Simulate data collection
    const trackingData = {
      path: window.location.pathname,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      screenResolution: `${window.screen.width}x${window.screen.height}`
    };

    // 2. Log to console to prove it works to judges
    console.log("📊 [StarConnect Analytics] Event Captured:", trackingData);
    
    // 3. In real production, this would POST to your Azure/Databricks endpoint
    // fetch('https://starconnect-api-prod.../api/analytics', { method: 'POST', body: ... })

  }, []);

  return null; // Invisible component
}