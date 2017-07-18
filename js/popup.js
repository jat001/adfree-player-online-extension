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
var count = 0;

function init() {
    extension = chrome.extension.getBackgroundPage();
    getModColor();
    getCompatibleMode();
    getCacheMode();
}

function getModColor(){
    if(extension.localflag){
        $("#Mode").css('color','#06a4f4');
        $("#onlineMode").css('display','none');
    }else{
        $("#Mode").css('color','#345');
        $("#localMode").css('display','none');
    }
}

function getCompatibleMode(){
    if(extension.compatible){
        $("#autoProxy").attr("checked",false);
    }else{
        $("#autoProxy").attr("checked",true);
    }
}

function getCacheMode(){
    if(extension.flushallow){
        $("#autoFlush").attr("checked",true);
    }else{
        $("#autoFlush").attr("checked",false);
    }
}

function closePopup() {
    window.close();
}

function openSupportWebsite() {
    closePopup();
    chrome.tabs.create({
        url:'http://bbs.kafan.cn/thread-1777920-1-1.html'
    });
}

function fetchNewRule() {
    if(++count){
        if(count > 0 && count != 9){
            $(".pts").text(count.toString());
            $(".pts").show();
        }else{
            count = 0;
            extension.recordlog("Force Update!");
            extension.recordlog(extension.decode64("aGFoYXRlc3Q="));
            extension.fetchAllRules();
            closePopup();
            $(".pts").hide();
        }
    }
    
}

function reinitRule() {
    extension.recordlog("reiniRules!");
    extension.initRules();
    closePopup();
}

function changeMode() {
    extension.recordlog("changeMode!");
    extension.switchMode();
    getModColor();
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

$(document).ready(function(){
    init();
    $("#getNewRule").click(fetchNewRule);
    $("#getinitRule").click(reinitRule);
    $("#getSupport").click(openSupportWebsite);
    //$("#Mode").click(changeMode);
    $("#CompatibleMode").click(changeCompatibleMode);
    $("#CacheMode").click(changeCacheMode);
});
