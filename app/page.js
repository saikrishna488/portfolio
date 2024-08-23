import Header from './components/Header'
import HeroSection from './components/Herosection';
import Summary from './components/Summary';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Achievements from './components/Achievements';
import Leadership from './components/Leadership';
import Education from './components/Education';
import Footer from './components/Footer';
import Contact from './components/Contact'

const Home = () => (
  
  <>
    <div className='bg-gray-100'>
    <Header />
    <HeroSection />
    <Summary />
    <Projects />
    <Skills />
    <Certifications />
    <Achievements />
    <Leadership />
    <Education />
    <Contact/>
    <Footer />
    </div>
  </>
);

export default Home;
