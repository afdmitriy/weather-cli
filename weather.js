#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { getWeather, getIcon } from './services/api.service.js';
import {
   printError,
   printSuccess,
   printHelp,
   printWeather,
} from './services/log.service.js';
import { saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';

const saveToken = async (token) => {
   if (!token.length) {
      printError('Не передан токен');
      return;
   }
   try {
      await saveKeyValue(TOKEN_DICTIONARY.token, token);
      printSuccess('Токен сохранен');
   } catch (error) {
      printError(error.message);
   }
};

const saveCity = async (city) => {
   if (!city.length) {
      printError('Не передано название города');
      return;
   }
   try {
      await saveKeyValue(TOKEN_DICTIONARY.city, city);
      printSuccess('Город сохранен');
   } catch (error) {
      printError(error.message);
   }
};

const getForecast = async () => {
   try {
      const weather = await getWeather(TOKEN_DICTIONARY.city);
      printWeather(weather, getIcon(weather.weather[0].icon));
   } catch (error) {
      if (error?.response?.status == 404) {
         printError('Неверно указан город');
      } else if (error?.response?.status == 404) {
         printError('Неверно указан токен');
      } else {
         printError(error.message);
      }
   }
};

const initCLI = () => {
   const args = getArgs(process.argv);
   if (args.h) {
      return printHelp();
   }
   if (args.s) {
      // Сохранить город
      return saveCity(args.s);
   }
   if (args.t) {
      // Сохранить токен
      return saveToken(args.t);
   }
   // Вывести погоду
   return getForecast();
};

initCLI();
