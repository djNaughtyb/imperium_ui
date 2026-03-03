import { useEffect, useState } from react;
import { useRouter } from next/router;
import { motion } from framer-motion;

export const StageTransition = ({ fromStage, toStage }) => {
  const router = useRouter();
  const [transitioning, setTransitioning] = useState(true);

  useEffect(() => {
    // Trigger transition animation
    const transitionTimeout = setTimeout(() => {
      setTransitioning(false);
      // Navigate to new stage after transition completes
      router.push(`/${toStage}`);
    }, 1000); // Match animation duration

    return () => clearTimeout(transitionTimeout);
  }, [toStage]);

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
