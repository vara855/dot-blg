---
title: Полезные дополнения к вашему терминалу.
description: В данной статье я расскажу вам какие полезные дополнения к вашему терминалу вы можете себе установить, чтобы повысить ежедневную продуктивность и улучшить опыт использования терминала.
date: 2022-07-12
tags:
  - 💻 Mac OS
  - Terminal
  - 🇷🇺 RU
layout: layouts/post.njk
---

В данной статье я расскажу вам какие полезные дополнения к вашему терминалу вы можете себе установить, чтобы повысить ежедневную продуктивность и улучшить опыт использования терминала.

## TLDR

Список всего, что установлено через Brew. `brew ls`

{% image "mac-os-terminal/brew-ls.png", "'brew ls' command output" %}

## Окружение

Моя рабочая и домашняя машинка - это *MacBook Pro (15-inch, 2018)*. Есть также рабочий ноутбук, выданный компанией, но он на Windows. Я уже давно переехал с Windows на Mac OS и возвращаться не хочется.

### Оболочка терминала `iTerm2`

{% image "mac-os-terminal/iterm-2.png", "iterm2 screenshot" %}

[iTerm2](https://iterm2.com/) не нуждается в представлении, просто лучший терминал для Mac OS.

### Prompt

[starship](https://starship.rs/) - the cross-shell prompt for astronauts. ☄🌌️

### 🐟 Fish Shell

По-умолчанию в Mac OS используется `zsh`, он всем прекрасен, но мне больше приглянулся [`fish  shell`](https://fishshell.com/). Он быстрый и максимально удобный. Очень подкупает его *autocomplete*. Не так давно появилась такая же функциональность и в `zsh`.

Не все пакеты *AS-IS* работают в `fish`. Некоторые могут работать только с `bash`, для работы с `bash` скриптами в `fish` используется [bass](https://github.com/edc/bass). Из-за этого многие популярные пакеты имеют свою реализацию для fish-shell, к примеру [`nvm` (FabioAntunes/fish-nvm)](https://github.com/FabioAntunes/fish-nvm).

#### Fisher

**Fisher** - установщик плагинов для вашего `fish`. Установка пакетов для `fish` мне пригодилась только при первоначальной настройке, поэтому выбрал самый простой и лаконичный менеджер пакетов. Пакетный менеджер в инфраструктуре может быть любым, можете посмотреть на другие альтернативы, такие как ... .

Список установленных пакетов:

```shell
❯ fisher ls
jorgebucaran/fisher # Сам fisher
edc/bass # Для запуска bash скриптов
FabioAntunes/fish-nvm # Node version manager для Fish
acomagu/fish-async-prompt # Асинхронный prompt
jethrokuan/z # `cd` на стероидах.
```

### 🍺 Brew

Для установки всех пакетов использовался [Brew](https://brew.sh/).

## Пакеты

### 🦇 [bat](https://github.com/sharkdp/bat)

> A cat(1) clone with syntax highlighting and Git integration.

<div class="img-center img-center__70">
  {% image "mac-os-terminal/bat-js-exmpl.png", "bat command output" %}
</div>

Использую `bat` также как и `cat`, быстро посмотреть какие-то файлы, полистать исходники. Подсветка синтаксиса работает отлично, к примеру подсветка в *Sublime Text* чаще уступает `bat`, показывая артефакты или не так красиво подсвечивая код.

Очень радует наличие гит интеграции, благодаря которой подсвечиваются также и изменения файлов на основе git.

<div class="img-center img-center__50">
  {% image "mac-os-terminal/bat-git-highlighting.png", "bat git integration" %}
</div>

### exa

[`exa`](https://github.com/ogham/exa) - это  улучшенная версия всем знакомой команды `ls`.

Главные отличия - это подсветка вывода и иконки у файлов. Вывод этой команды намного читабельней традиционного `ls`. Этот пакет полностью заменил для меня команду `ls`.

Для удобства, я сделал себе элиас на использование этой команды

```shell
alias ll="exa -l -g --icons"
```

Вот несколько примеров вывода этой команды:

<div class="img-center img-center__70">
  {% image "mac-os-terminal/exa-example.png", "exa command example" %}
</div>

### ncdu

Быстрый способ посмотреть сколько занимают директории и файлы по указанному пути. Можно с помощью клавиатуры ходить по директориям.

```shell
brew install ncdu
```

<div class="img-center img-center__70">
  {% image "mac-os-terminal/ncdu-output.png", "ncdu output" %}
</div>

### ctop

```shell
brew install ctop
```

> ctop - interactive container viewer

`top` команда для ваших контейнеров.

Как по мне, это самый удобный способ посмотреть список запущенных docker контейнеров. С помощью этого пакета можно:

* останавливать контейнеры;
* смотреть потребляемые ресурсы;
* интерактивно навигироваться по списку.

### fzf

```shell
brew install fzf
```

> a command-line fuzzy finder

Если вы ничего не можете найти в терминале, вам нужен этот пакет. Он позволяет быстро найти всё что угодно. Обычно он интегрирован в историю выполнения команд и при `^+R` можно быстро найти последнюю используемую команду.

### lnav

```shell
brew install lnav
```

> A curses-based log file viewer that indexes log messages by type and time to make it easier to navigate through files quickly.

Просто красивый и удобный пакет для просмотра логов. Достаточно указать путь к папке, где находятся логи и всё, можно просматривать сразу несколько файлов, удобно перемещаться между ними.

Очень часто ему удаётся подсветить лог файл, но бывают и фейлы, к примеру с логами *elasticsearch*.

<div class="img-center">
  {% image "mac-os-terminal/lnav-log-viewer.png", "lnav example" %}
</div>

### [z](https://github.com/rupa/z)

```shell
brew install z
```

[`z`](https://github.com/rupa/z) - это `cd` в который встроили поисковую систему. Если нужно перейти куда-то глубоко в файловой системе, где вы уже когда были, достаточно написать только название папки, куда вы хотите перейти. `z` - хранит все ваши перемещения в кеше, и пытается найти по вашему запросу необходимый путь. Пример использования:

<div class="img-center img-center__50">
  {% image "mac-os-terminal/z-cd-example.png", "z command usage example" %}
</div>

## npx команды

В npm есть огромное множество довольно полезных утилит не только для мира JS, но и в целом.

### npkill

[npm](https://www.npmjs.com/package/npkill)

```shell
npx npkill
```

Посмотреть все вложенные папки с *node_modules* и быстро их удалить. Позволяет случайно не ошибиться с командой `rm -rf node_modules` 😄.

<div class="img-center img-center__100">
  {% image "mac-os-terminal/npkill-demo.gif", "npkill command demo" %}
</div>
