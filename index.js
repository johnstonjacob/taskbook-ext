#!/usr/bin/env node
'use strict';
const taskbook = require('./lib/taskbook');

const taskbookCLI = (input, flags) => {
    if (flags.archive) {
        return taskbook.displayArchive();
    }

    if (flags.calendar) {
        if (!flags.task) {
            return taskbook.calendarNoTask();
        }
        taskbook.createTask(input);
        return taskbook.calendar(flags.calendar, input);
    }

    if (flags.task && !flags.calendar) {
        return taskbook.createTask(input);
    }

    if (flags.restore) {
        return taskbook.restoreItems(input);
    }

    if (flags.note) {
        return taskbook.createNote(input);
    }

    if (flags.delete) {
        return taskbook.deleteItems(input);
    }

    if (flags.check) {
        return taskbook.checkTasks(input);
    }

    if (flags.star) {
        return taskbook.starItems(input);
    }

    if (flags.priority) {
        return taskbook.updatePriority(input);
    }

    if (flags.copy) {
        return taskbook.copyToClipboard(input);
    }

    if (flags.timeline) {
        taskbook.displayByDate();
        return taskbook.displayStats();
    }

    if (flags.find) {
        return taskbook.findItems(input);
    }

    if (flags.list) {
        taskbook.listByAttributes(input);
        return taskbook.displayStats();
    }

    if (flags.edit) {
        return taskbook.editDescription(input);
    }

    if (flags.move) {
        return taskbook.moveBoards(input);
    }

    if (flags.clear) {
        return taskbook.clear();
    }

    taskbook.displayByBoard();
    return taskbook.displayStats();
};

module.exports = taskbookCLI;
