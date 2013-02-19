/**
 * Created with JetBrains PhpStorm.
 * Author: Kirill Cherkashin
 *
 */

"use strict";

Ext.define( 'chords.view.song.songCard', {
    extend: 'Ext.NavigationView',
    xtype: 'songcard',
    id: 'songCard',


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
            iconCls: 'home',
            id: 'songCardTab',
            title: 'Songs'
        },
        items: [

            {
                docked: 'top',
                xtype: 'searchfield',
                label: Ext.os.deviceType === "Phone" ? '' : 'Filter',
                name: 'query'
            },
            {
                store: "songs",
                xtype: "touchgridpanel",


                columns: [
                    {
                        header: 'Name',
                        dataIndex: 'name',
                        style: 'padding: 0 5px;',
                        width: '40%'
                    },
                    {
                        header: 'Performer',
                        dataIndex: 'performer',
                        style: 'padding: 0 5px;',
                        width: '40%'
                    },
                    {
                        header: 'Genre',
                        dataIndex: 'genre',
                        style: 'padding: 0 5px;',
                        width: '20%'
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
