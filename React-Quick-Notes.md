### ShortCut:
- `useMemo` is to memoize a calculation result between a function's calls and between renders
- `useCallback` is to memoize a callback itself (referential equality) between renders
- `useRef` is to keep data between renders (updating does not fire re-rendering)
- `useState` is to keep data between renders (updating will fire re-rendering)
- `memo` is not a hook, its a HOC, it memoized a `Component` (not a primitive value)
- `useContext` and `createContext`
- `useReducer` and `useContext` combination
- Custom Hook

### `useMemo` & `memo`:
`memo` is used for memorizing a computed component, and `useMemo` is used for memorizing computed value.

`memo` is a HOC (Higher Ordered Component) which can skip re-rendering the passed component when its props are unchanged. It will always return a React Component.


```tsx
/** 
* returns computed Component
* usages: <MemoizedComponent ...props? />
*/
const MemoizedComponent = memo(FuctionalComponent, optionalPropsEqalityComparatorFn?);

/**
* returns value
*/
const memoizedValue = useMemo(callbackFn, [dep1, dep2])
```
React usages `Object.is` comparison for comparing props's changes

Note: Object.is(3, 3) is true, but for comparing Objects, Object.is({}, {}) is false. So if the prop is an object, use `useMemo` to prevent the parent component from re-creating that object every time.

```tsx
function Page() {
  const [name, setName] = useState('Taylor');
  const [age, setAge] = useState(42);

  const person = useMemo(
    () => ({ name, age }),
    [name, age]
  );

  return <Profile person={person} />;
}

const Profile = memo(function Profile({ person }) {
  // ...
});
```

For custom comparison function https://react.dev/reference/react/memo#specifying-a-custom-comparison-function


### `useCallback`:
useCallback fixes performance issues when inline event handlers like onClick={() => { doSomething(...); } cause PureComponent child re-rendering.
```tsx
function Parent({ ... }) {
  const [a, setA] = useState(0);
  const onPureChange = useCallback(() => {doSomething(a);}, []);
  ... 
  return (
    ...
    <Pure onChange={onPureChange} />
  );
}
```

### useMemo(fn, [deps]) vs useCallback(fn, [deps]):
`useCallback` returns its function uncalled it can be called later, while useMemo calls its function and returns the result.

```tsx
function foo() {
  return 'bar';
}

const memoizedCallback = useCallback(foo, []);
const memoizedResult = useMemo(foo, []);

memoizedCallback;
// ƒ foo() {
//   return 'bar';
// }
memoizedResult; // 'bar'
memoizedCallback(); // 'bar'
memoizedResult(); // 🔴 TypeError
```

### `useContext`:
https://react.dev/learn/managing-state#passing-data-deeply-with-context


### `useReducer`:
Reducer function `(tasks,actions) => tasks` holds all the state update logics. Event handlers dispatch `action` object to update state by accessing the Reducer fn and initial state through useReducer, `const [currentState, dispatch] = useReducer( reducerFn, initialState )`

https://react.dev/learn/managing-state#extracting-state-logic-into-a-reducer

```jsx
import { useReducer } from 'react';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    initialTasks
  );

  function handleAddTask(text) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: 'changed',
      task: task
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId
    });
  }

  return (
    <>
      <h1>Prague itinerary</h1>
      <AddTask
        onAddTask={handleAddTask}
      />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}

function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [...tasks, {
        id: action.id,
        text: action.text,
        done: false
      }];
    }
    case 'changed': {
      return tasks.map(t => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

let nextId = 3;
const initialTasks = [
  { id: 0, text: 'Visit Kafka Museum', done: true },
  { id: 1, text: 'Watch a puppet show', done: false },
  { id: 2, text: 'Lennon Wall pic', done: false }
];
```

Example using typescript

```tsx
import React, { useReducer } from 'react';
import './style.css';

/**
 * useReducer example
 */

// Application State
interface AppState {
  counter: number;
  random: number;
}

// Actions
type Increment = { type: 'increment'; payload: number };
type Random = { type: 'random' };
type AppActions = Increment | Random;

// Reducer
function appReducer(state: AppState, action: AppActions) {
  switch (action.type) {
    case 'increment':
      return { ...state, counter: state.counter + action.payload };
    case 'random':
      return { ...state, random: Math.random() };
    default:
      return state;
  }
}

// Default State
const initialState: AppState = { counter: 0, random: 0 }

// App Component
export default function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <div className="comp">
      <h1>Demo: React useReducer</h1>
      <button onClick={() => dispatch({ type: 'increment', payload: 10 })}>
        "Increment" Action
      </button>
      <button onClick={() => dispatch({ type: 'random' })}>
        "Random" Action
      </button>
      <Parent>
        <Child1 value={state.counter} />
        <Child2 value={state.random} />
      </Parent>
    </div>
  );
}
// Parent Component
const Parent = ({ children }: { children: any }) => {
  console.log(' Dashboard: render');
  return (
    <div className="comp">
      Dashboard
      {children}
    </div>
  );
};

// Child Component
const Child1 = React.memo((props: { value: number }) => {
  console.log('  Panel1: render');
  return <div className="comp">Count: {props.value}</div>;
});

// Child Component
const Child2 = React.memo((props: { value: number }) => {
  console.log('  Panel 2: render');
  return <div className="comp">Random Value: {props.value}</div>;
});

```


### useReducer + useContext:
Reducers let you consolidate a component’s state update logic. Context lets you pass information deep down to other components. You can combine reducers and context together to manage state of a complex screen.

With this approach, a parent component with complex state manages it with a reducer. Other components anywhere deep in the tree can read its state via context. They can also dispatch actions to update that state.

https://react.dev/learn/managing-state#scaling-up-with-reducer-and-context



### State Management In Depth:
https://react.dev/learn/managing-state