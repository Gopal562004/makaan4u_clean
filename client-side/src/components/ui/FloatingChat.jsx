import React, { useState, useRef, useEffect } from "react";
import Icon from "../AppIcon";
import Button from "./Button";
import Input from "./Input";

const FloatingChat = ({ isOpen = false, onToggle }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm RealBot, your AI property assistant. How can I help you find your perfect property today?",
      sender: "bot",
      timestamp: new Date()?.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const quickActions = [
    { label: "Find Properties", icon: "Search" },
    { label: "Price Range", icon: "DollarSign" },
    { label: "Location Help", icon: "MapPin" },
    { label: "Schedule Viewing", icon: "Calendar" },
  ];

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef?.current) {
      inputRef?.current?.focus();
    }
  }, [isOpen]);

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!inputMessage?.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date()?.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: getBotResponse(inputMessage),
        sender: "bot",
        timestamp: new Date()?.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (message) => {
    const lowerMessage = message?.toLowerCase();

    if (lowerMessage?.includes("price") || lowerMessage?.includes("budget")) {
      return "I can help you find properties within your budget! What's your preferred price range? For example, ₹50L - ₹1Cr for apartments or ₹1Cr+ for villas.";
    } else if (
      lowerMessage?.includes("location") ||
      lowerMessage?.includes("area")
    ) {
      return "Great! Location is key in real estate. Which areas are you interested in? I can show you properties in popular locations like Bandra, Andheri, Pune, or any specific locality you have in mind.";
    } else if (
      lowerMessage?.includes("viewing") ||
      lowerMessage?.includes("visit")
    ) {
      return "I'd be happy to help you schedule a property viewing! Please share the property you're interested in, and I'll connect you with our agents to arrange a convenient time.";
    } else if (
      lowerMessage?.includes("apartment") ||
      lowerMessage?.includes("flat")
    ) {
      return "Looking for apartments? I can help you find 1BHK, 2BHK, 3BHK+ options. What's your preferred configuration and location?";
    } else if (
      lowerMessage?.includes("villa") ||
      lowerMessage?.includes("house")
    ) {
      return "Interested in villas and independent houses? I can show you options with gardens, parking, and premium amenities. What's your preferred location and budget?";
    } else {
      return "I understand you're looking for property assistance. I can help you with property search, price guidance, location recommendations, and scheduling viewings. What specific help do you need?";
    }
  };

  const handleQuickAction = (action) => {
    setInputMessage(action?.label);
    if (inputRef?.current) {
      inputRef?.current?.focus();
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-999">
        <button
          onClick={onToggle}
          className="w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-prominent hover:shadow-lg transition-all duration-200 hover:scale-105 flex items-center justify-center"
        >
          <Icon name="MessageCircle" size={24} />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-999 w-80 sm:w-96 z-10 bg-white">
      <div className="bg-card border border-border rounded-lg shadow-prominent overflow-hidden">
        {/* Header */}
        <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
              <Icon name="Bot" size={18} color="currentColor" />
            </div>
            <div>
              <h3 className="font-medium">RealBot</h3>
              <p className="text-xs opacity-90">AI Property Assistant</p>
            </div>
          </div>
          <button
            onClick={onToggle}
            className="p-1 hover:bg-primary-foreground/20 rounded transition-smooth"
          >
            <Icon name="X" size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="h-80 overflow-y-auto p-4 space-y-4 bg-muted/30">
          {messages?.map((message) => (
            <div
              key={message?.id}
              className={`flex ${
                message?.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message?.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border"
                }`}
              >
                <p className="text-sm">{message?.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    message?.sender === "user"
                      ? "text-primary-foreground/70"
                      : "text-muted-foreground"
                  }`}
                >
                  {message?.timestamp}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-card border border-border p-3 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="p-3 border-t border-border bg-card">
          <div className="grid grid-cols-2 gap-2 mb-3">
            {quickActions?.map((action) => (
              <button
                key={action?.label}
                onClick={() => handleQuickAction(action)}
                className="flex items-center space-x-2 p-2 text-xs bg-muted hover:bg-muted/80 rounded-md transition-smooth"
              >
                <Icon name={action?.icon} size={14} />
                <span>{action?.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border bg-card">
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <Input
              ref={inputRef}
              type="text"
              placeholder="Ask about properties..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e?.target?.value)}
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={!inputMessage?.trim()}>
              <Icon name="Send" size={16} />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FloatingChat;
