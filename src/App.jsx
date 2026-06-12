import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Tools from './components/Tools';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AudioToggle from './components/AudioToggle';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Home />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Tools />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <AudioToggle />
    </>
  );
}
