import {
  divideUpWork,
  MemberWithJobs,
  Task,
} from "../../problem-algorithms/divideUpWork";

const defaultTask: Task = {
  desc: "",
  weight: 1,
};

type State = { checked: boolean; task: Task }[];

type Actions =
  /**
   * Adds a task
   */
  | {
      type: "Add";
    }
  /**
   * Deletes all the tasks chekcked
   */
  | {
      type: "Delete";
    }
  /**
   * Updates the task desc, and changes the weight if other are selected
   */
  | {
      type: "Update";
      payload: {
        idx: number;
        desc?: string;
        weight?: number;
      };
    }
  /**
   * Unchecks / checks a task
   */
  | {
      type: "Toggle Selection";
      payload: {
        idx: number;
      };
    }
  /**
   * Either checks or unchecks all taks
   */
  | {
      type: "Toggle Selection All";
    }
  /**
   * Removes all empty taks
   */
  | {
      type: "Clean up";
    };

export function TaskReducer(state: State, action: Actions): State {
  switch (action.type) {
    case "Add":
      return [...state, { checked: false, task: { ...defaultTask } }];

    case "Delete":
      return state.filter(({ checked }, _) => !checked);

    case "Update": {
      const { idx, desc, weight } = action.payload;

      if (desc === undefined && weight === undefined) return state;

      const newState = [...state];

      if (desc !== undefined) newState[idx].task.desc = desc;

      /**
       * Updates the weight of all elements selected and the element itself
       */
      if (weight !== undefined)
        return newState.map((element, idxElement) => {
          return idxElement === idx || element.checked
            ? {
                ...element,
                task: {
                  ...element.task,
                  weight: weight,
                },
              }
            : element;
        });

      return [...state];
    }
    case "Toggle Selection": {
      return state.map((element, idx) =>
        idx === action.payload.idx
          ? { ...element, checked: !element.checked }
          : element
      );
    }
    case "Toggle Selection All": {
      const shouldDeselect = state.every(({ checked }) => checked);

      return shouldDeselect
        ? state.map((element) => ({ ...element, checked: false }))
        : state.map((element) => ({ ...element, checked: true }));
    }

    case "Clean up":
      return state.filter(({ task }) => task.desc !== "");
  }
}
