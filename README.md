# Backend для Leafs Expert
Бэкенд приложение для разработки Leafs Expert

## Доступные запросы

### Растения
| Запрос          | Тип  | Описание                                        | Данные на вход  | Результат запроса                                                    |
| --------------- | :--: | :---------------------------------------------: | --------------- | -------------------------------------------------------------------- |
| **/plants**     | GET  | Получение всех растений                         |                 | [ {<br>id: number,<br>name_ru: string,<br>name_en: string<br>},... ] |
| **/plants/:id** | GET  | Получение растения по id                        | id: number      | {<br>id: number,<br>name_ru: string,<br>name_en: string<br>}         |
| **/plants**     | POST | Добавление растения, возвращает id новой записи | name_ru: string | number                                                               |

### Болезни растений
| Запрос             | Тип  | Описание                                       | Данные на вход  | Результат запроса                                                    |
| ------------------ | :--: | :--------------------------------------------: | --------------- | -------------------------------------------------------------------- |
| **/diseases**      | GET  | Получение всех болезней                        |                 | [ {<br>id: number,<br>name_ru: string,<br>name_en: string<br>},... ] |
| **/diseases/:id**  | GET  | Получение болезни по id                        | id: number      | {<br>id: number,<br>name_ru: string,<br>name_en: string<br>}         |
| **/diseases**      | POST | Добавление болезни, возвращает id новой записи | name_ru: string | number                                                               |

### Органы растения
| Запрос               | Тип  | Описание                                               | Данные на вход  | Результат запроса                                            |
| -------------------- | :--: | :----------------------------------------------------: | --------------- | ------------------------------------------------------------ |
| **/plant-parts**     | GET  | Получение всех органов растения                        |                 | {<br>id: number,<br>name_ru: string,<br>name_en: string<br>} |
| **/plant-parts/:id** | GET  | Получение органа растения по id                        | id: number      | {<br>id: number,<br>name_ru: string,<br>name_en: string<br>} |
| **/plant-parts**     | POST | Добавление органа растения, возвращает id новой записи | name_ru: string | number                                                       |

### Сканы
| Запрос         | Тип  | Описание                                     | Данные на вход      | Результат запроса     |
| -------------- | :--: | :------------------------------------------: | ------------------- | --------------------- |
| **/scans**     | GET  | Получение всех сканов | | [ {<br>id: number,<br>image_name: string,<br>upload_date: string,<br>plant_id: number,<br>plant_name_ru: string,<br>plant_name_en: string,<br>disease_id: number,<br>disease_name_ru: string,<br>disease_name_en: string,<br>plant_part_id: number,<br>plant_part_name_ru: string,<br>plant_part_name_en: string,<br>},... ] |
| **/scans/:id** | GET  | Получение скана по id                        | id: number | {<br>id: number,<br>image_name: string,<br>upload_date: string,<br>plant_id: number,<br>plant_name_ru: string,<br>plant_name_en: string,<br>disease_id: number,<br>disease_name_ru: string,<br>disease_name_en: string,<br>plant_part_id: number,<br>plant_part_name_ru: string,<br>plant_part_name_en: string,<br>} |
| **/scans**     | POST | Добавление скана, возвращает id новой записи | {<br>image: {<br>name: string,<br>type: string,<br>uri: string<br>},<br>plantData: {<br>plantId: number,<br>diseaseId: number,<br>planpartId: number<br>}<br>} | number |

### Валидации
| Запрос               | Тип  | Условие для ошибки                              | Ошибка                            | Статус |
| -------------------- | ---- | :--------------------------------------------:  | ----------------------------------| ------ |
| **/plants/:id**      | GET  | Если Id не число                                | Некорректный id                   | 400    |
| **/plant-parts/:id** | GET  | Если Id не число                                | Некорректный id                   | 400    |
| **/diseases/:id**    | GET  | Если Id не число                                | Некорректный id                   | 400    |  
| **/scans/:id**       | GET  | Если Id не число                                | Некорректный id                   | 400    |   
| **/plant-parts**     | POST | Если nameRu не на русском                       | Необходимо название на русском    | 400    |
| **/diseases**        | POST | Если nameRu не на русском                       | Необходимо название на русском    | 400    |
| **/plants**          | POST | Если nameRu не на русском                       | Необходимо название на русском    | 400    |
| **/scans**           | POST | Если plantId не число                           | Некорректный id растения          | 400    |
| **/scans**           | POST | Если diseaseId не число                         | Некорректный id болезни           | 400    |
| **/scans**           | POST | Если plantpartId не число                       | Некорректный id органа растения   | 400    |
| **/scans**           | POST | Если файл отсутствует(req.file==undefined) или формат файла не .png, .jpg или .jpeg | Необходимо загрузить файл или файл не является картинкой|400|
| *                    | *    | Ошибка на сервере                               | Текст ошибки                      | 500    |

## Работа с проектом
1. `npm i`: Установка зависимостей проекта;
2. `npm run start`: Запуск dev сервера на http://localhost:8000/;
4. `npm run lint` / `npm run lint:fix`: Запуск линтера для JS.

## Правила работы с git
Имена веток должны выглядеть так:<br>
`feature/<author name>/<short description>`<br>
или<br>
`feature/<author name>/<issue number>-<short description>`

Примеры:<br>
`feature/i.klochkovskiy/scan_model`,<br>
`feature/i.klochkovskiy/1-git_hooks`
