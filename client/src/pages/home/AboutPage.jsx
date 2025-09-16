import { Link } from "react-router-dom";
import { FaGripLinesVertical } from "react-icons/fa";

const AboutPage = () => {
  return (
    <div className="bg-[linear-gradient(to_bottom,_#ffffff_0%,_#ffffff_65%,_#bdd5ea_90%,_#bdd5ea_100%)] min-h-screen w-full scroll-smooth">
      {/* 🔝 Header */}
      <header className="sticky top-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-between px-6 py-4 shadow w-full">
        <div className="text-xl font-bold">CRM Cluster</div>
        <nav className="flex gap-4">
          <Link to="/" className="hover:bg-gray-300 rounded-xl py-2 px-3">
            Home
          </Link>
          <Link
            to="/register"
            className="hover:bg-gray-300 rounded-xl py-2 px-3"
          >
            Register
          </Link>
          <Link to="/login" className="hover:bg-gray-300 rounded-xl py-2 px-3">
            Login
          </Link>
          <a href="#contact" className="hover:bg-gray-300 rounded-xl py-2 px-3">
            Contact
          </a>
        </nav>
      </header>

      {/* 🧠 About Section */}
      <section className="px-6 py-12">
        <div className="flex justify-center mb-6">
          <FaGripLinesVertical color="#BDD5EA" size={30} />
          <h1 className="text-3xl font-bold text-center mx-4">About Me</h1>
          <FaGripLinesVertical color="#BDD5EA" size={30} />
        </div>
        <div className="max-w-4xl mx-auto text-center text-gray-700 text-lg leading-relaxed">
          <p className="mb-6">
            Hello! I'm Abdiel, a versatile developer that loves craft real-time
            and interactive systems with socket-based architecture, blending
            technical clarity with playful creativity. I'm specialized in
            creating functional and styled web applications that showcase my
            skills in both front-end and back-end development.
          </p>
          <p className="mb-6">
            Right now I'm working on this CRM Cluster project, which is a
            full-stack Customer Relationship Management (CRM) system. It's
            designed to help freelancers and small businesses efficiently manage
            their clients, tasks, and communication, also is presented to
            showcase my skills and abilities as a developer in a modular,
            scalable, and well-documented system.
          </p>
          <p className="mb-6">
            As a full-stack developer, I'm not just about writing code; I'm
            aiming for accessibility, scalability, and quality in every aspect
            of my work, keeping the user experience and functionality at the
            forefront.
          </p>
          <p>
            Every project I build is a reflection of my values: clarity over
            complexity, resilience over rush, and impact over noise. If you're
            here, you're already part of that journey. This project is a
            testament to my dedication to crafting and you can expect a lot more
            of the same from me in the future.
          </p>
          <p className="mb-6">
            I value modularity, emotional clarity, and systems that invite
            collaboration. My approach blends technical precision with
            human-centered design because code should feel like conversation,
            not confrontation.
          </p>
          <p>
            If you're looking for a developer who builds with empathy, documents
            with clarity, and iterates with resilience, let's connect!. I’d love
            to hear about your project or idea.
          </p>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="flex justify-center mb-6">
          <FaGripLinesVertical color="#BDD5EA" size={30} />
          <h1 className="text-3xl font-bold text-center mx-4">
            About CRM Cluster
          </h1>
          <FaGripLinesVertical color="#BDD5EA" size={30} />
        </div>
        <div className="max-w-4xl mx-auto text-center text-gray-700 text-lg leading-relaxed">
          <p className="mb-6">
            CRM Cluster is more than a task manager, it's a local and
            cooperative management system that allows you to efficiently manage
            tasks, teams, and shared meaning. By combining the power of
            socket-based architecture with emotionally intelligent UX, CRM
            Cluster empowers users to manage tasks, teams, and shared meaning
            with precision and joy.
          </p>
          <p className="mb-6">
            I work primarily with React, Node.js, and Socket.io tools that allow
            me to build responsive, real-time systems with clarity and control.
            Tailwind CSS helps me style with intention, keeping interfaces clean
            and expressive.
          </p>

          <p className="mb-6">
            Imagine assigning tasks to your team, tracking progress in real
            time, and chatting within the same environment all without losing
            emotional context. CRM Cluster makes that possible.
          </p>
          <p className="mb-6">
            Every feature in CRM Cluster is built as a modular component making
            it easy to scale, adapt, and extend. Whether you're a solo
            freelancer or part of a cooperative team, the system grows with you.
          </p>

          <p className="mb-6">
            CRM Cluster is just the beginning. My goal is to keep evolving this
            system into a toolkit for meaningful collaboration where technology
            supports not just productivity, but purpose.
          </p>
          <p className="mb-6">
            Created by Abdiel, a modular architect of systems and language, this
            platform reflects a commitment to clarity, resilience, and
            sustainable freelance growth.
          </p>
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

export default AboutPage;
