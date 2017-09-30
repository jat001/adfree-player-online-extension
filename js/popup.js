/*
 * This file is part of ADfree Player Offline
 * <http://bbs.kafan.cn/thread-1514537-1-1.html>,
 * Copyright (C) yndoc xplsy 15536900
 * Some codes came from:
 * "Proxy SwitchySharp" (Shyc2001 http://twitter.com/shyc2001)
 * ADfree Player Offline is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License version 3 as
 * published by the Free Software Foundation.
 *
 * GNU General Public License, see <http://www.gnu.org/licenses/>.
 */

var extension = null;
var flag = 0;

function init() {
    extension = chrome.extension.getBackgroundPage();
    getCompatibleMode();
    getCacheMode();
}

function getCompatibleMode() {
    if (extension.compatible) {
        $("#autoProxy").attr("checked", false);
    } else {
        $("#autoProxy").attr("checked", true);
    }
}

function getCacheMode() {
    if (extension.flushallow) {
        $("#autoFlush").attr("checked", true);
    } else {
        $("#autoFlush").attr("checked", false);
    }
}

function closePopup() {
    window.close();
}

function openSupportWebsite() {
    chrome.tabs.create({
        url: chrome.extension.getURL('help.html'),
    });
    closePopup();
}

function fetchNewRule() {
    extension.recordlog("Force Update!");
    extension.recordlog(extension.decode64("aGFoYXRlc3Q="));
    extension.fetchAllRules();
    closePopup();
}

function reinitRule() {
    extension.recordlog("reiniRules!");
    extension.initRules();
    closePopup();
}

function changeCompatibleMode() {
    extension.recordlog("changeCompatibleMode!");
    extension.switchCompatibleMode();
    getCompatibleMode();
    closePopup();
}

function changeCacheMode() {
    extension.recordlog("changeCacheMode!");
    extension.switchCacheMode();
    getCacheMode();
    closePopup();
}

$(document).ready(function() {
    init();
    $("#getNewRule").click(fetchNewRule);
    $("#getinitRule").click(reinitRule);
    $("#getSupport").click(openSupportWebsite);
    $("#CompatibleMode").click(changeCompatibleMode);
    $("#CacheMode").click(changeCacheMode);
});
