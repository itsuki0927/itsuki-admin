import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react';

interface State {
  collapsed: boolean;
}

type Action =
  | {
      type: 'OPEN_COLLAPSE';
    }
  | {
      type: 'CLOSE_COLLAPSE';
    };

type Actions = {
  openCollapse: () => void;
  closeCollapse: () => void;
  toggleCollapse: () => void;
};

const initialState: State = {
  collapsed: false,
};

const UIContext = createContext<State & Partial<Actions>>(initialState);

const uiReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'OPEN_COLLAPSE': {
      return {
        ...state,
        collapsed: true,
      };
    }
    case 'CLOSE_COLLAPSE': {
      return {
        ...state,
        collapsed: false,
      };
    }
    default:
      return state;
  }
};

export const UIProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  const openCollapse = useCallback(() => dispatch({ type: 'OPEN_COLLAPSE' }), []);
  const closeCollapse = useCallback(() => dispatch({ type: 'CLOSE_COLLAPSE' }), []);
  const toggleCollapse = useCallback(
    () =>
      state.collapsed
        ? dispatch({ type: 'CLOSE_COLLAPSE' })
        : dispatch({ type: 'OPEN_COLLAPSE' }),
    [state.collapsed]
  );

  const value = useMemo(() => {
    return {
      ...state,
      toggleCollapse,
      openCollapse,
      closeCollapse,
    };
  }, [closeCollapse, openCollapse, state, toggleCollapse]);

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('ui context error');
  }
  return context;
};
