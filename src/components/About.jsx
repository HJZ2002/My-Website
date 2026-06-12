import { useState } from 'react';
import AnimatedSection from './AnimatedSection';

const ABOUT_TEXT =
  'A Computer Science graduate who is passionate about making something tangible and meaningful on the web. Each piece of code written means something. I really like writing front end codes and exploring different aspects of web development. The feeling of taking a blank page and turning it into something useful and beautiful that can be enjoyed by others is something that I take joy in. I think great programs do not only mean following strict logical rules and programming syntaxes but having a deeper connection with the user behind the screen. I am always inspired by my constant thirst for knowledge and my passion for learning new languages and tools that help me stay relevant in this ever-changing environment. Moments spent debugging programs at night, trying to solve problems or creating solutions after days of work are something that keeps me interested in my field.';

export default function About() {
  const [expanded, setExpanded] = useState(false);

  return (
    <AnimatedSection className="about" id="about">
      <div className="about-content">
        <h2>
          About<span />
        </h2>
        <p className={`about-text${expanded ? ' expanded' : ' clamped'}`}>{ABOUT_TEXT}</p>
        <button
          type="button"
          className="gradient-btn read-more"
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? 'Read Less' : 'Read More'}
        </button>
      </div>
    </AnimatedSection>
  );
}
