
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
 * Augment the global JSX namespace to include 'iconify-icon' for custom elements.
 * This is the standard way to declare custom elements in a TypeScript environment.
 */
declare global {
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

/**
 * Also augment the React.JSX namespace, which is frequently used by modern React versions (18+)
 * and TypeScript configurations (particularly with jsx: react-jsx) to define available elements.
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
