import React, {
  useCallback,
  useEffect,
  useReducer,
  useState
  } from 'react'
import useForm from '../../hooks/useForm'
import { MemberWithJobsDisplay } from './MemberWithJobsDisplay'
import { ProblemPage } from '../interface'
import { ReactComponent as TrashIcon } from '../../assets/delete.svg'
import { ReactComponent as AddIcon } from '../../assets/queue.svg'
import { RoundedCheckbox } from '../../components/General/RoundedCheckbox'
import { TaskElement } from './TaskElement'
import { TaskInput } from './TaskInput'
import { TaskInputWithCheckbox } from './TaskInputWithCheckbox'
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

  const { desc, onChange, reset, weight } = useForm({
    desc: "",
    weight: "2",
  });

  const [lenTasks, setLenTasks] = useState(0);

  useEffect(() => {
    setAnyElementIsChecked(tasksWithCheckbox.some(({ checked }) => checked));
    setLenTasks(tasksWithCheckbox.length);
  }, [tasksWithCheckbox]);

  const handleKeyDownEvent = (e: { key: string }) => {
    switch (e.key) {
      case "Enter":
        if (!desc) break;
        dispatch({
          type: "Add",
          payload: {
            task: {
              desc,
              weight: Number(weight),
            },
          },
        });
        reset();
        return;

      case "ArrowUp":
        onChange(String(Number(weight) + 1), "weight");
        return;
      case "ArrowDown":
        onChange(String(Number(weight) - 1), "weight");
        return;
    }
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

  const handleDeleteTasks = () => {
    dispatch({
      type: "Delete",
    });
    setDividedTasks([]);
  };

  const handleAddingTask = () => {
    dispatch({
      type: "Add",
      payload: {
        task: {
          desc,
          weight: Number(weight),
        },
      },
    });
    reset();
  };

  const handleToggleAll = () => {
    dispatch({
      type: "Toggle Selection All",
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

    console.log(tasksNormalized);

    tasksNormalized.length > 0
      ? setDividedTasks(divideUpWork(team.members, tasksNormalized))
      : setDividedTasks([]);
  };

  return (
    <div className="pb-10">
      <h1 className="text-gray-900 dark:text-gray-200 w-full text-5xl font-serif text-center font-bold ">
        Divide Up Work
      </h1>

      <div className="m-auto max-w-lg grid grid-cols-1 md:grid-cols-[70%_20%_10%] justify-center items-center gap-4 p-4">
        <TaskInput
          onChangeDesc={(w) => onChange(w, "desc")}
          onChangeWeight={(w) => onChange(w, "weight")}
          handleOnKeyDownEvent={handleKeyDownEvent}
          desc={desc}
          weight={weight}
          color={team.color}
        />
        <button
          onClick={handleAddingTask}
          className="flex justify-center items-center disabled:fill-gray-400 fill-CTA-400 transition-all hover:fill-CTA-500"
          disabled={desc === ""}
        >
          <AddIcon className="fill-inherit stroke-1" />
        </button>
      </div>

      {/* Controls */}
      <header className="w-full max-w-lg m-auto grid grid-cols-12 justify-center items-center  h-10">
        <RoundedCheckbox
          checked={anyElementIsChecked}
          onChange={handleToggleAll}
          disabled={lenTasks === 0}
        />
        <button
          onClick={handleDeleteTasks}
          className="bg-danger col-span-11 fill-danger-200 disabled:fill-gray-400 hover:fill-danger-300 "
          disabled={!anyElementIsChecked}
        >
          <TrashIcon className="fill-inherit stroke-1" />
        </button>
      </header>

      <section
        className="grid grid-cols-1 gap-4 max-w-lg 
      justify-center items-center mx-auto my-2"
      >
        {tasksWithCheckbox.map(({ checked, task }, idx) => {
          const handleWeightChange = (weight: string) =>
            handleUpdate(idx, { weight: Number(weight) });

          const handleDescChange = (desc: string) =>
            handleUpdate(idx, { desc });

          return (
            <TaskInputWithCheckbox
              key={idx}
              task={task}
              checked={checked}
              handleDescChange={handleDescChange}
              handleToggleCheck={() => handleToggleCheck(idx)}
              handleWeightChange={handleWeightChange}
            />
          );
        })}
      </section>

      <div className="w-full flex justify-center items-center">
        <button
          className="bg-CTA-400 text-gray-100 w-32 h-8 px-3 text-xl rounded-md disabled:opacity-75"
          onClick={handleDividing}
          disabled={lenTasks === 0}
        >
          Divide up Work
        </button>
      </div>
      <section className="flex flex-wrap gap-3 justify-center my-2">
        {lenTasks !== 0 &&
          dividedTasks.map((member, idx) => (
            <MemberWithJobsDisplay key={idx} {...member} color={team.color} />
          ))}
      </section>
    </div>
  );
};
