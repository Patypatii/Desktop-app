import { cn } from "../../lib/utils.js";
import PropTypes from "prop-types"; // Import PropTypes

export function Button({ className, children, ...props }) {
  return (
    <button
      className={cn(
        "bg-gradient-to-r from-blue-500 via-[#6D28D9] hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}


Button.propTypes = {
  className: PropTypes.string,  // 'className' should be a string (optional)
  children: PropTypes.node.isRequired,  // 'children' should be any renderable React node (required)
};

export default Button;
