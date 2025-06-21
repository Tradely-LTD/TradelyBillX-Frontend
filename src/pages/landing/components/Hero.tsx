import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigation = useNavigate();
  return (
    <section className="bg-gradient-to-r from-green-700 to-green-600 text-white py-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Revolutionizing Trade Documentation & Revenue Collection
            </h1>
            <h2 className="text-xl md:text-2xl mb-8">
              The Digital eWaybill Solution for Modern Governance
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-green-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition duration-300">
                Request a Demo
              </button>
              <button
                onClick={() => navigation("/login")}
                className="bg-transparent border-2 border-white py-3 px-6 rounded-lg hover:bg-white hover:text-green-700 transition duration-300"
              >
                Get Started
              </button>
            </div>
            <div className="mt-6 text-sm">
              <p>A TRADELY LTD Solution</p>
            </div>
          </div>
          <div className="md:w-1/2">
            <img
              src="/images/2.0Dashboard.png"
              alt="eWaybill Dashboard"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
