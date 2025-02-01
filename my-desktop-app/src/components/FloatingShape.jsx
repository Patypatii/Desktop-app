import PropTypes from "prop-types";
import { motion } from "framer-motion";

const FloatingShape = ({ color, size, top, left, delay }) => {
  return (
    <motion.div
      className={`absolute rounded-full ${color} ${size} opacity-20 blur-xl`}
      style={{
        top: typeof top === "number" ? `${top}px` : top,
        left: typeof left === "number" ? `${left}px` : left,
      }}
      animate={{
        y: [0, 50, 0], 
        x: [0, 30, 0], 
        rotate: [0, 360],
      }}
      transition={{
        duration: 10, 
        ease: "linear",
        repeat: Infinity,
        delay,
      }}
      aria-hidden="true"
    />
  );
};

// ✅ Add PropTypes validation
FloatingShape.propTypes = {
  color: PropTypes.string.isRequired, // Ensure 'color' is a required string
  size: PropTypes.string.isRequired,  // Ensure 'size' is a required string
  top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Allow both number and string
  left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Allow both number and string
  delay: PropTypes.number.isRequired, // Ensure 'delay' is a required number
};

export default FloatingShape;
