"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";

const TaskMain = () => {
  const [newTask, setNewTask] = useState("");

  const [dueDate, setDueDate] = useState("");

  const [tasks, setTasks] = useState([]);

  const [filter, setFilter] = useState("all");

  const SubmitTask = () => {
    if (newTask.trim() === "") return;

    const UpdateTask = {
      name: newTask,
      date: dueDate,
      completed: false,
    };

    setTasks([...tasks, UpdateTask]);
    setNewTask("");
    setDueDate("");
  };

  const handleDelete = (indexToRemove) => {
    const updatedTasks = tasks.filter((_, index) => index !== indexToRemove);
    setTasks(updatedTasks);
  };

  const toggleCompleted = (indexToToggle) => {
    const updatedTasks = tasks.map((task, index) => {
      if (index === indexToToggle) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleClearAll = () => {
    if (confirm("Are you sure you want to clear all tasks?")) {
      setTasks([]);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
  });

  return (
    <div>
      <Card className="w-7xl mx-auto min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <Button className="w-xl mx-auto" variant="outline">
          Light / Dark Toggle{" "}
        </Button>
        <div className="  justify-around">
          <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 transition-colors duration-300 p-4 m-2 ">
            <h1 className="text-center text-2xl mb-4"> Add Task</h1>

            <div className="flex">
              <Input
                onChange={(e) => setNewTask(e.target.value)}
                value={newTask}
                placeholder="enter the task "
                className="mr-4"
              />
              <Input
                type="date"
                onChange={(e) => setDueDate(e.target.value)}
                value={dueDate}
              />
            </div>
            <div className="text-center mt-4">
              <Button onClick={SubmitTask}>Add</Button>
            </div>
          </div>
          <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 transition-colors duration-300 p-4">
            <h1 className="text-center">Task Filters</h1>
            <div>
              <Button className="mr-2 " onClick={() => setFilter("all")}>
                All
              </Button>
              <Button className="mr-2" onClick={() => setFilter("active")}>
                Active
              </Button>
              <Button className="mr-2" onClick={() => setFilter("completed")}>
                Completed
              </Button>
            </div>
            <div>
              <ul className="mt-4 space-y-2">
                {filteredTasks.map((task, index) => (
                  <li
                    key={index}
                    className={`flex justify-between items-center p-3 rounded-lg
        ${
          task.completed
            ? "bg-green-100 text-green-800"
            : "bg-orange-100 text-orange-800"
        }`}
                  >
                    <div>
                      <p className="font-medium">{task.name}</p>
                      <p className="text-sm">
                        {task.completed
                          ? "Completed"
                          : `Complete by: ${task.date}`}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleCompleted(index)}
                      />
                      <Trash2
                        className="cursor-pointer text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(index)}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className=" mx-auto  ">
          {/* <div className=" rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 transition-colors duration-300 p-8 ">
            <h1 className="text-3xl text-center">Task list</h1>
            <ul className="mt-4 space-y-4">
              {tasks.map((task, index) => (
                <li
                  key={index}
                  className={`flex justify-between items-center p-3 rounded-lg 
      ${task.completed ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}
                >
                  <input type="checkbox" className="mr-4" checked={task.completed} onChange={() => toggleCompleted(index)} />
                  <div>
                    <p className="text-lg font-medium">{task.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                    {task.completed ? "Successfully Completed " : `Complete by: ${task.date}`}
                    </p>
                  </div>
                  <Trash2 className="ml-4 cursor-pointer text-red-500 hover:text-red-700"  onClick={() => handleDelete(index)} />
                  
                </li>
              ))}
            </ul>
          </div> */}
        </div>

        <div className="">
          <div className="rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 transition-colors duration-300 p-6 w-full max-w-md">
            <div className="flex">
              <Button
                className="bg-white text-black hover:bg-black hover:text-white transition-colors duration-200"
                onClick={handleClearAll}
              >
                <Trash2 />
                <span className="text-orange-600">Clear All</span>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TaskMain;
