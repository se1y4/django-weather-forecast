## Weather Forecast Web Application
# Простое веб-приложение для просмотра прогноза погоды в любом городе.

# Функционал
✅ Пользователь вводит название города и получает прогноз погоды.
✅ Удобный и читаемый вывод данных.
✅ Автодополнение (подсказки) при вводе города.
✅ При повторном посещении предлагается посмотреть погоду в последнем запрошенном городе.

Технологии
Backend: Django (Python)

Frontend: HTML, CSS, JavaScript

API для погоды: Open-Meteo

Хранение данных: SQLite (для истории запросов)

Докеризация: Docker + Docker Compose

Запуск приложения
Убедитесь, что у вас установлены Docker и Docker Compose.

Клонируйте репозиторий:

```bash
git clone https://github.com/se1y4/django-weather-forecast.git  
cd django-weather-forecast  
```
Запустите контейнер:
```bash
docker-compose up --build  
Приложение будет доступно по адресу: http://localhost:8080
```
