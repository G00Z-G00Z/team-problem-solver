import React, {
  useCallback,
  useEffect,
  useReducer,
  useState
  } from 'react'
import { MemberWithJobsDisplay } from './MemberWithJobsDisplay'
import { ProblemPage } from '../interface'
import { ReactComponent as TrashIcon } from '../../assets/delete.svg'
import { TaskElement } from './TaskElement'
import { TaskInput } from './TaskInput'
import { TaskReducer } from './TasksReducer'
import {
  divideUpWork,
  MemberWithJobs,
  Task,
} from "../../problem-algorithms/divideUpWork";

export const DivideUpWork: ProblemPage = ({ team }) => {
  const [tasksWithCheckbox, dispatch] = useReducer(TaskReducer, []);

  const [dividedTasks, setDividedTasks] = useState<MemberWithJobs[]>([]);

  const [anyElementIsChecked, setAnyElementIsChecked] = useState(
    tasksWithCheckbox.some(({ checked }) => checked)
  );

  const [lenTasks, setLenTasks] = useState(0);

  useEffect(() => {
    setAnyElementIsChecked(tasksWithCheckbox.some(({ checked }) => checked));
    setLenTasks(tasksWithCheckbox.length);
  }, [tasksWithCheckbox]);

  const handleAddingTask = (task: Task) => {
    setDividedTasks([]);
    dispatch({
      type: "Add",
      payload: {
        task,
      },
    });
  };

  const handleUpdate = (idx: number, { desc, weight }: Partial<Task>) => {
    dispatch({
      type: "Update",
      payload: {
        idx,
        desc,
        weight,
      },
    });
  };

  const handleToggleCheck = (idx: number) => {
    dispatch({
      type: "Toggle Selection",
      payload: {
        idx,
      },
    });
  };

  const handleDividing = () => {
    dispatch({
      type: "Clean up",
    });

    const tasksNormalized = tasksWithCheckbox
      .filter(({ task }) => task.desc !== "")
      .map(({ task }) => task);

    tasksNormalized.length > 0
      ? setDividedTasks(divideUpWork(team.members, tasksNormalized))
      : setDividedTasks([]);
  };

  return (
    <div className="pb-10">
      <h1 className="w-full text-5xl font-serif text-center font-bold ">
        Divide Up Work
      </h1>

      <TaskInput handleAdding={handleAddingTask} color={team.color} />

      {/* Controls */}
      <header>
        <input
          type="checkbox"
          checked={anyElementIsChecked}
          onChange={() =>
            dispatch({
              type: "Toggle Selection All",
            })
          }
          disabled={lenTasks === 0}
        />

        {anyElementIsChecked && (
          <button
            onClick={() => {
              dispatch({
                type: "Delete",
              });
            }}
            className="bg-danger"
          >
            <TrashIcon className="fill-inherit stroke-1" />
          </button>
        )}
      </header>

      <table className="mt-2 w-full">
        <colgroup>
          <col span={1} className="w-1/12 " />
          <col span={1} className="w-8/12" />
          <col span={1} className="w-3/12" />
        </colgroup>
        <thead className="border-b-2 border-b-CTA-400 border-b-double">
          <tr className="">
            <th className="" colSpan={2}>
              Descripcion
            </th>
            <th className="">Weight</th>
          </tr>
        </thead>
        <tbody>
          {tasksWithCheckbox.map((element, idx) => (
            <TaskElement
              handleUpdate={handleUpdate}
              handleToggleCheck={handleToggleCheck}
              idx={idx}
              {...element}
              key={idx}
            />
          ))}
        </tbody>
      </table>

      <button
        className="text-2xl bg-CTA-400 "
        onClick={handleDividing}
        disabled={lenTasks === 0}
      >
        Divide up Work
      </button>
      <section className="flex flex-wrap gap-3 justify-center my-2">
        {lenTasks !== 0 &&
          dividedTasks.map((member, idx) => (
            <MemberWithJobsDisplay key={idx} {...member} color={team.color} />
          ))}
      </section>
    </div>
  );
};
