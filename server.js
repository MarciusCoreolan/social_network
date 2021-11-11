const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults({
  static: "./build"
});

const users = router.db.get("users");
const dialogs = router.db.get("dialogs");
const messages = router.db.get("messages");

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use((req, res, next) => { //авторизация ===========================================================
  const login = req.body.login;
  const password = req.body.password;

  if (req.method === "POST" && req.url === "/auth") { //делаем ПОСТ запрос на несуществующий адресс
    const authUser = users
      .toJSON()
      .find((user) => user.login === login && user.password === password);//делаем проверку логина и пароля, если такой пользователь есть возвращаем

    if (authUser === undefined) { //если после проверки пользователь не нашелся возвращаем ошибку
      res.status(404).json({error: "Неверный логин или пароль"});
    }
    res.json({ ...authUser, password: null }); // возвращаем пользователя и затираем пароль
  }
  next();
});

server.use((req, res, next) => { //получение сообщений определенного диалога ==============================
  const userName = req.body.userName;
  const opponentName = req.body.opponentName;

  if (req.method === "POST" && req.url === "/dialog") {
    const userMessages = messages.toJSON().filter( // ниже проводим проверку что бы получить нужные нам сообщения с сервера
      (item) =>
        // если айди авторизованного пользователя совпадает с authorId(с сервера) И opponentId(с сервера) совпадает на того чей диалог произошел клик
        (item.userName === userName && item.opponentName === opponentName) ||
        // ИЛИ authorId(с сервера) сообщения совпадает с опонентом И opponentId(с сервера) совпадает с айди авторизованным пользователем
        (item.userName === opponentName && item.opponentName === userName)
    );
    res.json(userMessages);
  }
  next();
});

server.use((req, res, next) => { //получение диалогов определенного пользователя ==============================
  const userId = req.body.userId;

  if (req.method === "PUT" && req.url === "/dialogs") {
    const userDialogs = dialogs.toJSON().filter(item => item.userId === userId)
    res.json(userDialogs);
  }
  next();
});

server.use((req, res, next) =>{ //Регистрация новго пользователя
  const userName = req.body.userName;
  const userLogin = req.body.login;

  if (req.method === 'POST' && req.url === '/users'){
    const checkUsers = users.toJSON().filter(item => item.userName === userName || item.login === userLogin)

    if (checkUsers.length === 0) {
      let text = '';
      const possible =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (let i = 0; i < 50; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length)); //создаем рандомный токен

      const ava = "https://yt3.ggpht.com/ytc/AAUvwniqvjXAhxhnHxoO4F82hlTiQouz5b76_yPllUeayw=s900-c-k-c0x00ffffff-no-rj"

      req.body.token = text //добавление токена из 50 рандомных символов
      req.body.avatar = ava //добавление дефолтной аватарки
      req.body.moderate = false // добавление прав модерации}
    } else {
      res.status(404).json({error: "Ошибка такой пользователь уже существует"});
    }
  }
  next()
})

server.use(router);
server.listen(process.env.PORT || 3001, () => {
  console.log("JSON Server is running");
});
