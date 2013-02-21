/**
 * Created with JetBrains PhpStorm.
 * Author: Kirill Cherkashin
 *
 */

'use strict';

Ext.define( 'chords.view.song.songCard', {
    extend: 'Ext.NavigationView',
    xtype: 'songcard',
    id: 'songCard',

    requires: [
        'Ext.field.Search',
        'Ext.dataview.List',
        'Ext.ux.touch.grid.List',
        'Ext.ux.touch.grid.feature.Feature',
        'Ext.ux.touch.grid.feature.Sorter'
    ],
    config: {

        navigationBar: {
            items: [
                { iconCls: 'arrow-up', iconMask: true, align: 'right', id: 'transposeUp'},
                { iconCls: 'arrow-up', iconMask: true, align: 'right', id: 'transposeDown'}
            ]
        },
        layout: {
            animation: false
        },
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
                label: Ext.os.deviceType === 'Phone' ? '' : 'Filter',
                placeHolder: 'Search'
            },
            {
                store: 'songs',
                xtype: 'touchgridpanel',


                columns: [
                    {
                        header: 'Name',
                        dataIndex: 'name',
                        width: '40%'
                    },
                    {
                        header: 'Performer',
                        dataIndex: 'performer',
                        width: '50%'
                    },
                    {
                        header: '',
                        renderer: function ( genre, record ) {
                            return '<span class = "genre ' + record.genre.toLowerCase() + '">' + genre + '</span>';
                        },
                        dataIndex: 'genreShort',
                        cls: 'genreColumn',
                        width: '10%'
                    }
                ],
                features: [
                    {
                        ftype: 'Ext.ux.touch.grid.feature.Sorter',
                        launchFn: 'initialize'
                    }
                ]


            }
        ]
    }



} );
