
    import React, { useEffect, useRef } from 'react';
    import { animate, motion, useInView } from 'framer-motion';

    const AnimatedCounter = ({ to, className, initial = 0, duration = 1.5 }) => {
      const ref = useRef(null);
      const isInView = useInView(ref, { once: true, amount: 0.5 }); // Trigger when 50% visible
      const countRef = useRef(null);

      useEffect(() => {
        if (isInView && countRef.current) {
          const node = countRef.current;

          const controls = animate(initial, to, {
            duration: duration,
            onUpdate(value) {
              // Check if the target value is a percentage
              if (typeof to === 'string' && to.includes('%')) {
                node.textContent = `${value.toFixed(1)}%`;
              }
              // Check if target value is an integer
              else if (Number.isInteger(to)) {
                 node.textContent = value.toFixed(0);
              }
              // Otherwise, assume float (or handle other types if needed)
              else {
                 node.textContent = value.toFixed(1); // Default to 1 decimal place for floats
              }
            },
          });

          return () => controls.stop();
        }
      }, [to, isInView, initial, duration]);

      return <span ref={ref}><span ref={countRef}>{initial}</span></span>;
    };

    export default AnimatedCounter;
  