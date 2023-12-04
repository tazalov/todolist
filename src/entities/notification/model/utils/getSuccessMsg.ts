export const getSuccessMsg = (msg: string, lang: 'en' | 'ru'): string => {
  switch (true) {
    case msg.includes('createTodolist'): {
      return lang === 'en' ? `Todolist created!` : `Список дел создан!`
    }
    case msg.includes('deleteTodolist'): {
      return lang === 'en' ? 'Todolist deleted!' : `Список дел удален!`
    }
    case msg.includes('updateTitleTodolist'): {
      return lang === 'en' ? 'Title updated!' : `Имя списка обновлено!`
    }
    case msg.includes('updateTask'): {
      return lang === 'en' ? 'Task updated!' : `Задача обновлена!`
    }
    case msg.includes('deleteTask'): {
      return lang === 'en' ? 'Task deleted!' : `Задача удалена!`
    }
    case msg.includes('createTask'): {
      return lang === 'en' ? `Task created!` : `Задача создана!`
    }
    default: {
      return 'Message for success action dont created'
    }
  }
}
