import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaGripLinesVertical } from "react-icons/fa";
import FeatureCard from "../../components/home/FeatureCard";
import heroSrc from "../../assets/hero-image.jpg";

const HomePage = () => {
  return (
    <div className="bg-[linear-gradient(to_bottom,_#ffffff_0%,_#ffffff_65%,_#bdd5ea_90%,_#bdd5ea_100%)] min-h-screen w-full">
      {/* 🔝 Header */}
      <header className="sticky top-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-between px-6 py-4 shadow w-full">
        <div className="text-xl font-bold">CRM Cluster</div>
        <nav className="flex gap-4">
          <Link
            to="/register"
            className=" hover:bg-gray-300 rounded-xl flex items-center justify-center cursor-pointer py-2 px-3"
          >
            Register
          </Link>
          <Link
            to="/login"
            className=" hover:bg-gray-300 rounded-xl flex items-center justify-center cursor-pointer py-2 px-3"
          >
            Login
          </Link>
          <Link
            to="/about"
            className=" hover:bg-gray-300 rounded-xl flex items-center justify-center cursor-pointer py-2 px-3"
          >
            About
          </Link>

          <a
            href="#contact"
            className="hover:bg-gray-300 rounded-xl flex items-center justify-center cursor-pointer py-2 px-3"
          >
            Contact
          </a>
        </nav>
      </header>

      {/* 🎉 Hero */}
      <section
        className="relative flex flex-col md:flex-row items-center justify-between px-6 py-12 bg-gray-50 w-full"
        style={{
          backgroundImage: `url(${heroSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-white opacity-60 z-0"></div>
        <div className="relative z-10 max-w-xl">
          <h1 className="text-4xl font-bold mb-4">
            Cooperative Real-Time Management
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            CRM Cluster is a real-time management platform that allows you to
            manage your tasks and collaborate with others in a secure and
            efficient way.
          </p>
          <div className="flex gap-4">
            <a
              href="#demo"
              className="btn-secondary hover:bg-[#BDD5EA] py-2 px-3 hover:rounded-xl scroll-smooth"
            >
              Watch Demo
            </a>
          </div>
        </div>
      </section>

      {/* 🧩 Features */}
      <section className="px-6 py-12">
        <div className="flex justify-center mb-12">
          <FaGripLinesVertical color="#BDD5EA" size={30} />
          <h2 className="text-2xl font-bold mb-6 text-center">
            Features of CRM Cluster
          </h2>
          <FaGripLinesVertical color="#BDD5EA" size={30} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cards */}
          <FeatureCard
            title="Real-time management"
            icon={<FaClock color="#F7B1AB" />}
            description={
              "CRM Cluster is a real-time management platform that allows you to manage your tasks and collaborate with others in a secure and efficient way."
            }
          />
          <FeatureCard
            title="Personal environments"
            icon={<FaUserTie color="#F7B1AB" />}
            description={
              "Create and manage your own environment with the tools you need."
            }
          />
          <FeatureCard
            title="Cooperative teamwork"
            icon={<FaUsers color="#F7B1AB" />}
            description={
              "Join, manage, and work together with other users in the same environment."
            }
          />
        </div>
      </section>

      {/* 🎥 Demo Video */}
      <section className="px-6 py-12 w-full flex flex-col" id="demo">
        <div className="flex justify-center mb-6">
          <FaGripLinesVertical color="#BDD5EA" size={30} />
          <h2 className="text-2xl font-bold mb-4 text-center">
            Explore the power of CRM Cluster
          </h2>
          <FaGripLinesVertical color="#BDD5EA" size={30} />
        </div>
        <div className="mb-6">
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/CSGETC9ozto?si=pSHCg2SrvERqUgv9"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
        <div className="flex justify-center">
          <Link
            to="/register"
            className="btn-primary hover:bg-[#577399] bg-white rounded-xl py-2 px-4 hover:rounded-xl hover:text-white"
          >
            Sing Up
          </Link>
        </div>
      </section>

      {/* 📞 Contact / Footer */}
      <footer className="bg-[#495867] text-white px-6 py-8 w-full" id="contact">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Branding & mensaje */}
          <div className="text-center md:text-left">
            <h2 className="text-lg font-semibold">CRM Cluster</h2>
            <p className="text-sm mt-1">
              Modular real-time management system. © 2025
            </p>
            <p className="text-xs mt-2">
              Photo by{" "}
              <a
                href="https://www.pexels.com/es-es/foto/hombre-y-mujer-junto-a-la-mesa-3184465/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-[#F7B1AB]"
              >
                fauxels in Pexels
              </a>
            </p>
          </div>

          {/* Contact */}
          <div className="text-center md:text-right">
            <h3 className="text-sm font-semibold mb-2">Contact</h3>
            <p className="text-sm">
              📞{" "}
              <a
                href="tel:+524777654321"
                className="hover:underline text-white"
              >
                +52 473 333 7760
              </a>
            </p>
            <p className="text-sm">
              📧{" "}
              <a
                href="mailto:abdieljflores.dev@gmail.com"
                className="hover:underline text-white"
              >
                abdiel.dev@gmail.com
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
