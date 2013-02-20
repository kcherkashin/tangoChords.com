/**
 * Created with JetBrains PhpStorm.
 * Author: Kirill Cherkashin
 *
 */

"use strict";

var random = Ext.define( 'chords.view.random.randomCard', {
    extend: 'Ext.Panel',
    xtype: 'randomcard',
    requires: ['Ext.carousel.Carousel'],
    config: {
        layout: 'vbox',
        tab: {
            id: 'randomCardTab',
            iconCls: 'shuffle',
            'title': 'Random'
        },
        items: [
            {
                layout: "hbox",
                docked: 'top',
                xtype: 'toolbar',
                title: '',
                items: [
                    {xtype: "spacer" },
                    { iconCls: 'arrow-up', id: "transposeUp", iconMask: true, align: 'right'} ,
                    { iconCls: 'arrow-down', id: "transposeDown", iconMask: true, align: 'right'}
                ]
            },
            {
                flex: 1,
                id: "randomCarousel",
                xtype: "carousel"
            }
        ]
    }





} );