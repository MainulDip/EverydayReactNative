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

### Context API (`createContext`, `useContext` & `Context.Provider` Wrapper Component):
Creating, Using and Providing/Modifying Context Value is exactly 3 steep process.

- named export`createContext<T>(supply_default_Or_Empty_value)`
- get reference of the Context by `useContext(theCreatedContext)`
- Wrap all the child Component with <TheReferencedContext.Provider value={supply_New_Or_Modify_Value_For_The_Referenced-Context}>{children} </TheReferencedContext.Provider>

```jsx
// App.js
import Heading from './Heading.js';
import Section from './Section.js';

export default function Page() {
  return (
    <Section>
      <Heading>Title</Heading>
      <Section>
        <Heading>Heading</Heading>
        <Heading>Heading</Heading>
        <Heading>Heading</Heading>
        <Section>
          <Heading>Sub-heading</Heading>
          <Heading>Sub-heading</Heading>
          <Heading>Sub-heading</Heading>
          <Section>
            <Heading>Sub-sub-heading</Heading>
            <Heading>Sub-sub-heading</Heading>
            <Heading>Sub-sub-heading</Heading>
          </Section>
        </Section>
      </Section>
    </Section>
  );
}
```
* Create the Context
```jsx
// LevelContext.jsx
import { createContext } from 'react';
export const LevelContext = createContext(0);
```
* Get reference of the context and Provide the context value 
```jsx
// Section.js
import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

export default function Section({ children }) {
  const level = useContext(LevelContext);
  return (
    <section className="section">
      <LevelContext.Provider value={level + 1}>
        {children}
      </LevelContext.Provider>
    </section>
  );
}
```
* Get reference of the context and based on the context value, return different things
```jsx
// Heading.js
import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

export default function Heading({ children }) {
  const level = useContext(LevelContext);
  switch (level) {
    case 0:
      throw Error('Heading must be inside a Section!');
    case 1:
      return <h1>{children}</h1>;
    case 2:
      return <h2>{children}</h2>;
    case 3:
      return <h3>{children}</h3>;
    case 4:
      return <h4>{children}</h4>;
    case 5:
      return <h5>{children}</h5>;
    case 6:
      return <h6>{children}</h6>;
    default:
      throw Error('Unknown level: ' + level);
  }
}
```
* Note : the example above, we create the context inside LevelContext.js file. Then in App.js, each time we wrap a Heading with a Section Component, We define a value by Context.Provider (in Section.js) component which is contextual to its children. The further we nest, the further we provide new context value by incrementing from parent context value. Finally form Heading.js, we read the current context value and return different things using switch statement also define error boundary if Heading is not wrapped by a Section Component (aka, the default context value needs to be modified) & the deep nesting cannot be more than 6 level.

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
/**
 * useReducer example
 */

import React, { ReactNode, useReducer } from "react";

// Application State
interface AppState {
  counter: number;
  random: number;
}

// Actions
type Increment = { type: "increment"; payload: number };
type Random = { type: "random" };
type AppActions = Increment | Random;

// Default State
const initialState: AppState = { counter: 0, random: 0 };

// Reducer
function appReducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case "increment":
      return { ...state, counter: state.counter + action.payload };
    case "random":
      return { ...state, random: Math.random() };
    default:
      return state;
  }
}

// Root Component
export default function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <div style={{ margin: "7px" }}>
      <button
        style={{
          border: "1px solid black",
          padding: "7px 4px",
          marginRight: "20px",
        }}
        onClick={() => dispatch({ type: "increment", payload: 10 })}
      >
        "Increment" Action
      </button>
      <button
        style={{
          border: "1px solid black",
          padding: "7px 4px",
        }}
        onClick={() => dispatch({ type: "random" })}
      >
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
const Parent = ({ children }: { children: ReactNode }) => {
  console.log(" Dashboard: render");
  return <div className="comp">{children}</div>;
};

