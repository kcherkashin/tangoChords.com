/**
 * Created with JetBrains PhpStorm.
 * Author: Kirill Cherkashin
 *
 */

"use strict";

Ext.define( 'chords.view.song.songCard', {
    extend:   'Ext.NavigationView',
    xtype:    'songcard',
    requires: ["Ext.field.Search", "Ext.dataview.List"],

    config: {

        tab: {
            title:   'Songs',
            iconCls: 'home'
        },


        items: [
            {
                store:   "songs",
                xtype:   "list",
                items:   [
                    {
                        xtype: 'listitemheader',
                        cls:   'dark',
                        html:  'Tango songs'
                    },
                    {
                        docked: 'top',
                        xtype:  'searchfield',
                        label:  'Filter',
                        name:   'query'
                    }

                ],
                itemTpl: [
                    '{performer} - {name}'
                ]
            }
        ]



    }



} );
