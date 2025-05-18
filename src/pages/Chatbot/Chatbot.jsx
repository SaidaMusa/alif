import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]);
    setInput('');

    try {
      const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: 'openai/gpt-3.5-turbo',
          messages: [{ role: 'user', content: input }],
        },
        {
          headers: {
            'Authorization': 'Bearer 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',
            'Content-Type': 'application/json',
          },
        }
      );

      const botMessage = {
        sender: 'bot',
        text: response.data.choices[0].message.content,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      if (error.response) {
        console.error("📛 Status:", error.response.status);
        console.error("📛 Answer:", error.response.data);
      } else if (error.request) {
        console.error("📛 The request was sent, but there was no response:", error.request);
      } else {
        console.error("📛 Error in request configuration:", error.message);
      }

      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: '❌ An error occurred while receiving the response' },
      ]);
    }
  };

  return (
    <div className='chatbot' style={{ width: '100%', maxWidth: 1220, margin: '0 auto'}}>
      <div
        style={{
          height: 300,
          overflowY: 'auto',
          border: '1px solid #ccc',
          backgroundColor: 'white',
          padding: 10,
          borderRadius: '18px',
        }}
      >
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <strong>{msg.sender}: {msg.text}</strong>
          </motion.div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        placeholder="Message..."
        aria-label="Message input"
        style={{
          width: '100%',
          padding: 25,
          marginTop: 10,
          marginBottom: 30,
          outline: 'none',
          backgroundColor: 'white',
          color: 'black',
          border: '1px solid #ccc',
          borderRadius: '18px',
          boxShadow: '0 0 7px #ccc',
        }}
      />
    </div>
  );
}
