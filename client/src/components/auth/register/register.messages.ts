const MessagesRegister = {
    errors: {
      required: "Обязательное поле",
      correctFormat: (name: string) => `${name} должно быть указано в корректном формате`,
      email: "Некорректный email"
    },
    const: {
      regex: "^(([А-ЯЁ][а-яё]{1,40})([А-ЯЁ][а-яё]{1,40})?)$",
    },
    placeholders: {
        name: "text",
      },
};
export default MessagesRegister;
