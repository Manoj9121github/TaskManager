"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Funnel, Trash2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Task = {
  id: number;
  name: string;
  completed: boolean;
  date: string;
};

const TaskTable = () => {
  const [newTask, setNewTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "completed" | "active" | "delayed">("all");

  // Load from localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Submit new task
  const SubmitTask = () => {
    if (newTask.trim() === "") return;
    const newEntry: Task = {
      id: Date.now(),
      name: newTask,
      date: dueDate,
      completed: false,
    };
    setTasks([...tasks, newEntry]);
    setNewTask("");
    setDueDate("");
  };

  // Mark task as complete/incomplete
  const HandleComplete = (taskId: number) => {
    const updated = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updated);
  };

  // Delete task
  const handleDelete = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    switch (filter) {
      case "completed":
        return task.completed;
      case "active":
        return !task.completed;
      case "delayed":
        return !task.completed && new Date(task.date) < new Date();
      case "all":
      default:
        return true;
    }
  });

  return (
    <div className="w-7xl mx-auto min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-center">QuickTask - Task Manager</h1>
          <Button
            className="mb-4"
            onClick={() => {
              const root = document.documentElement;
              root.classList.toggle("dark");
              localStorage.setItem("theme", root.classList.contains("dark") ? "dark" : "light");
            }}
          >
            Theme
          </Button>
        </div>

        <div className="max-w-6xl bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Task List</h2>

          <nav>
            <div className="flex items-center space-x-2">
              <Input className="w-64" placeholder="Search..." />
              <Dialog>
                <DialogTrigger className="text-black text-xl bg-green-500 p-2 rounded">
                  Add a Task
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Enter the Task</DialogTitle>
                    <DialogDescription>
                      <Input
                        onChange={(e) => setNewTask(e.target.value)}
                        value={newTask}
                        placeholder="Enter the task"
                        className="w-full mt-2 text-center"
                      />
                      <Input
                        type="date"
                        onChange={(e) => setDueDate(e.target.value)}
                        value={dueDate}
                        className="w-full mt-2 text-center"
                      />
                      <div className="text-center mt-4">
                        <Button onClick={SubmitTask}>Add</Button>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Funnel />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel className="text-center">Filter</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setFilter("all")}>
                    <Checkbox checked={filter === "all"} /> All
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter("completed")}>
                    <Checkbox checked={filter === "completed"} /> Completed
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter("active")}>
                    <Checkbox checked={filter === "active"} /> Active
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter("delayed")}>
                    <Checkbox checked={filter === "delayed"} /> Delayed
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </nav>

          <div className="overflow-x-auto py-6 px-4">
            <table className="min-w-full table-auto border-collapse border border-gray-400">
              <thead>
                <tr className="bg-gray-400 text-left">
                  <th className="px-4 py-2 border-b">Sno.</th>
                  <th className="px-4 py-2 border-b">Task Name</th>
                  <th className="px-4 py-2 border-b">Completed</th>
                  <th className="px-4 py-2 border-b">Due Date</th>
                  <th className="px-4 py-2 border-b">Delete</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map((task, index) => (
                  <tr
                    key={task.id}
                    className={`text-lg m-2 ${
                      task.completed ? "text-green-500" : "text-orange-600"
                    }`}
                  >
                    <td className="px-4 py-2 border-b bg-sky-200">{index + 1}</td>
                    <td className="px-4 py-2 border-b bg-amber-100">{task.name}</td>
                    <td className="px-4 py-2 border-b">
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={() => HandleComplete(task.id)}
                        className="ml-4"
                      />
                    </td>
                    <td className="px-4 py-2 border-b">{task.date}</td>
                    <td className="px-4 py-2 border-b">
                      <Trash2
                        onClick={() => handleDelete(task.id)}
                        className="cursor-pointer"
                        color="red"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredTasks.length === 0 && (
              <p className="text-center text-gray-500 mt-4">No tasks found for this filter.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskTable;
