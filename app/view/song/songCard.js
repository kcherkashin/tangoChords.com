/**
 * Created with JetBrains PhpStorm.
 * Author: Kirill Cherkashin
 *
 */

"use strict";

Ext.define( 'chords.view.song.songCard', {
    extend:   'Ext.NavigationView',
    xtype:    'songcard',
    requires: [
        "Ext.field.Search",
        "Ext.dataview.List",
        "Ext.ux.touch.grid.List",
        "Ext.ux.touch.grid.feature.Feature",
        "Ext.ux.touch.grid.feature.Sorter"
    ],

    config: {

        tab:   {
            title:   'Songs',
            iconCls: 'home'
        },
        items: [
            {
                store:    "songs",
                xtype:    "touchgridpanel",
                columns:  [
                    {
                        header:    'Name',
                        dataIndex: 'name',
                        style:     'padding: 0 20px;',
                        width:     '40%'
                    },
                    {
                        header:    'Performer',
                        dataIndex: 'performer',
                        style:     'padding: 0 20px;',
                        width:     '40%'
                    },
                    {
                        header:    'Genre',
                        dataIndex: 'genre',
                        style:     'padding: 0 20px;',
                        width:     '20%'
                    }
                ],
                features: [
                    {
                        ftype:    'Ext.ux.touch.grid.feature.Sorter',
                        launchFn: 'initialize'
                    }
                ],
                title:    "Tango chords for guitar",
                items:    [
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
                itemTpl:  [
                    '{title}'
                ]
            }
        ]
    }



} );
