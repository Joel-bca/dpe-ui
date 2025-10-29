"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

type Props = {
  steps: string[];
  currentStep: number;
  
  children: React.ReactNode;
  caption?: string;
};

export default function RegisterLayout({ steps, currentStep, children, caption }: Props) {
  const progressPercent = Math.round(((currentStep ?? 0) / Math.max(1, (steps?.length ?? 1) - 1)) * 100);
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);

  const togglePanel = () => setIsPanelCollapsed(!isPanelCollapsed);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 text-gray-900 py-8 w-full flex flex-col">
      {/* Progress bar section (responsive) */}
      <div className="w-full fixed top-0 left-0 right-0 z-40 bg-white/70 backdrop-blur-md border-b border-gray-200 py-4 px-4 md:px-8 shadow-sm">
        <div className="mx-auto max-w-[1200px] w-full">
          <div className="relative w-full rounded-lg overflow-hidden">
            <div className="w-full h-2 bg-gray-200 rounded-full" />
            <motion.div
              className="absolute left-0 top-0 h-2 bg-gradient-to-r from-blue-600 to-sky-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ ease: "easeOut", duration: 0.4 }}
            />
          </div>

          <div className="mt-3 grid grid-cols-3 sm:flex sm:justify-between text-[10px] sm:text-xs md:text-sm text-gray-600">
            {steps?.map((s, idx) => {
              const isActive = idx === currentStep;
              return (
                <div key={s} className={`text-center ${isActive ? "text-blue-700 font-semibold" : "text-gray-500"}`}>
                  {s}
                </div>
              );
            })}
          </div>

          {caption && <p className="mt-2 text-xs text-gray-500 text-center sm:text-left">{caption}</p>}
        </div>
      </div>

      {/* Spacer */}
      <div className="h-24 md:h-28" />

      {/* Main content */}
      <div className="flex-1 w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.36 }}
        >
          <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-8 md:p-10 lg:p-12 w-full">
            {children}
          </div>
        </motion.div>
      </div>

      {/* Collapsible resizable handle for large screens */}
      <div className="hidden md:block fixed top-20 right-6 z-50">
        <ResizablePanelGroup direction="horizontal" className="flex items-center">
          <ResizablePanel defaultSize={isPanelCollapsed ? 0 : 100} minSize={0} maxSize={100}>
            <ResizableHandle withHandle>
              <Button variant="ghost" size="icon" onClick={togglePanel} className="h-6 w-6">
                {isPanelCollapsed ? <ChevronRightIcon className="h-4 w-4" /> : <ChevronLeftIcon className="h-4 w-4" />}
              </Button>
            </ResizableHandle>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      <div className="h-24" />
    </div>
  );
}