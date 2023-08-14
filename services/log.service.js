import chalk from 'chalk';

const printError = (error) => {
   console.log(chalk.bgRed(' ERROR ') + ' ' + error);
};

const printSuccess = (message) => {
   console.log(chalk.bgGreen(' SUCCESS ') + ' ' + message);
};

const printHelp = () => {
   console.log(
      'HELP' +
         '\n' +
         'Без параметров - вывод погоды' +
         '\n' +
         '-s [CITY] для установки города' +
         '\n' +
         '-h help' +
         '\n' +
         '-t [API_KEY] для сохранения токена'
   );
};

const printWeather = (res, icon) => {
   console.log(`${chalk.bgMagenta(' Погода ')}
   Погода в городе - ${res.name}
   ${icon}  ${res.weather[0].description}
   Температура: ${res.main.temp} (ощущается как ${res.main.feels_like})
   `);
};

export { printError, printSuccess, printHelp, printWeather };
