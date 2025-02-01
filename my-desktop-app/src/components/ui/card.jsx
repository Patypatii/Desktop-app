import { cn } from "../../lib/utils.js";
import PropTypes from "prop-types"; // Import PropTypes for validation

// Card component
export function Card({ className, children, ...props }) {
  return (
    <div className={cn("bg-white shadow-md rounded-xl p-4", className)} {...props}>
      {children}
    </div>
  );
}

// CardContent component
export function CardContent({ className, children, ...props }) {
  return (
    <div className={cn("p-4", className)} {...props}>
      {children}
    </div>
  );
}

// PropTypes validation for Card
Card.propTypes = {
  children: PropTypes.node.isRequired,      // 'children' should be a React node (required)
  className: PropTypes.string,              // 'className' should be a string (optional)
};

// PropTypes validation for CardContent
CardContent.propTypes = {
  children: PropTypes.node.isRequired,      // 'children' should be a React node (required)
  className: PropTypes.string,              // 'className' should be a string (optional)
};
