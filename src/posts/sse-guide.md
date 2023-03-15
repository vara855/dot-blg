---
title: Server Sent Events для фронтенд разработчиков
description: Что такое EventSource и как использовать SSE на клиенте правильно. Как проставить хэдеры в EventSource. Authorization in EventSource. Best practice for SSE. Server-sent events guide.
date: 2023-02-12
tags:
  - network
  - frontend
  - js
  - http
  - 🇷🇺 RU
layout: layouts/post.njk
---

> В данной статье я не буду углубляться в терминологию и архитектуру. Эта статья просто рассказывает рецепты использование SSE на клиенте.

## TLDR

* Не стоит использовать никакие полифилы `EventSource` из этой статьи и в целом для `SSE`. Только если вдруг вам нужно поддерживать [IE](https://www.youtube.com/watch?v=9Deg7VrpHbM).
* Авторизацию можно сделать на куках с параметром `withCredentials` при создании соединения.
* Используем встроенный в браузер `EventSource`. Если же нужно больше контроля или функционала (отслеживание событий, парсинг, хедеры) - можно написать свою реализацию поверх `fetch` streaming, или же просто использовать [@microsoft/fetch-event-source](https://www.npmjs.com/package/@microsoft/fetch-event-source) реализацию.

## Что такое SSE?

[Server-sent events (SSE)](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events) - это технология, которая позволяет нам получать данные из бекенда по-ивентно (by-event). После установления HTTP соединения, мы можем подписаться на событие получения сообщения из бекенда, а также на событие `error`. По сути, для пользователя этой технологии - это `WebSocket`, в который нельзя отправить сообщения серверу.

[EventSource](https://developer.mozilla.org/en-US/docs/Web/API/EventSource) - Web интерфейс для использования server-sent events.

### Где его использовать?

Для себя я сформулировал так:

> Если мне нужна одно-направленная связь с бэкендом - `EventSource` мой выбор. Во всех остальных случаях - `WebSocket` или просто `HTTP`. (Ну если прям очень нужно - можно и `grpc`...);

### Особенности и странности браузерной реализации

* Если соединение закрывается на стороне сервера - то клиент получит событие `error`, из которого никак нельзя будет понять, что это нормальное закрытие соединения.
* Нельзя ничего передать дополнительно к `URL`, кроме как флага `withCredentials`.

### Поддержка браузерами

[Везде, кроме IE](https://caniuse.com/?search=server-sent%20events).

{% image "sse-guide/caniuse.png", "caniuse screenshot" %}

## Как пользоваться?

Я создал небольшой репозиторий, в котором есть различные примеры использования SSE на сервере и на клиенте.

{% unfurl "https://github.com/vara855/guide-sse-blg" %}

```shell
git clone git@github.com:vara855/guide-sse-blg.git
```

### Пример [реализации](https://github.com/vara855/guide-sse-blg/blob/master/nodejs-sse-example/index.js) SSE route

```js
function createSseEvent(data) {
  return `data: ${data}\n\n`;
}
async function onDigits(req, res) {
  console.log(`open -> ${req.url}`);
  res.writeHead(200, {
    "Content-Type": "text/event-stream; charset=utf-8",
    "Cache-Control": "no-cache",
  });

  let i = 0;

  for await (const startTime of setInterval(1000, Date.now())) {
    const now = Date.now();
    i++;
    const message = `Event #${i} time: ${new Date().toLocaleTimeString()}`;
    res.write(createSseEvent(message));
    console.log(`Produced message: "${message}"`);
    if (now - startTime > 10000) {
      res.write(
        "event: finish\ndata: All of the events were sent. Closing connection.\n\n"
      );
      console.log(`close response ${req.url}`);
      res.end();
      break;
    }
  }
}
```

Как можно заметить, протокол SSE - текстовый. Каждое сообщение - это строка, которая должна содержать данные (`data`) и должна заканчиваться на `\n\n`. Спецификацию можно почитать [здесь](https://html.spec.whatwg.org/multipage/server-sent-events.html#server-sent-events).

Также в сообщении может присутствовать идентификатор `id` и название события `event`.

То есть сообщения могут выглядеть как:

```shell
# one event
event: name-of-event
data: event-data

# another one
data: event-data-2
id: event-id
```

Обязательным также является хедер с типом контента `text/event-stream`.

#### Обработка на клиенте

Воспользоваться этим эндпоинтом на клиенте максимально просто, нужно только лишь создать экземпляр `EventSource` и навесить обработчики событий.

```js
const client = new EventSource("/be/digits", { withCredentials: true });

client.on('message', (event) => {
  console.log('Data received', event.data);
})
client.on('close', () => { /* ... */ });
client.on('open', () => { /* ... */});

client.addEventListener('eventType', evt => { /* ... */ });
```

Больше ничего браузерный `EventSource` не позволяет делать.

Небольшая демка бекенда и фронтенда в этом [репозитории](/posts/sse-guide/#Kak-polzovatsya). Для запуска следуте выполнить этот скрипт:

```shell
npm run vanilla-demo
```

## Проблема EventSource интерфейса

Он не конфигурабельный от слова совсем. Из-за этого многие люди не используют его, и вы можете найти много вопросов на StackOverFlow об этом простом интерфейсе ([#1](https://stackoverflow.com/questions/28176933/http-authorization-header-in-eventsource-server-sent-events), [#2](https://stackoverflow.com/questions/6623232/eventsource-and-basic-http-authentication), ...).

Вместо встроенного в браузеры интерфейса, многие разработчики приходят к использованию полифилов, которые позволяют модифицировать хедеры, или же менять другие настройки подключения.

Самые популярные полифилы:

* [npm:eventsource](https://www.npmjs.com/package/eventsource)
* [npm:event-source-polyfill](https://www.npmjs.com/package/event-source-polyfill)

**Настоятельно рекомендую обходить все эти полифилы стороной.**
У последней можно обнаружить *"интересную"* надпись в ридми.

Они довольно популярны, и это грустно 😟. Потому что, качество кода в них крайне низкое, а также если вы попробуете ими воспользоваться, вы наткнётесь на различия в работе с *"нативным"* `EventSource`.

Демонстрацию различий можно увидеть запустив скрипт

```shell
npm run vanilla-polyfill-demo
```

## `Fetch` реализация `SSE`

{% unfurl "https://www.npmjs.com/package/@microsoft/fetch-event-source" %}

## Решаем проблему Auth хедеров

### Первый Способ

Используем [аутентификацию по кукам](https://swagger.io/docs/specification/authentication/cookie-authentication/), по которой бэкенд сможет определить, что мы авторизованный пользователь.

Конечно, сейчас чаще всего используется `OAuth` и скорее всего у вас просто к каждому запросу на бекенд идёт `Bearer` хэдер с токеном из сессии, так что это не особо подходящий вариант для всех.

### Второй способ

Так как SSE работает поверх HTTP в отличии от WebSockets, мы можем реализовать SSE с помощью `fetch`. Уточню, что не нужно реализовывать `EventSource` полифил, нужно лишь реализовать своеобразный [`fetch streaming API`](https://developer.chrome.com/articles/fetch-streaming-requests/).

Если вы попробуете сделать это сами, то вы наткнётесь на некоторые проблемы с обрывками сообщений, вам нужно будет самим буферизировать и склеивать последовательности сообщений. В замен своей реализации стоит посмотреть в сторону этого npm пакета [@microsoft/fetch-event-source](https://www.npmjs.com/package/@microsoft/fetch-event-source), ну или вдохновиться им.

**👍 Какие плюсы?**

* Поддерживается Page Visibility API;
* Кастомизация всего, что можно кастомизировать в `fetch`.

**👎 Минусы:**

* При просмотре таких запросов в DevTools (chrome, firefox и может в других тоже), вы не увидите красивую табличку сообщений, как если бы это был нативный `EventSource`. Но это можно решить просто логированием, или любым другим угодным вам способом - [Issue #3](https://github.com/Azure/fetch-event-source/issues/3)
* Не нативно - да, мир JS наполнен сотнями реализаций одного и того же, все они работают по разному и хочется хороших, встроенных в Web стандарты интерфейсов, но, некоторые части Web развиваются очень медленно и иногда [не меняются годами](https://github.com/whatwg/html/issues/2177).

## Проблема HTTP метода

`EventSource` работает по HTTP с методом `GET`. Как мы знаем, `GET` в браузере - [не позволяет передавать `body` запроса](https://xhr.spec.whatwg.org/#the-send()-method). И если вам очень нужно использовать `EventSource` с методом `POST` и каким-то `body` - вы можете также использовать [@microsoft/fetch-event-source](https://www.npmjs.com/package/@microsoft/fetch-event-source).

**Но**, моё *имхо*, что это просто напросто не правильно даже семантически.

Я бы вам предложил всё таки создать отдельным HTTP `POST/PUT/...` запросом какой либо ресурс (он может быть временным, и храниться только в памяти бэкенда или в каком-то redis...), а затем уже, использовать идентификатор этого ресурса при создании `SSE` соединения.
