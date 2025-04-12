import { useEffect } from "react";

export default function Chatbot() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.botpress.cloud/webchat/v2.2/inject.js";
    script.async = true;

    script.onload = () => {
      console.log("Botpress WebChat script loaded successfully.");

      setTimeout(() => {
        if (window.botpressWebChat) {
          console.log("Initializing Botpress WebChat...");
          window.botpressWebChat.init({
            composerPlaceholder: "Ask me anything...",
            botId: "d418b0c6-e92d-40f1-bb1f-5fca401c2eb4",
            host: "https://cdn.botpress.cloud/webchat/v2.2",
            messagingUrl: "https://messaging.botpress.cloud",
          });
        } else {
          console.error("Botpress WebChat object still not found.");
        }
      }, 2000); 
    };

    script.onerror = (error) => {
      console.error("Error loading Botpress WebChat script:", error);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="webchat" />;
}
