
import React from 'react';

export interface QualificationResult {
  isQualified: boolean;
  type: string;
  reason: string;
  recommendations: string[];
}

export interface ScheduleItem {
  event: string;
  date: string;
  isCompleted?: boolean;
}

export interface UnitType {
  name: string;
  area: string;
  totalUnits: number;
}

// Added to fix AIGenerator errors
export interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  type: 'trigger' | 'condition' | 'action';
}

export interface WorkflowPlan {
  id: string;
  name: string;
  industry: string;
  benefit: string;
  steps: WorkflowStep[];
}

/**
 * Augment the 'react' module to include 'iconify-icon' in JSX.IntrinsicElements.
 * This ensures that standard HTML elements (div, span, nav, etc.) are preserved
 * via declaration merging with React's core types.
 */
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'iconify-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        icon?: string;
        width?: string | number;
        height?: string | number;
        flip?: string;
        rotate?: string | number;
        mode?: string;
        class?: string;
        className?: string;
      }, HTMLElement>;
    }
  }
}

export {};
