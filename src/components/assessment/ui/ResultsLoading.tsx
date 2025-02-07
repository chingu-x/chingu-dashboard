"use client";
import Image from "next/image";
import React, { createContext } from "react";
import { motion } from "framer-motion";

export default function ResultsLoading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <motion.div
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Image
          src="/img/assessment/analyzing_results.png"
          alt="Analyzing Results"
          width={205}
          height={161}
          className="h-auto w-auto"
        />
      </motion.div>
    </div>
  );
}
