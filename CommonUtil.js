//1. dateformat : https://www.npmjs.com/package/dateformat
//2. propType: https://www.npmjs.com/package/prop-types
//3. lodash: https://www.npmjs.com/package/lodash

import dateFormat from 'dateformat';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _ from 'lodash';

class CommonUtil {
    
    constructor(){}

    //null�� undefined �׸��� '' üũ
    static isNull(object){
        if(object === null || typeof(object) === 'undefined' || String(object).trim() === ''){
            return true;
        } else {
            return false;
        }
    }
    //���� ��¥�� yyyy-mm-dd���·� ������
    static getToDay(){
        return dateFormat(new Date(), "yyyy-mm-dd");
    }
    //���� ��¥�� yyyy-mm-dd HH:MM:ss���·� ������
    static getToDayTime(){
        return dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
    }
    //��¥ ������ ������.
    static changeFormat(date, format){
        return dateFormat(new Date(date), format);
    }
    //�ð��� HH:MM -> HH��MM������ ������.
    static changeTimeToKor(date){
        const hour = date.split(":")[0];
        const minute = date.split(":")[1];
        return hour + '��' + minute + '��';
    }
    
    static isTooShort(password, minLength) {
        if (!minLength) {
          return true;
        }
        return password.length < minLength;
    }
    
    static isMatchingRules(password, ruleNames) {
        if (!ruleNames) {
          return true;
        }
        
        const rules = _.chain(ruleNames)
          .split('|')
          .filter(rule => !!rule)
          .map(rule => rule.trim())
          .value();
        
        for (const rule of rules) {
          if (!CommonUtil.isMatchingRule(password, rule)) {
            return false;
          }
        }
        return true;
    }
    
    static isMatchingRule(password, rule) {
        switch (rule) {
            case 'symbols':
                return regex.symbolsPattern.test(password);
            case 'words':
                return regex.wordsPattern.test(password);
            case 'digits':
                return regex.digitsPattern.test(password);
            case 'letters':
                return regex.lettersPattern.test(password);
            case 'lowerCase':
                return regex.lowerCasePattern.test(password);
            case 'upperCase':
                return regex.upperCasePattern.test(password);
            default:
                return true;
        }
    }
    �н����� �꿡 �´� ���������� Ȯ��
    static calculateScoreForPassword(text, minLength, rules) {
        if (!text) {
            return -1;
        }

        if (CommonUtil.isTooShort(text, minLength)) {
            return -1;
        }

        if (!CommonUtil.isMatchingRules(text, rules)) {
            return 0;
        }
        return 1;
    }

    //�ֹι�ȣ �������̼�
    static validate(front, rear){
        var arrNum1 = new Array(); // �ֹι�ȣ ���ڸ����� 6���� ���� �迭
        var arrNum2 = new Array(); // �ֹι�ȣ ���ڸ����� 7���� ���� �迭

        for (var i=0; i<front.length; i++) {
            arrNum1[i] = front.charAt(i);
        } 

        for (var i=0; i<rear.length; i++) {
            arrNum2[i] = rear.charAt(i);
        } 

        var tempSum=0;

        for (var i=0; i<front.length; i++) {
            tempSum += arrNum1[i] * (2+i);
        } 

        for (var i=0; i<rear.length-1; i++) {
            if(i>=2) {
                tempSum += arrNum2[i] * i;
            }
            else {
                tempSum += arrNum2[i] * (8+i);
            }
        } 

        if((11-(tempSum%11))%10!=arrNum2[6]) {
            return true;
        }else{
            return false;
        }

    }
}






const regex = {
    digitsPattern: /\d/,
    lettersPattern: /[a-zA-Z]/,
    lowerCasePattern: /[a-z]/,
    upperCasePattern: /[A-Z]/,
    wordsPattern: /\w/,
    symbolsPattern: /\W/
};

const passwordRule = {
    lowerCase: 'lowerCase',
    upperCase: 'upperCase',
    digits: 'digits',
    symbols: 'symbols'
};

CommonUtil.propTypes = {
    passwordRule: PropTypes.oneOf(Object.keys(passwordRule))
}

CommonUtil.passwordRule = passwordRule;

export default CommonUtil;
