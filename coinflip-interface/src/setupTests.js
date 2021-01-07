import {
  toHaveAttribute,
  toBeInTheDocument,
  toHaveClass,
  toHaveTextContent,
} from '@testing-library/jest-dom/matchers';
import MutationObserver from '@sheerun/mutationobserver-shim';

expect.extend({
  toHaveAttribute,
  toBeInTheDocument,
  toHaveClass,
  toHaveTextContent,
});

window.MutationObserver = MutationObserver;
