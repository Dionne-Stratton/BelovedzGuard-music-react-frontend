import { useEffect, useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * Global keyboard accessibility hook for managing keyboard shortcuts across the app
 * Provides context-aware shortcuts, focus management, and accessibility features
 *
 * @param {Object} options - Configuration options
 * @param {boolean} options.enabled - Whether keyboard shortcuts are enabled
 * @param {Function} options.onShortcut - Callback for custom shortcuts
 * @param {Object} options.context - Current context (player, navigation, etc.)
 * @returns {Object} Keyboard state and utilities
 */
export const useGlobalKeyboard = (options = {}) => {
  const { enabled = true, onShortcut = null, context = "global" } = options;

  const location = useLocation();
  const shortcutsRef = useRef(new Map());
  const focusableElementsRef = useRef([]);
  const currentFocusIndexRef = useRef(-1);

  /**
   * Register a keyboard shortcut
   * @param {string} key - The key combination (e.g., 'space', 'ctrl+k', 'alt+arrowup')
   * @param {Function} handler - Function to execute when shortcut is triggered
   * @param {Object} options - Shortcut options
   * @param {string} options.context - Context where shortcut is active
   * @param {string} options.description - Description for accessibility
   * @param {boolean} options.preventDefault - Whether to prevent default behavior
   */
  const registerShortcut = useCallback((key, handler, shortcutOptions = {}) => {
    const {
      context: shortcutContext = "global",
      description = "",
      preventDefault = true,
    } = shortcutOptions;

    const shortcut = {
      key: key.toLowerCase(),
      handler,
      context: shortcutContext,
      description,
      preventDefault,
    };

    shortcutsRef.current.set(key.toLowerCase(), shortcut);
  }, []);

  /**
   * Unregister a keyboard shortcut
   * @param {string} key - The key combination to remove
   */
  const unregisterShortcut = useCallback((key) => {
    shortcutsRef.current.delete(key.toLowerCase());
  }, []);

  /**
   * Get all registered shortcuts for current context
   * @returns {Array} Array of shortcut objects
   */
  const getShortcuts = useCallback(() => {
    return Array.from(shortcutsRef.current.values()).filter(
      (shortcut) =>
        shortcut.context === context || shortcut.context === "global"
    );
  }, [context]);

  /**
   * Find focusable elements on the page
   * @returns {Array} Array of focusable DOM elements
   */
  const findFocusableElements = useCallback(() => {
    const focusableSelectors = [
      "button:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      "a[href]",
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]',
    ].join(", ");

    return Array.from(document.querySelectorAll(focusableSelectors)).filter(
      (element) => {
        const style = window.getComputedStyle(element);
        return style.display !== "none" && style.visibility !== "hidden";
      }
    );
  }, []);

  /**
   * Move focus to next focusable element
   */
  const focusNext = useCallback(() => {
    const focusableElements = findFocusableElements();
    if (focusableElements.length === 0) return;

    currentFocusIndexRef.current =
      (currentFocusIndexRef.current + 1) % focusableElements.length;
    focusableElements[currentFocusIndexRef.current]?.focus();
  }, [findFocusableElements]);

  /**
   * Move focus to previous focusable element
   */
  const focusPrevious = useCallback(() => {
    const focusableElements = findFocusableElements();
    if (focusableElements.length === 0) return;

    currentFocusIndexRef.current =
      currentFocusIndexRef.current <= 0
        ? focusableElements.length - 1
        : currentFocusIndexRef.current - 1;
    focusableElements[currentFocusIndexRef.current]?.focus();
  }, [findFocusableElements]);

  /**
   * Focus first focusable element
   */
  const focusFirst = useCallback(() => {
    const focusableElements = findFocusableElements();
    if (focusableElements.length > 0) {
      currentFocusIndexRef.current = 0;
      focusableElements[0].focus();
    }
  }, [findFocusableElements]);

  /**
   * Focus last focusable element
   */
  const focusLast = useCallback(() => {
    const focusableElements = findFocusableElements();
    if (focusableElements.length > 0) {
      currentFocusIndexRef.current = focusableElements.length - 1;
      focusableElements[focusableElements.length - 1].focus();
    }
  }, [findFocusableElements]);

  /**
   * Parse key combination string into normalized format
   * @param {string} keyString - Key combination string
   * @returns {string} Normalized key string
   */
  const normalizeKey = useCallback((keyString) => {
    return keyString
      .toLowerCase()
      .replace(/\s+/g, "")
      .replace("ctrl", "control")
      .replace("cmd", "meta")
      .replace("option", "alt")
      .replace("space", " "); // Convert 'space' to actual space character
  }, []);

  /**
   * Check if a key combination matches the current event
   * @param {KeyboardEvent} event - Keyboard event
   * @param {string} keyString - Key combination string
   * @returns {boolean} Whether the key combination matches
   */
  const matchesKey = useCallback(
    (event, keyString) => {
      const normalizedKey = normalizeKey(keyString);
      const parts = normalizedKey.split("+");

      const key = parts[parts.length - 1];
      const modifiers = parts.slice(0, -1);

      // Check main key
      if (event.key.toLowerCase() !== key) return false;

      // Check modifiers - only check for modifiers that are specified
      const expectedModifiers = {
        control: modifiers.includes("control"),
        alt: modifiers.includes("alt"),
        meta: modifiers.includes("meta"),
        shift: modifiers.includes("shift"),
      };

      // If no modifiers expected, ensure none are pressed
      if (modifiers.length === 0) {
        return (
          !event.ctrlKey && !event.altKey && !event.metaKey && !event.shiftKey
        );
      }

      // Check each expected modifier
      return (
        expectedModifiers.control === event.ctrlKey &&
        expectedModifiers.alt === event.altKey &&
        expectedModifiers.meta === event.metaKey &&
        expectedModifiers.shift === event.shiftKey
      );
    },
    [normalizeKey]
  );

  /**
   * Handle keyboard events
   * @param {KeyboardEvent} event - Keyboard event
   */
  const handleKeyDown = useCallback(
    (event) => {
      if (!enabled) return;

      // Find matching shortcut
      const shortcuts = Array.from(shortcutsRef.current.values());
      const matchingShortcut = shortcuts.find(
        (shortcut) =>
          matchesKey(event, shortcut.key) &&
          (shortcut.context === context || shortcut.context === "global")
      );

      if (matchingShortcut) {
        if (matchingShortcut.preventDefault) {
          event.preventDefault();
        }

        try {
          matchingShortcut.handler(event);
        } catch (error) {
          console.error("Error executing keyboard shortcut:", error);
        }
      }

      // Call custom shortcut handler
      if (onShortcut) {
        onShortcut(event);
      }
    },
    [enabled, context, matchesKey, onShortcut]
  );

  /**
   * Set up global keyboard event listeners
   */
  useEffect(() => {
    if (!enabled) return;

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [enabled, handleKeyDown]);

  /**
   * Update focusable elements when route changes
   */
  useEffect(() => {
    // Reset focus index when route changes
    currentFocusIndexRef.current = -1;

    // Update focusable elements
    focusableElementsRef.current = findFocusableElements();
  }, [location.pathname, findFocusableElements]);

  return {
    // Shortcut management
    registerShortcut,
    unregisterShortcut,
    getShortcuts,

    // Focus management
    focusNext,
    focusPrevious,
    focusFirst,
    focusLast,
    findFocusableElements,

    // Utilities
    normalizeKey,
    matchesKey,

    // State
    context,
    enabled,
  };
};

/**
 * Hook for music player specific keyboard shortcuts
 * @param {Object} playerActions - Player action functions
 * @returns {Object} Player keyboard utilities
 */
export const usePlayerKeyboard = (playerActions = {}) => {
  const {
    onPlayPause = () => {},
    onNext = () => {},
    onPrevious = () => {},
    onVolumeUp = () => {},
    onVolumeDown = () => {},
    onToggleLyrics = () => {},
    onClosePlayer = () => {},
  } = playerActions;

  const { registerShortcut, unregisterShortcut } = useGlobalKeyboard({
    context: "player",
    enabled: true,
  });

  useEffect(() => {
    // Register player shortcuts
    registerShortcut("space", onPlayPause, {
      context: "player",
      description: "Play or pause current song",
      preventDefault: true,
    });

    registerShortcut("arrowright", onNext, {
      context: "player",
      description: "Play next song",
      preventDefault: true,
    });

    registerShortcut("arrowleft", onPrevious, {
      context: "player",
      description: "Play previous song",
      preventDefault: true,
    });

    registerShortcut("arrowup", onVolumeUp, {
      context: "player",
      description: "Increase volume",
      preventDefault: true,
    });

    registerShortcut("arrowdown", onVolumeDown, {
      context: "player",
      description: "Decrease volume",
      preventDefault: true,
    });

    registerShortcut("l", onToggleLyrics, {
      context: "player",
      description: "Toggle lyrics display",
      preventDefault: true,
    });

    registerShortcut("escape", onClosePlayer, {
      context: "player",
      description: "Close music player",
      preventDefault: true,
    });

    // Cleanup on unmount
    return () => {
      unregisterShortcut("space");
      unregisterShortcut("arrowright");
      unregisterShortcut("arrowleft");
      unregisterShortcut("arrowup");
      unregisterShortcut("arrowdown");
      unregisterShortcut("l");
      unregisterShortcut("escape");
    };
  }, [
    registerShortcut,
    unregisterShortcut,
    onPlayPause,
    onNext,
    onPrevious,
    onVolumeUp,
    onVolumeDown,
    onToggleLyrics,
    onClosePlayer,
  ]);

  return {
    registerShortcut,
    unregisterShortcut,
  };
};

/**
 * Hook for navigation keyboard shortcuts
 * @returns {Object} Navigation keyboard utilities
 */
export const useNavigationKeyboard = () => {
  const { registerShortcut, focusNext, focusPrevious, focusFirst, focusLast } =
    useGlobalKeyboard({
      context: "navigation",
      enabled: true,
    });

  useEffect(() => {
    // Register navigation shortcuts
    registerShortcut(
      "tab",
      (event) => {
        if (event.shiftKey) {
          focusPrevious();
        } else {
          focusNext();
        }
      },
      {
        context: "navigation",
        description: "Navigate between focusable elements",
        preventDefault: false, // Let browser handle default tab behavior
      }
    );

    registerShortcut("shift+tab", focusPrevious, {
      context: "navigation",
      description: "Navigate backwards between focusable elements",
      preventDefault: false,
    });

    registerShortcut("home", focusFirst, {
      context: "navigation",
      description: "Focus first element",
      preventDefault: true,
    });

    registerShortcut("end", focusLast, {
      context: "navigation",
      description: "Focus last element",
      preventDefault: true,
    });

    return () => {
      registerShortcut("tab");
      registerShortcut("shift+tab");
      registerShortcut("home");
      registerShortcut("end");
    };
  }, [registerShortcut, focusNext, focusPrevious, focusFirst, focusLast]);

  return {
    focusNext,
    focusPrevious,
    focusFirst,
    focusLast,
  };
};

export default useGlobalKeyboard;
