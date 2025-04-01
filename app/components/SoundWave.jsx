"use client";
import React, { useEffect } from "react";

const SoundWave = ({ isAnimating }) => {
  useEffect(() => {
    const bars = document.querySelectorAll(".bar");
    bars.forEach((item) => {
      if (isAnimating) {
        item.style.animationDuration = `${Math.random() * (0.7 - 0.2) + 0.2}s`;
        item.style.animationPlayState = "running";
      } else {
        item.style.animationPlayState = "paused";
      }
    });
  }, [isAnimating]);

  const renderBars = () => {
    const bars = [];
    for (let i = 0; i < 160; i++) {
      bars.push(<div className="bar" key={i} />);
    }
    return bars;
  };

  return <div className="sound-wave">{renderBars()}</div>;
};

export default SoundWave;
