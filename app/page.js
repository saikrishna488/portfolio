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
import Experience from './components/Expierence';
import Publications from './components/Publication';

const Home = () => (
  
  <>
    <div className='bg-gray-100'>
    <Header />
    <HeroSection />
    <Summary />
    <Experience/>
    <Projects />
    <Publications/>
    <Achievements />
    <Skills />
    <Leadership />
    <Certifications />
    <Education />
    <Contact/>
    <Footer />
    </div>
  </>
);

export default Home;
