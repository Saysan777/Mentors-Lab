import { Helmet } from 'react-helmet-async';
import { Features, Contact, Hero, Footer, About } from './components';

export const Home = () => {
  return (
    <section className="home">
      <Helmet>
        <title>Home | A-Square Labs</title>
      </Helmet>
      <Hero />
      <About />
      <Features />
      <Contact />
      <Footer />
    </section>
  );
};
