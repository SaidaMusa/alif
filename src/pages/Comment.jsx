import React, { useState } from "react";
import "../pages/Comment.css" 

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
        className="accordion__content"
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

const Comment = ({ items }) => {
  return (
    <section className="accordion" role="tablist" aria-live="polite">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          id={index + 1}
          title={item.title}
          content={item.content}
        />
      ))}
    </section>
  );
};

export default Comment;
