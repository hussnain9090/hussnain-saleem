
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center animate-fade-in">
      <div 
        className="relative py-20 md:py-32 rounded-lg bg-cover bg-center bg-no-repeat"
        style={{backgroundImage: `linear-gradient(rgba(18, 18, 18, 0.8), rgba(18, 18, 18, 0.8)), url('https://picsum.photos/1200/400?grayscale&blur=2')`}}
      >
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
            Welcome to <span className="text-brand-primary">Game Fire</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Your ultimate destination for premium console gaming. Book your slot and dive into the action!
          </p>
          <div className="mt-8">
            <Button onClick={() => navigate('/book')} size="lg" variant="primary">
              Book a Console Now
            </Button>
          </div>
        </div>
      </div>

      <section className="py-16 animate-slide-in-up">
        <h2 className="text-3xl font-bold mb-8 text-light-text dark:text-dark-text">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-light-surface dark:bg-dark-surface p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-brand-secondary mb-2">Latest Consoles</h3>
                <p>PlayStation 5, Xbox Series X, and Nintendo Switch. We have all the latest hardware ready for you.</p>
            </div>
            <div className="bg-light-surface dark:bg-dark-surface p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-brand-secondary mb-2">Comfortable Setup</h3>
                <p>Ergonomic gaming chairs and high-definition monitors for an immersive experience.</p>
            </div>
            <div className="bg-light-surface dark:bg-dark-surface p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-brand-secondary mb-2">Easy Online Booking</h3>
                <p>Reserve your favorite console from anywhere, anytime with our seamless booking system.</p>
            </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
