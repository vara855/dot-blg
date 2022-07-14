---
title: Полезные дополнения к вашему терминалу.
description: В данной статье я расскажу вам какие полезные дополнения к вашему терминалу вы можете себе установить, чтобы повысить ежедневную продуктиивность и улучшить опыт использования терминала.
date: 2022-07-12
tags:
  - 💻 Mac OS
  - Terminal
  - 🇷🇺 RU
layout: layouts/post.njk
---

В данной статье я расскажу вам какие полезные дополнения к вашему терминалу вы можете себе установить, чтобы повысить ежедневную продуктиивность и улучшить опыт использования терминала.

## TLDR;

Список всего, что установленно через Brew. `brew ls`

<img src="/img/mac-os-terminal/brew-ls.png" title="brew ls output" alt="brew ls output" aria-label="'brew ls' command output"/>

## Окружение

Моя рабочая и домашняя машинка - это *MacBook Pro (15-inch, 2018)*. Есть также рабочий ноутбук, выданный компанией, но он на Windows. Я уже давно переехал с Windows на Mac OS и возвращаться не хочется.

### Оболочка терминала `iTerm2`

<img src="/img/mac-os-terminal/iterm-2.png" title="iterm2 screenshot" alt="iterm2 screenshot" aria-label="iterm2 screenshot"/>

[iTerm2](https://iterm2.com/) не нуждается в представлении, просто лучший терминал для Mac OS.

### Prompt

[starship](starship) - the cross-shell prompt for astronauts. ☄🌌️

### 🐟 Fish Shell

Поумолчанию в Mac OS ииспользуется `zsh`, он всем прекрасен, но мне больше приглянулся `fish  shell`. Он быстрый и максимально удобный. Очень подкупает его _autocomplete_. Не так давно появилася такая же функциональность и в `zsh`.

Не все пакеты _AS-IS_ работают в `fish`. Некоторые могут работать только с `bash`, для работы с `bash` скриптами в `fish` используется [bass](TODO:addlink). Из-за этого многие популярные пакеты имеют свою реализацию для fish-shell, к примеру `nvm` (FabioAntunes/fish-nvm).

#### Fisher

**Fisher** - установщик плагинов для вашего `fish`. Установка пакетов для `fish` мне пригодилась только при первоначальной настройке, поэтому выбрал самый простой и лаконичный менеджер пакетов. Пакетный менеджер в инфраструктуре может быть любым, можете посмотреть на другие альтернативы, такие как ... .

Список установленных пакетов:
```sh
❯ fisher ls
jorgebucaran/fisher # Сам fisher
edc/bass # Для запуска bash скриптов
FabioAntunes/fish-nvm # Node version manager для Fish
acomagu/fish-async-prompt # Ассинхронный prompt
jethrokuan/z # `cd` на стероидах.
```

### 🍺 Brew

Для установки всех пакетов использовался `Brew`.

## Пакеты 

### 🦇 bat

> A cat(1) clone with syntax highlighting and Git integration.

<div class="img-center img-center__70">
  <img src="/img/mac-os-terminal/bat-js-exmpl.png" title="bat command output" alt="bat command output" aria-label="bat command output"/>
</div>

Использую `bat` также как и `cat`, быстро посмотреть какие-то файлы, полистать исходники. Подстветка синтаксиса работает отлично, к примеру подстветка в _Sublime Text_ чаще уступает `bat`, показывая артифакты или не так красиво подсвечивая код.

Очень радует наличие гит интеграции, благодаря которой подсвечиваются также и изменения файлов на основе git. 

<div class="img-center img-center__50">
  <img src="/img/mac-os-terminal/bat-git-highlighting.png" title="bat git integration" alt="bat git integration" aria-label="bat git integration"/>
</div>

### exa

`exa` - это  улучшенная версия всем знакомой команды `ls`.

Главные отличия - это подсветка вывода и иконки у файлов. Выввод этой команды намного читабельней традиционного `ls`. Этот пакет полностью заменил для меня комманду `ls`. 

Для удобства, я сделал себе элиас на использование этой команды

```sh
alias ll="exa -l -g --icons"
```

Вот несколько примеров вывода этой команды:

<div class="img-center img-center__70">
  <img src="/img/mac-os-terminal/exa-example.png" title="exa command example" alt="exa command example" aria-label="exa command example"/>
</div>

### ncdu 

Быстрый способ посмотреть сколько занимают дирректории и файлы по указанному пути. Можно с помощью клавиатуры ходить по дирректориям. 

<div class="img-center img-center__70">
  <img src="/img/mac-os-terminal/ncdu-output.png" title="ncdu output" alt="ncdu output" aria-label="ncdu output"/>
</div>

### ctop

> ctop - interactive container viewer

`top` команда для ваших контейнеров.

Как по мне, это самый удобный способ посмотреть список запущенных docker контейнеров. С помощью этого пакета можно:

* останавливать контейнеры;
* смотреть потребляемые рессурсы;
* интерактивно навигироваться по списку.

### fzf

> a command-line fuzzy finder

Если вы ничего не можете найти в терминале, вам нужен этот пакет. Он позволяет быстро найти всё что угодно. Обычно он интегрирован в историю выполнения комманд и при `^+R` можно быстро найти последнюю используемую команду.

### lnav

> A curses-based log file viewer that indexes log messages by type and time to make it easier to navigate through files quickly.

Просто красивый и удобный пакет для просмотра логов. Достаточно указать путь к папке, где находятся логи и всё, можно просматривать сразу несколько файлов, удобно перемещаться между ними.

Очень часто ему удаётся подсветить лог файл, но бывают и фейлы, к примеру с логами _elasticsearch_.

<div class="img-center">
  <img src="/img/mac-os-terminal/lnav-log-viewer.png" title="lnav example" alt="lnav example" aria-label="lnav example"/>
</div>

### z

`z` - это `cd` в который встроили поисковую систему. Если нужно перейти куда-то глубоко в файловой системе, где вы уже когда были, достаточно написать только название папки, куда вы хотите перейти. `z` - хранит все ваши перемещения в кеше, и пытается найти по вашему запросу необходимый путь. Пример использования:

<div class="img-center img-center__70">
  <img src="/img/mac-os-terminal/z-cd-example.png" title="z command usage example" alt="z command usage example" aria-label="z command usage example"/>
</div>