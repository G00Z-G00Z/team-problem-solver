import React, { useEffect, useReducer, useState } from 'react'
import ReactModal from 'react-modal'
import useForm from '../../hooks/useForm'
import { hashMapWeightData, weightColors } from './interfaces'
import { InstructionModal } from './InstructionModal'
import { MemberWithJobsDisplay } from './MemberWithJobsDisplay'
import { ProblemPage } from '../interface'
import { ReactComponent as TrashIcon } from '../../assets/delete.svg'
import { ReactComponent as AddIcon } from '../../assets/queue.svg'
import { ReactComponent as HelpIcon } from '../../assets/help_outline.svg'
import { RoundedCheckbox } from '../../components/General/RoundedCheckbox'
import { TaskInput } from './TaskInput'
import { TaskInputWithCheckbox } from './TaskInputWithCheckbox'
import { TaskReducer } from './TasksReducer'
import { useModal } from '../../hooks/useModal'
import { useSessionStorage } from '../../hooks/useLocalStorage'
import {
  divideUpWork,
  MemberWithJobs,
  Task,
} from "../../problem-algorithms/divideUpWork";

ReactModal.setAppElement("#root");
export const DivideUpWork: ProblemPage = ({ team }) => {
  // Remebers the jobs
  const [dividedTasksSession, setDividedTaksSession] = useSessionStorage<{
    lastTeamId: number;
    memberWithJobs: MemberWithJobs[];
  }>("Divide_work", {
    lastTeamId: team?.id ?? 1,
    memberWithJobs: [],
  });

  const [isInstructionModalOpen, openInstructionModal, closeInstructionModal] =
    useModal();

  // Has a state with all the jobs
  const [tasksWithCheckbox, dispatch] = useReducer(TaskReducer, []);

  // Check if all the tasks have different weights
  const [areAllTaskTheSameWeight, setAreAllTaskTheSameWeight] = useState(true);

  const [anyElementIsChecked, setAnyElementIsChecked] = useState(
    tasksWithCheckbox.some(({ checked }) => checked)
  );

  const { desc, onChange, reset, weight } = useForm({
    desc: "",
    weight: "4",
  });

  const [lenTasks, setLenTasks] = useState(0);

  // Puts the jobs in the app if the team id is the same as it was
  useEffect(() => {
    if (dividedTasksSession && team?.id === dividedTasksSession?.lastTeamId)
      for (const { jobs } of dividedTasksSession.memberWithJobs)
        for (const job of jobs)
          dispatch({
            type: "Add",
            payload: {
              task: job,
            },
          });
    else
      setDividedTaksSession({ lastTeamId: team?.id ?? 1, memberWithJobs: [] });

    return () => {};
  }, []);

  // Changes in tasksWithCheckbox
  useEffect(() => {
    // length of all tasks
    setLenTasks(tasksWithCheckbox.length);

    // Check if all task are checked
    setAnyElementIsChecked(tasksWithCheckbox.some(({ checked }) => checked));
    // check if all task have the same weight
    const firstTaskWeight = tasksWithCheckbox[0]?.task?.weight;
    setAreAllTaskTheSameWeight(
      tasksWithCheckbox.every(({ task }) => task.weight === firstTaskWeight)
    );
  }, [tasksWithCheckbox]);

  // Handle functions
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

      case "ArrowUp": {
        const currIdx = weightColors.findIndex(
          (data) => data.weight.toString() === weight
        );

        if (currIdx === -1) {
          onChange(String(weightColors[0].weight), "weight");
          return;
        }

        onChange(
          String(
            weightColors[currIdx + 1]?.weight ?? weightColors[currIdx]?.weight
          ),
          "weight"
        );
        return;
      }
      case "ArrowDown": {
        const currIdx = weightColors.findIndex(
          (data) => data.weight.toString() === weight
        );

        if (currIdx === -1) {
          onChange(String(weightColors[0].weight), "weight");
          return;
        }

        onChange(
          String(
            weightColors[currIdx - 1]?.weight ?? weightColors[currIdx]?.weight
          ),
          "weight"
        );
        return;
      }
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
    //@ts-ignore
    setDividedTaksSession({ ...dividedTasksSession, memberWithJobs: [] });
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

    tasksNormalized.length > 0
      ? //@ts-ignore
        setDividedTaksSession((c) => ({
          ...c,
          memberWithJobs: divideUpWork(team.members, tasksNormalized),
        }))
      : //@ts-ignore
        setDividedTaksSession((c) => ({ ...c, memberWithJobs: [] }));
  };

  return (
    <div className="pb-10">
      <h1 className="text-gray-900 dark:text-gray-200 w-full text-5xl font-serif text-center font-bold relative">
        Divide Up Work
        <button
          className=" fill-gray-700 dark:fill-gray-400 absolute"
          onClick={openInstructionModal}
        >
          <HelpIcon className="fill-inherit stroke-1" />
        </button>
      </h1>

      <InstructionModal
        isOpen={isInstructionModalOpen}
        openModal={openInstructionModal}
        closeModal={closeInstructionModal}
      />
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
          className="bg-CTA-400 text-gray-100  h-8 px-3 text-xl rounded-md disabled:opacity-75 hover:bg-CTA-500 disabled:hover:bg-CTA-400  "
          onClick={handleDividing}
          disabled={lenTasks === 0}
        >
          Divide up Work
        </button>
      </div>
      <section className="flex flex-wrap gap-3 justify-center my-2">
        {lenTasks !== 0 &&
          dividedTasksSession?.memberWithJobs.map((member, idx) => (
            <MemberWithJobsDisplay
              key={idx}
              {...member}
              color={team.color}
              allTasksHaveTheSameWeight={areAllTaskTheSameWeight}
            />
          ))}
      </section>
    </div>
  );
};
