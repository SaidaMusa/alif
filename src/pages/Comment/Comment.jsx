import React, { useState } from "react";
import "../Comment/Comment.css";
import Chatbot from "../Chatbot/Chatbot";
import accordionData from "../../data/accordionData"; // <-- data ni import qilamiz


const AccordionItem = ({ id, title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <article className={`accordion__item ${isOpen ? "is-expanded" : ""}`}>
      <button
        id={`tab${id}`}
        className="accordion__title"
        aria-controls={`panel${id}`}
        aria-expanded={isOpen}
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
        className="accordion__content bg-green-700"
        role="tabpanel"
        aria-hidden={!isOpen}
        aria-labelledby={`tab${id}`}
        style={{ height: isOpen ? "auto" : "0px", overflow: "hidden" }}
      >
        <div className="accordion__content-inner">
          <p>{content}</p>
        </div>
      </div>
    </article>
  );
};

const Comment = () => {
  return (
    <>
     <h1 style={{ padding: '5rem 0 2rem 0' }} className="text-center text-4xl font-bold text-neutral-800 mb-8">
            Common Questions By Customers
           </h1>
      <section className="accordion" role="tablist" aria-live="polite">
        {accordionData.map((item, index) => (
          <AccordionItem
            key={index}
            id={index + 1}
            title={item.title}
            content={item.content}
          />
        ))}
      </section>
      <h1 style={{ padding: '3rem 0.5rem' }} className="text-center text-4xl font-bold text-neutral-800 mb-8">
              Ask From ChatBot
           </h1>
      <Chatbot />
    </>
  );
};

export default Comment;
