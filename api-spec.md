# Документация API для фронта

## Общие принципы
- Все запросы выполняются к REST API.
- Аутентификация через JWT (в заголовке Authorization: Bearer ...).
- Ответы в формате JSON.
- Для валидации данных на фронте рекомендуется использовать zod.
- Для работы с запросами — хуки на базе TanStack Query.

---

## 1. Аутентификация и авторизация

### POST /api/auth/register
- Регистрация пользователя (избиратель/представитель)
- Тело: { email, password, fullName, ... }
- Ответ: { user, token }

### POST /api/auth/login
- Вход пользователя
- Тело: { email, password }
- Ответ: { user, token }

### POST /api/auth/forgot-password
- Запрос на восстановление пароля
- Тело: { email }
- Ответ: { message }

### POST /api/auth/reset-password
- Сброс пароля
- Тело: { token, newPassword }
- Ответ: { message }

### GET /api/auth/me
- Получить текущего пользователя (по JWT)
- Ответ: { user }

---

## 2. Пользователи

### GET /api/users/:id
- Получить профиль пользователя
- Ответ: { user }

### PATCH /api/users/:id
- Обновить профиль пользователя
- Тело: { ...fields }
- Ответ: { user }

### POST /api/users/:id/avatar
- Загрузить аватар
- multipart/form-data
- Ответ: { avatarUrl }

---

## 3. Округа

### GET /api/districts
- Получить список округов
- Ответ: [{ ...district }]

### GET /api/districts/:id
- Получить детали округа
- Ответ: { ...district }

### POST /api/districts
- Создать округ (админ)
- Тело: { ... }
- Ответ: { ...district }

### PATCH /api/districts/:id
- Обновить округ (админ)
- Тело: { ... }
- Ответ: { ...district }

### DELETE /api/districts/:id
- Удалить округ (админ)
- Ответ: { message }

---

## 4. Задачи

### GET /api/tasks
- Получить список задач (фильтры: статус, округ, представитель, поиск)
- Ответ: [{ ...task }]

### GET /api/tasks/:id
- Получить детали задачи
- Ответ: { ...task }

### POST /api/tasks
- Создать задачу
- Тело: { ... }
- Ответ: { ...task }

### PATCH /api/tasks/:id
- Обновить задачу
- Тело: { ... }
- Ответ: { ...task }

### DELETE /api/tasks/:id
- Удалить задачу
- Ответ: { message }

---

## 5. Комментарии к задачам и постам

### GET /api/tasks/:id/comments
- Получить комментарии к задаче
- Ответ: [{ ...comment }]

### POST /api/tasks/:id/comments
- Добавить комментарий к задаче
- Тело: { text }
- Ответ: { ...comment }

### GET /api/posts/:id/comments
- Получить комментарии к посту
- Ответ: [{ ...comment }]

### POST /api/posts/:id/comments
- Добавить комментарий к посту
- Тело: { text }
- Ответ: { ...comment }

---

## 6. Блог/Посты

### GET /api/posts
- Получить список постов
- Ответ: [{ ...post }]

### GET /api/posts/:id
- Получить детали поста
- Ответ: { ...post }

### POST /api/posts
- Создать пост (представитель)
- Тело: { ... }
- Ответ: { ...post }

### PATCH /api/posts/:id
- Обновить пост
- Тело: { ... }
- Ответ: { ...post }

### DELETE /api/posts/:id
- Удалить пост
- Ответ: { message }

---

## 7. Сообщения (чат)

### GET /api/chats
- Получить список чатов пользователя
- Ответ: [{ ...chat }]

### GET /api/chats/:id/messages
- Получить сообщения в чате
- Ответ: [{ ...message }]

### POST /api/chats/:id/messages
- Отправить сообщение
- Тело: { text }
- Ответ: { ...message }

---

## 8. Подписки

### POST /api/subscriptions
- Подписаться на обновления (округ, представитель, задача)
- Тело: { type, targetId }
- Ответ: { ...subscription }

### DELETE /api/subscriptions/:id
- Отписаться
- Ответ: { message }

---

## 9. Уведомления

### GET /api/notifications
- Получить уведомления пользователя
- Ответ: [{ ...notification }]

---

## 10. Прочее

### GET /api/statistics
- Получить общую статистику (по округам, задачам, представителям)
- Ответ: { ... }

---

## Как фронт работает с API
- Для авторизации используется auth context (React Context API).
- Для запросов к API используются хуки на базе TanStack Query (useQuery, useMutation).
- Для валидации данных на фронте — zod.
- Все эндпоинты возвращают ошибки в формате { error: string } при неуспехе.
- Для отображения ошибок и успешных действий используются всплывающие уведомления (toast), например, через библиотеку sonner.

---

**P.S.** Это только структура и описание, без кода. Если нужно расписать подробнее — скажи, бро! 