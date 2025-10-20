import { renderHook, act } from "@testing-library/react";
import {
  useGlobalKeyboard,
  usePlayerKeyboard,
  useNavigationKeyboard,
} from "./useGlobalKeyboard";

// Mock React Router
jest.mock("react-router-dom", () => ({
  useLocation: () => ({ pathname: "/test" }),
}));

describe("useGlobalKeyboard Hook", () => {
  let mockHandler;

  beforeEach(() => {
    mockHandler = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Basic Functionality", () => {
    test("registers shortcuts", () => {
      const { result } = renderHook(() =>
        useGlobalKeyboard({ context: "test" })
      );

      act(() => {
        result.current.registerShortcut("space", mockHandler, {
          context: "test",
          description: "Test shortcut",
        });
      });

      const shortcuts = result.current.getShortcuts();
      expect(shortcuts).toHaveLength(1);
      expect(shortcuts[0].key).toBe("space");
    });

    test("unregisters shortcuts", () => {
      const { result } = renderHook(() => useGlobalKeyboard());

      act(() => {
        result.current.registerShortcut("space", mockHandler);
        result.current.unregisterShortcut("space");
      });

      const shortcuts = result.current.getShortcuts();
      expect(shortcuts).toHaveLength(0);
    });

    test("gets shortcuts for current context", () => {
      const { result } = renderHook(() =>
        useGlobalKeyboard({ context: "test" })
      );

      act(() => {
        result.current.registerShortcut("space", mockHandler, {
          context: "test",
        });
        result.current.registerShortcut("enter", mockHandler, {
          context: "other",
        });
        result.current.registerShortcut("escape", mockHandler, {
          context: "global",
        });
      });

      const shortcuts = result.current.getShortcuts();
      expect(shortcuts).toHaveLength(2); // 'test' and 'global' contexts
    });
  });

  describe("Key Matching", () => {
    test("normalizes key strings", () => {
      const { result } = renderHook(() => useGlobalKeyboard());

      const normalized = result.current.normalizeKey("Ctrl + K");
      expect(normalized).toBe("control+k");
    });

    test("matches simple keys", () => {
      const { result } = renderHook(() => useGlobalKeyboard());

      const event = new KeyboardEvent("keydown", { key: " " });
      const matches = result.current.matchesKey(event, "space");
      expect(matches).toBe(true);
    });

    test("matches modifier keys", () => {
      const { result } = renderHook(() => useGlobalKeyboard());

      const event = new KeyboardEvent("keydown", {
        key: "k",
        ctrlKey: true,
      });
      const matches = result.current.matchesKey(event, "ctrl+k");
      expect(matches).toBe(true);
    });

    test("handles case insensitive matching", () => {
      const { result } = renderHook(() => useGlobalKeyboard());

      const event = new KeyboardEvent("keydown", { key: " " });
      const matches = result.current.matchesKey(event, "SPACE");
      expect(matches).toBe(true);
    });
  });

  describe("Focus Management", () => {
    beforeEach(() => {
      // Create test DOM elements
      document.body.innerHTML = `
        <button id="btn1">Button 1</button>
        <input id="input1" type="text" />
        <button id="btn2">Button 2</button>
        <a href="#" id="link1">Link 1</a>
      `;
    });

    afterEach(() => {
      document.body.innerHTML = "";
    });

    test("finds focusable elements", () => {
      const { result } = renderHook(() => useGlobalKeyboard());

      const focusableElements = result.current.findFocusableElements();
      expect(focusableElements).toHaveLength(4);
    });

    test("focuses next element", () => {
      const { result } = renderHook(() => useGlobalKeyboard());

      act(() => {
        result.current.focusNext();
      });

      // eslint-disable-next-line testing-library/no-node-access
      const focusedElement = document.activeElement;
      expect(focusedElement.id).toBe("btn1");
    });

    test("focuses previous element", () => {
      const { result } = renderHook(() => useGlobalKeyboard());

      act(() => {
        result.current.focusNext(); // Focus first
        result.current.focusPrevious(); // Go back
      });

      // eslint-disable-next-line testing-library/no-node-access
      const focusedElement = document.activeElement;
      expect(focusedElement.id).toBe("link1"); // Last element
    });

    test("focuses first element", () => {
      const { result } = renderHook(() => useGlobalKeyboard());

      act(() => {
        result.current.focusFirst();
      });

      // eslint-disable-next-line testing-library/no-node-access
      const focusedElement = document.activeElement;
      expect(focusedElement.id).toBe("btn1");
    });

    test("focuses last element", () => {
      const { result } = renderHook(() => useGlobalKeyboard());

      act(() => {
        result.current.focusLast();
      });

      // eslint-disable-next-line testing-library/no-node-access
      const focusedElement = document.activeElement;
      expect(focusedElement.id).toBe("link1");
    });
  });

  describe("Context Awareness", () => {
    test("returns correct context", () => {
      const { result } = renderHook(() =>
        useGlobalKeyboard({ context: "player" })
      );

      expect(result.current.context).toBe("player");
    });

    test("returns enabled state", () => {
      const { result } = renderHook(() =>
        useGlobalKeyboard({ enabled: false })
      );

      expect(result.current.enabled).toBe(false);
    });
  });
});

describe("usePlayerKeyboard Hook", () => {
  const mockPlayerActions = {
    onPlayPause: jest.fn(),
    onNext: jest.fn(),
    onPrevious: jest.fn(),
    onVolumeUp: jest.fn(),
    onVolumeDown: jest.fn(),
    onToggleLyrics: jest.fn(),
    onClosePlayer: jest.fn(),
  };

  beforeEach(() => {
    Object.values(mockPlayerActions).forEach((fn) => fn.mockClear());
  });

  test("provides player keyboard utilities", () => {
    const { result } = renderHook(() => usePlayerKeyboard(mockPlayerActions));

    expect(typeof result.current.registerShortcut).toBe("function");
    expect(typeof result.current.unregisterShortcut).toBe("function");
  });
});

describe("useNavigationKeyboard Hook", () => {
  beforeEach(() => {
    // Create test DOM elements
    document.body.innerHTML = `
      <button id="btn1">Button 1</button>
      <input id="input1" type="text" />
      <button id="btn2">Button 2</button>
    `;
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  test("provides focus navigation utilities", () => {
    const { result } = renderHook(() => useNavigationKeyboard());

    expect(typeof result.current.focusNext).toBe("function");
    expect(typeof result.current.focusPrevious).toBe("function");
    expect(typeof result.current.focusFirst).toBe("function");
    expect(typeof result.current.focusLast).toBe("function");
  });

  test("focuses elements correctly", () => {
    const { result } = renderHook(() => useNavigationKeyboard());

    act(() => {
      result.current.focusFirst();
    });

    // eslint-disable-next-line testing-library/no-node-access
    expect(document.activeElement.id).toBe("btn1");

    act(() => {
      result.current.focusLast();
    });

    // eslint-disable-next-line testing-library/no-node-access
    expect(document.activeElement.id).toBe("btn2");
  });
});
