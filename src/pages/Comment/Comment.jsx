import React, { useState } from "react";
import "../Comment/Comment.css";
import Chatbot from "../Chatbot/Chatbot";
import accordionData from "../../data/accordionData";

const AccordionItem = ({ id, title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <article 
      className={`accordion__item transition-all duration-300 ${isOpen ? "is-expanded" : ""}`}
      aria-live="polite"
    >
      <button
        id={`tab${id}`}
        className="accordion__title"
        aria-controls={`panel${id}`}
        aria-expanded={isOpen}
        aria-label={isOpen ? `Collapse ${title}` : `Expand ${title}`}
        onClick={toggleAccordion}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleAccordion();
          }
        }}
      >
        <h5>{title}</h5>
      </button>

      <div
        id={`panel${id}`}
        className="accordion__content bg-green-700 overflow-hidden transition-all duration-300"
        role="tabpanel"
        aria-hidden={!isOpen}
        aria-labelledby={`tab${id}`}
        style={{ height: isOpen ? "auto" : "0px", overflow: "hidden" }}
      >
        <div className="accordion__content-inner" aria-live="polite">
          <p>{content}</p>
        </div>
      </div>
    </article>
  );
};

const Comment = () => {
  return (
    <div className='commentSection'>
      <h1 
        className="text-center text-4xl font-bold text-neutral-800 mb-8"
        aria-label="Common questions asked by customers"
      >
        Frequently Asked Questions
      </h1>

      <section 
        className="accordion" 
        role="tablist"
        aria-live="polite"
        aria-label="Frequently Asked Questions"
      >
        {accordionData.map((item, index) => (
          <AccordionItem
            key={index}
            id={index + 1}
            title={item.title}
            content={item.content}
          />
        ))}
      </section>
     <div className='chatWrap bg-green-700 w-full h-[600px]  rounded-lg'>
       <h1 
        className="text-center text-white text-4xl font-bold mb-8"
        aria-label="Ask the chatbot"
      >
        Ask From ChatBot
      </h1>
       <Chatbot aria-label="Chatbot Interaction" />
     </div>
    </div>
  );
};

export default Comment;
