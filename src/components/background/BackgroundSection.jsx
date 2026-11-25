import React from 'react';

/**
 * BackgroundSection
 * Reusable section wrapper providing curated off-white background variations
 * - hero: #F8F7F3
 * - search: #FFFFFF
 * - resources: #F8F7F3
 * - statistics: #F2F1EC
 * - testimonials: #FFFFFF
 * - secondary: #F2F1EC
 * - white: #FFFFFF
 * - navy: #14213D (deliberate dark contrast for footer or accent)
 */
export const BackgroundSection = ({
  variant = 'hero',
  className = '',
  children,
  as: Component = 'section',
  withBorder = false,
  ...props
}) => {
  const variantStyles = {
    hero: 'bg-[#F8F7F3] text-[#14213D]',
    search: 'bg-[#FFFFFF] text-[#14213D]',
    resources: 'bg-[#F8F7F3] text-[#14213D]',
    statistics: 'bg-[#F2F1EC] text-[#14213D]',
    testimonials: 'bg-[#FFFFFF] text-[#14213D]',
    secondary: 'bg-[#F2F1EC] text-[#14213D]',
    white: 'bg-[#FFFFFF] text-[#14213D]',
    navy: 'bg-[#14213D] text-white'
  };

  const borderStyle = withBorder ? 'border-b border-[#E8E6DF]' : '';
  const selectedStyle = variantStyles[variant] || variantStyles.hero;

  return (
    <Component
      className={`relative w-full transition-colors duration-300 ${selectedStyle} ${borderStyle} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};
