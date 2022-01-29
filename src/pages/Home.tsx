import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTask: Task = {
      id: new Date().getTime(),
      done: false,
      title: newTaskTitle
    }

    setTasks(oldState => [...oldState, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const taskExists = tasks.find(task => task.id === id);
    
    if (!!taskExists) {
      const newTask: Task = {
        id: taskExists.id,
        title: taskExists.title,
        done: true
      }

      const tasksList = [...tasks];
      tasksList.splice(tasksList.indexOf(taskExists), 1, newTask);

      setTasks(tasksList);
    }
  }

  function handleRemoveTask(id: number) {
    const taskExists = tasks.find(task => task.id === id);
    
    if (!!taskExists) {
      const tasksList = [...tasks];
      tasksList.splice(tasksList.indexOf(taskExists), 1)

      setTasks(tasksList);
    }
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})