export const services = [
  {
    id: 1,
    name: "Ноктевой сервис",
    description: "Профессиональный маникюр для красоты ваших рук.",
    image:
      "https://i.pinimg.com/736x/bd/85/8d/bd858dd022adb52157a9088e53c7d9ae.jpg",
  },
  {
    id: 2,
    name: "Парикмахерский зал",
    description: "Стильная стрижка от наших мастеров.",
    image:
      "https://www.s-graffito.ru/upload/iblock/b67/b67af6a06f48cecc29ce46f38ca68f2d.jpg", // Путь к изображению в папке public
  },
  {
    id: 3,
    name: "Косметология",
    description: "Сделайте коррекцию бровей у наших опытных мастеров",
    image: "/img/kosmet.png",
  },
  {
    id: 4,
    name: "Массаж",
    description: "Расслабляющий массаж для полного восстановления.",
    image:
      "https://avatars.mds.yandex.net/get-altay/7779554/2a000001853177688b2b04294439a5ff1043/orig", // Замените URL на уникальный
  },
];

// export const recordingMethod = {
//   way: "Узконаправленный подход. Учим только фронтенду, поэтому вы получаете именно те знания, за которыми пришли.",
//   easy: "Доступность обучения. Простыми словами объясняем сложные темы на понятных примерах.",
//   program:
//     "Концентрация знаний. Например, модуль «HTML&CSS» даст вам столько же умений и навыков, как и 6 месяцев обучения по этой программе в госуниверситете.",
// };
export const masters = [
  { id: 1, name: "Мария", specialty: "Маникюр" },
  { id: 2, name: "Лиона", specialty: "Маникюр" },
  { id: 3, name: "Клара", specialty: "Маникюр" },

  { id: 4, name: "Ксения", specialty: "Парикмахер" },
  { id: 5, name: "Лидия", specialty: "Парикмахер" },
  { id: 6, name: "Виктория", specialty: "Парикмахер" },

  { id: 7, name: "Ирина", specialty: "Косметолог" },
  { id: 8, name: "Оля", specialty: "Косметолог" },
  { id: 9, name: "Аймира", specialty: "Косметолог" },

  { id: 10, name: "Лана", specialty: "Массажист" },
  { id: 11, name: "Оксана", specialty: "Массажист" },
];

export const servicesMaster = [
  { id: masters.id, name: "Мария Иванова", specialty: "Маникюр" },
  { id: masters.id, name: "Анна Петрова", specialty: "Парикмахер" },
  { id: masters.id, name: "Ирина Сидорова", specialty: "Косметолог" },
];
