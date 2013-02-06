/**
 * Created with JetBrains PhpStorm.
 * Author: Kirill Cherkashin
 *
 */

"use strict";

var random = Ext.define( 'chords.view.random.randomCard', {
    extend:  'Ext.Panel',
    xtype:   'randomcard',
    require: ['Ext.carousel.Carousel'],
    config:  {
        layout: 'vbox',
        tab:    {
            title:   'Random song',
            iconCls: 'refresh'
        },
        items:  [
            {
                layout: "hbox",
                docked: 'top',
                xtype:  'toolbar',
                title:  'Random chords',
                items:  [
                    {xtype: "spacer" },
                    {xtype: "button", id: "transposeUp", text: 'Transpose up', align: 'right'},
                    {xtype: "button", id: "transposeDown", text: 'Transpose down', align: 'right'}
                ]
            },
            {
                flex:  1,
                id:    "randomCarousel",
                xtype: "carousel"
            }
        ]
    }





} );