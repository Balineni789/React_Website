
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Ecom from '../assets/Ecom.avif';
import Ecom1 from '../assets/Ecom1.jpg';
import Ecom2 from '../assets/Ecom2.avif';
import Ecom3 from '../assets/Ecom3.avif';
import Ecom4 from '../assets/Ecom4.avif';
import Ecom5 from '../assets/Ecom5.jpg';
import Ecom6 from '../assets/Ecom6.jpg';


const Home = () => {
  const navigate = useNavigate(); 
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [Ecom, Ecom1, Ecom2, Ecom3, Ecom4, Ecom5, Ecom6];

  const handleNavigate = () => {
    navigate("/Products")
  }

  const portfolioItems = [
    { 
      id: 1, 
      title: "Mobiles & Laptops", 
      description: "All Models With Latest Technology And With User Requirements are Available.", 
      icon: "💻📱",
      gradient: "from-blue-500 to-indigo-600"
    },
    { 
      id: 2, 
      title: "Headphones", 
      description: "All Types Of Ear-Buds And Headphones Available With The User Requirement.", 
      icon: "🎧",
      gradient: "from-purple-500 to-pink-600"
    },
    { 
      id: 3, 
      title: "Refrigerators", 
      description: "All Types of Compact Fridges With The Availability Of User Needs.", 
      icon: "❄️",
      gradient: "from-cyan-500 to-blue-600"
    },
    { 
      id: 4, 
      title: "AC's", 
      description: "These Summer Would Be Refreshment With These Ultimate Coolness Machines.", 
      icon: "🌬️",
      gradient: "from-teal-500 to-cyan-600"
    },
    { 
      id: 5, 
      title: "TV's", 
      description: "All Types Of Curved U+HD TV's With Availability of The Screen Sizes Available.", 
      icon: "🖥️",
      gradient: "from-gray-600 to-gray-800"
    },
    { 
      id: 6, 
      title: "Washing Machines", 
      description: "All Types Of Front & Top Load Machines Available For User Requirement.", 
      icon: "🧺",
      gradient: "from-green-500 to-emerald-600"
    },
    { 
      id: 7, 
      title: "Shoes", 
      description: "All Types Of Models Available For Both Men and Women FootWear", 
      icon: "👟",
      gradient: "from-orange-500 to-red-600"
    },
    { 
      id: 8, 
      title: "Sofas", 
      description: "The Sofas Quality Is Assured With The Top Companies In Comfort.", 
      icon: "🛋️",
      gradient: "from-amber-500 to-orange-600"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    const slideshowInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    window.addEventListener('scroll', handleScroll);
    setTimeout(() => setIsVisible(true), 500);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(slideshowInterval);
    };
  }, [heroImages.length]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          {heroImages.map((img, index) => (
            <img 
              key={index}
              src={img}
              alt="E-commerce showcase"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </div>
        
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <div className={`text-center text-white max-w-4xl transition-all duration-1000 transform ${
            isVisible ? 'translate-y-10 opacity-100' : 'translate-y-10 opacity-100'
          }`}>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight" style={{position:'relative', top:'10px', left:'-80px', marginBottom:'60px', marginTop:'-100px'}}>
              <span className="block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
               E-Commerce
              </span>
              <span className="block">Solutions</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed">
              Driving Innovation Through Quality Products For Discerning Customers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleNavigate}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              >
                Shop Now
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105">
                Explore Collections
              </button>
            </div>
          </div>
        </div>

      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className={`bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-1000 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="p-12 lg:p-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-8">About Our Company</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mt-2"></div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality You Can Trust</h3>
                      <p className="text-gray-600 leading-relaxed">
                        We believe in offering only top-quality products. Each item in our store is carefully selected to ensure it meets the highest standards of durability, functionality, and style.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-3 h-3 bg-purple-500 rounded-full mt-2"></div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Diverse Product Range</h3>
                      <p className="text-gray-600 leading-relaxed">
                        From the latest electronics and fashionable clothing to home appliances and beauty products, we stock a wide array of categories to suit all tastes and preferences.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Seamless Shopping Experience</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Shopping online should be stress-free. Our easy-to-use platform ensures smooth browsing, secure payments, and reliable delivery.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">10K+</div>
                    <div className="text-gray-600 font-medium">Happy Customers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">500+</div>
                    <div className="text-gray-600 font-medium">Brands</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">24/7</div>
                    <div className="text-gray-600 font-medium">Support</div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <img 
                  src={Ecom1} 
                  alt="Company Vision" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black opacity-20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-6 transition-all duration-1000 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              Our Product Portfolio
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our wide range of premium products designed to meet your every need
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {portfolioItems.map((item, index) => (
              <div 
                key={item.id}
                className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer overflow-hidden ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onMouseEnter={() => setActiveCard(item.id)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                <div className="p-8">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <span>{item.icon}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {item.description}
                  </p>
                  
                  <button className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform group-hover:scale-105 bg-gradient-to-r ${item.gradient} text-white hover:shadow-lg`}>
                    View Products
                  </button>
                </div>

                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white bg-opacity-5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white bg-opacity-5 rounded-full blur-3xl"></div>
          </div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <div className={`transition-all duration-1000 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to Transform Your 
              <span className="block">Shopping Experience?</span>
            </h2>
            <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join thousands of satisfied customers who trust us for their shopping needs and discover the difference quality makes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                Get Started
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;