// Child Component
const Child1 = React.memo((props: { value: number }) => {
  console.log("  Panel1: render");
  return <div className="comp">Count: {props.value}</div>;
});

// Child Component
const Child2 = React.memo((props: { value: number }) => {
  console.log("  Panel 2: render");
  return <div className="comp">Random Value: {props.value}</div>;
});

```


### useReducer + useContext:
Reducers let you consolidate a component’s state update logic. Context lets you pass information deep down to other components. You can combine reducers and context together to manage state of a complex screen.

With this approach, a parent component with complex state manages it with a reducer. Other components anywhere deep in the tree can read its state via context. They can also dispatch actions to update that state.

https://react.dev/learn/managing-state#scaling-up-with-reducer-and-context

```tsx
// App.tsx
import AddTask from "./AddTask.js";
import TaskList from "./TaskList";
import { TasksProvider } from "./TasksContext";

export default function TaskApp() {
  return (
    <TasksProvider>
      <h1>Day off in Kyoto</h1>
      <AddTask />
      <TaskList />
    </TasksProvider>
  );
}
```

* 
```tsx
// TaskList.tsx
import { useState } from "react";
import { useTasks, useTasksDispatch, TaskType } from "./TasksContext";

export default function TaskList() {
  const tasks = useTasks();
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <Task task={task} />
        </li>
      ))}
    </ul>
  );
}

function Task({ task }: { task: TaskType }) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useTasksDispatch();
  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          value={task.text}
          onChange={(e) => {
            dispatch({
              type: "changed",
              task: {
                ...task,
                text: e.target.value,
              },
            });
          }}
        />
        <button onClick={() => setIsEditing(false)}>Save</button>
      </>
    );
  } else {
    taskContent = (
      <>
        {task.text}
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={task.done}
        onChange={(e) => {
          dispatch({
            type: "changed",
            task: {
              ...task,
              done: e.target.checked,
            },
          });
        }}
      />
      {taskContent}
      <button
        onClick={() => {
          dispatch({
            type: "deleted",
            task: task,
          });
        }}
      >
        Delete
      </button>
    </label>
  );
}

```

* 
```tsx
// AddTask.tsx
import { useState } from "react";
import { useTasksDispatch } from "./TasksContext";

export default function AddTask() {
  const [text, setText] = useState("");
  const dispatch = useTasksDispatch();
  return (
    <>
      <input
        placeholder="Add task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={() => {
          setText("");
          dispatch({
            task: { id: nextId++, text: text, done: false },
            type: "added",
          });
        }}
      >
        Add
      </button>
    </>
  );
}

let nextId = 3;

```

* 
```tsx
// TasksContext.tsx
import { ReactNode, createContext, useContext, useReducer } from "react";

type TaskProviderProps = {
  children: ReactNode;
};

export type TaskType = {
  id: number;
  text: string;
  done: boolean;
};

export type Action = {
  type: string;
  task: TaskType;
};

const TasksContext = createContext<TaskType[]>([]);
const TasksDispatchContext = createContext<React.Dispatch<Action>>(() => {});

export function TasksProvider({ children }: TaskProviderProps) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

export function useTasks() {
  return useContext(TasksContext);
}

export function useTasksDispatch() {
  return useContext(TasksDispatchContext);
}

function tasksReducer(tasks: TaskType[], action: Action): TaskType[] {
  switch (action.type) {
    case "added": {
      return [
        ...tasks,
        {
          id: action.task.id,
          text: action.task.text,
          done: false,
        },
      ];
    }
    case "changed": {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case "deleted": {
      return tasks.filter((t) => t.id !== action.task.id);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

const initialTasks = [
  { id: 0, text: "Philosopher’s Path", done: true },
  { id: 1, text: "Visit the temple", done: false },
  { id: 2, text: "Drink matcha", done: false },
];

```



### State Management In Depth:
https://react.dev/learn/managing-state


### Immer: