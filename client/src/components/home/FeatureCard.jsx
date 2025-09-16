const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center border-transparent border-2 gap-4 hover:transform hover:scale-110 transition duration-300 hover:border-2 hover:border-[#F7B1AB]">
      <h2 className="text-2xl font-bold text-[#495867]">{title}</h2>
      <div className="text-6xl">{icon}</div>
      <p className="text-lg text-[#495867] text-center">{description}</p>
    </div>
  );
};

export default FeatureCard;
