# Twin_Pines
# Инструкции для запуска приложения в development режиме

1. (Один раз). <br>
   Вам понадобится новый терминал. <br>
   Установить приложение для контейнеризации [Docker](https://docs.docker.com/):

   - [Ubuntu](https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository) (выполнить 3 шага)
   - [Windows](https://docs.docker.com/docker-for-windows/install/)
   - [Mac](https://docs.docker.com/docker-for-mac/install/)

   и [Docker Compose](https://docs.docker.com/compose/install/) (выбрать нужную ОС).

1. (Каждый раз). <br>
   Для запуска приложения запустить скрипт:

   - `./start-dev.sh`
- Приложение будет доступно в браузере по адресу [http://localhost:3000](http://localhost:3000).

## Примечания

- Укажите свой локальный (внутренний) IP-адрес в файлах:
  - ./client/src/constants.js > serverIP = 'ВАШ IP-адрес'
  - ./vscode/settings.json > "server": "ВАШ IP-адрес"
- Пароль для уже созданных юзеров: '1Qwerty_'
