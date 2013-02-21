/**
 * Created with JetBrains PhpStorm.
 * Author: Kirill Cherkashin
 *
 */

'use strict';

var random = Ext.define( 'chords.view.random.randomCard', {
    extend: 'Ext.Panel',
    xtype: 'randomcard',
    config: {
        tab: {
            id: 'randomCardTab',
            iconCls: 'shuffle',
            title: 'Random'
        }
    }





} );