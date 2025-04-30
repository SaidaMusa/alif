import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
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
            'Authorization': `Bearer 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`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'http://localhost:5173', 
            'X-Title': 'My Chatbot'
          },
        }
      );

      const botMessage = {
        sender: 'bot',
        text: response.data.choices[0].message.content,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Xatolik:', error);
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: 1220, margin: '0 auto' }}>
      <div style={{ height: 300, overflowY: 'auto', border: '1px solid #ccc', padding: 10,borderRadius: '18px' }}>
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <strong>{msg.sender}:</strong> {msg.text}
          </motion.div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        className='chatBotInput'
        placeholder="Message..."
        style={{ width: '100%', padding: 25, marginTop: 10,marginBottom: 30,outline: 'none',border: '1px solid #ccc',borderRadius: '18px',boxShadow : '0 0 7px #ccc' }}
      />
    </div>
  );
}
