import React, { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  href?: string;
  target?: string;
  rel?: string;
  strength?: number; // 0 to 1, recommended 0.3 to 0.45
  title?: string;
  type?: 'button' | 'submit' | 'reset';
  as?: 'button' | 'a';
}

export default function MagneticButton({
  children,
  className = '',
  onClick,
  href,
  target,
  rel,
  strength = 0.38,
  title,
  type = 'button',
  as = 'button',
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  const springTransition = {
    type: 'spring' as const,
    stiffness: 260,
    damping: 18,
    mass: 0.15,
  };

  // Content with slight subtle parallax offset
  const innerContent = (
    <motion.div
      animate={{
        x: position.x * 0.4,
        y: position.y * 0.4,
      }}
      transition={springTransition}
      className="w-full h-full flex items-center justify-center gap-2 pointer-events-none"
    >
      {children}
    </motion.div>
  );

  if (as === 'a' || href) {
    return (
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={{
          x: position.x,
          y: position.y,
        }}
        transition={springTransition}
        className="inline-block"
      >
        <a
          href={href}
          target={target}
          rel={rel}
          onClick={onClick}
          title={title}
          className={`${className} cursor-pointer block select-none`}
        >
          {innerContent}
        </a>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={springTransition}
      className="inline-block"
    >
      <button
        type={type}
        onClick={onClick}
        title={title}
        className={`${className} cursor-pointer select-none`}
      >
        {innerContent}
      </button>
    </motion.div>
  );
}
