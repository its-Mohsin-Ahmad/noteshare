import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { ParticleCanvas } from './ParticleCanvas';
import { FloatingAcademicElements } from './FloatingAcademicElements';

/**
 * GlobalBackground
 * Mounts once at the root level so particles and academic elements seamlessly float
 * throughout the entire website without re-initializing on page transitions.
 * Automatically dims intensity on dashboard routes to keep data tables & charts crystal clear.
 */
export const GlobalBackground = () => {
  const location = useLocation();

  // Determine if on dashboard route
  const isDashboard = useMemo(() => {
    const path = location.pathname.toLowerCase();
    return path.startsWith('/admin') || path.startsWith('/student');
  }, [location.pathname]);

  const mode = isDashboard ? 'subtle' : 'normal';

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#F8F7F3]"
    >
      {/* Subtle organic warmth vignette */}
      <div className="absolute inset-0 bg-radial-at-t from-transparent via-[#F8F7F3]/40 to-[#F2F1EC]/60 pointer-events-none" />

      {/* Floating academic illustrations and symbols */}
      <FloatingAcademicElements mode={mode} />

      {/* Interactive Canvas Particle System */}
      <ParticleCanvas mode={mode} />
    </div>
  );
};
