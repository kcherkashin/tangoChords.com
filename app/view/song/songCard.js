/**
 * Created with JetBrains PhpStorm.
 * Author: Kirill Cherkashin
 *
 */

"use strict";

Ext.define( 'chords.view.song.songCard', {
    extend: 'Ext.NavigationView',
    xtype: 'songcard',


    requires: [
        "Ext.field.Search",
        "Ext.dataview.List",
        "Ext.ux.touch.grid.List",
        "Ext.ux.touch.grid.feature.Feature",
        "Ext.ux.touch.grid.feature.Sorter"
    ],
    config: {
        cls: 'songGrid',
        tab: {
            title: 'Songs',
            iconCls: 'home',
            id: 'songCardTab'
        },
        items: [


            {
                store: "songs",
                xtype: "touchgridpanel",

                columns: [
                    {
                        header: 'Name',
                        dataIndex: 'name',
                        style: 'padding: 0 5px;',
                        width: '47%'
                    },
                    {
                        header: 'Performer',
                        dataIndex: 'performer',
                        style: 'padding: 0 5px;',
                        width: '45%'
                    },
                    {
                        header: 'Genre',
                        dataIndex: 'genre',
                        style: 'padding: 0 5px;',
                        width: '8%'
                    }
                ],
                features: [
                    {
                        ftype: 'Ext.ux.touch.grid.feature.Sorter',
                        launchFn: 'initialize'
                    }
                ],
                title: "Tango chords for guitar"

            }
        ]
    }



} );
