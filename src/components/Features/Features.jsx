import React from "react";
import FeaturesJson from "../../assets/data/data.json";

const Features = () => {
  return (
    <main>
      <section className="features">
        <h2 className="sr-only">Features</h2>
        {FeaturesJson.Features.map((feature, index) => (
          <div className="feature-item" key={index}>
            <img src={feature.img} alt={feature.alt} className="feature-icon" />
            <h3 className="feature-item-title">{feature.title}</h3>
            <p>{feature.descrition}</p>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Features;
