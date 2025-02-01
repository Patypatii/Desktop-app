import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "../../lib/utils.js";
import PropTypes from "prop-types"; // Import PropTypes

export function Switch({ checked, onCheckedChange, className, ...props }) {
  return (
    <SwitchPrimitive.Root
      checked={checked}
      onCheckedChange={(newChecked) => onCheckedChange(newChecked)} // Ensures correct event handling
      className={cn(
        "w-12 h-6 rounded-full flex items-center p-1 transition-all duration-300",
        checked ? "bg-blue-500" : "bg-gray-400", // Ensuring color changes correctly
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "w-5 h-5 bg-white rounded-full shadow-md transform transition-all duration-300",
          checked ? "translate-x-6" : "translate-x-0"
        )}
      />
    </SwitchPrimitive.Root>
  );
}

// PropTypes validation for 'checked', 'onCheckedChange', and 'className'
Switch.propTypes = {
  checked: PropTypes.bool.isRequired,        // 'checked' should be a boolean (required)
  onCheckedChange: PropTypes.func.isRequired, // 'onCheckedChange' should be a function (required)
  className: PropTypes.string,               // 'className' should be a string (optional)
};

export default Switch;
