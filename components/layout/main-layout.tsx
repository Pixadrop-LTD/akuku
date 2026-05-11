"use client"

import { motion } from "framer-motion"

interface MainContentProps {
  children: React.ReactNode
}

export const MainLayout = ({ children }: MainContentProps) => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative w-full overflow-hidden"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 bottom-0 z-0 translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/30 blur-3xl"
        style={{ width: "2000px", height: "2000px" }}
      ></motion.div>
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 z-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/30 blur-3xl"
        style={{ width: "2000px", height: "2000px" }}
      ></motion.div>
      {children}
    </motion.main>
  )
}
