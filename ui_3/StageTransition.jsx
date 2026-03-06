// src/ui/transitions/StageTransition.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const StageTransition = ({ fromStage, toStage }) => {
  const navigate = useNavigate();
  const [transitioning, setTransitioning] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTransitioning(false);
      navigate(`/${toStage}`);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [toStage, navigate]);

  return (
    <motion.div
      initial={{ opacity: 1, x: 0 }}
      animate={transitioning ? { opacity: 0, x: -100 } : { opacity: 1, x: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative z-10 text-white text-4xl">
        Transitioning to Stage {toStage}...
      </div>
    </motion.div>
  );
};
