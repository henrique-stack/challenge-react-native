import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {

    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }
    setTasks(oldTask => [...oldTask, data]);
  };

  function handleToggleTaskDone(id: number){
    // challow copy
    const updateTasks = tasks.map(task => ({ ...task }));

    const findUpdate = updateTasks.find(task => task.id === id);
    
    if(!findUpdate){
      return;
    }
    findUpdate.done = !findUpdate.done;
    setTasks(updateTasks);
  };

  function handleRemoveTask(id: number) {
   setTasks((oldState) => oldState.filter(task => task.id !== id));
  };

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