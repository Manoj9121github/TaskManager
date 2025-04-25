"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";

const TaskPage = () => {
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

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
  });

  

  const toggleCompleted = (indexToToggle) => {
    const updatedTasks = tasks.map((task, index) => {
      if (index === indexToToggle) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleDelete = (indexToRemove) => {
    const updatedTasks = tasks.filter((_, index) => index !== indexToRemove);
    setTasks(updatedTasks);
  };

  const handleClearAll = () => {
    if (confirm("Are you sure you want to clear all tasks?")) {
      setTasks([]);
    }
  };

  return (
    <div className="xs:min-h-screen  xs:bg-gray-100 xs:dark:bg-gray-900 md:w-7xl mx-auto min-h-screen  bg-gray-100 dark:bg-gray-900">
      <h1 className="text-center text-2xl pt-1">QuickTask - Task Manager</h1>
      <nav className="p-8">
        <Link href={"/"}>
          <h1 className="text-3xl p-2">Tasks</h1>
        </Link>
        <div className="flex justify-between">
          <Dialog>
            <DialogTrigger className="text-black text-xl bg-amber-500 p-2 rounded">
              Add a Task
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Enter the Task</DialogTitle>
                <DialogDescription>
                  <Input
                    onChange={(e) => setNewTask(e.target.value)}
                    value={newTask}
                    placeholder="enter the task "
                    className="mr-4 w-75 mx-auto mt-2 text-center"
                  />
                  <Input
                    type="date"
                    onChange={(e) => setDueDate(e.target.value)}
                    value={dueDate}
                    className="w-75 mx-auto mt-2 text-center"
                  />
                  <div className="text-center mt-2">
                    <Button className="mx-auto" onClick={SubmitTask}>
                      Add
                    </Button>
                  </div>

                  <div className="text-center mt-4"></div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Button
            className="mb-4"
            onClick={() => {
              const root = window.document.documentElement;
              root.classList.toggle("dark");
              localStorage.setItem(
                "theme",
                root.classList.contains("dark") ? "dark" : "light"
              );
            }}
          >
            Theme
          </Button>
        </div>
      </nav>

      <div className="mx-auto flex justify-center">
        <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 transition-colors duration-300 p-4 ">
          <h1 className="text-center text-xl">Task Filters</h1>
          <div className="text-center mt-2">
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
                    <p className="font-medium w-36">{task.name}</p>
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

      <div className="flex justify-center  mt-4">
        <Button
          className="bg-white text-black hover:bg-black hover:text-white transition-colors duration-200 "
          onClick={handleClearAll}
        >
          <Trash2 />
          <span className="text-orange-600">Clear All</span>
        </Button>
      </div>
    </div>
  );
};

export default TaskPage;
