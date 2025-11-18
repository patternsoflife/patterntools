/**
 * Pattern SVG configuration.
 */

import { createContext } from 'react';

/**
 * Configuration parameters that influence how the SVG is generated.
 * 
 * We can add more parameters to this in the future.
 */
export type PatternSVGConfig = { useDropShadows: boolean };


/**
 * The context that contains the parameters.
 */
export const SvgContext = createContext<PatternSVGConfig>({ useDropShadows: false });
