
    import React from 'react';
    import { cn } from "@/lib/utils";
    import { motion } from 'framer-motion';

    const chipVariants = {
      initial: { opacity: 0.6, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      tap: { scale: 0.95 },
      hover: { scale: 1.05 }
    };

    const PlatformChip = ({ icon: Icon, label, isSelected, onClick, color }) => {
      return (
        <motion.button
          variants={chipVariants}
          initial="initial"
          animate="animate"
          whileTap="tap"
          whileHover="hover"
          onClick={onClick}
          className={cn(
            "flex items-center space-x-2 px-3 py-1.5 rounded-full border text-sm font-medium transition-all cursor-pointer",
            isSelected
              ? `${color ? color : 'bg-primary text-primary-foreground'} border-transparent shadow-md`
              : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          )}
        >
          {Icon && <Icon className="h-4 w-4" />}
          <span>{label}</span>
        </motion.button>
      );
    };

    export default PlatformChip;
  