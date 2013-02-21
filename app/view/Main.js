/**
 * Created with JetBrains PhpStorm.
 * Author: Kirill Cherkashin
 *
 */
'use strict';


Ext.define( 'chords.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    id: 'chordsTabPanel',

    requires: [
        'chords.view.random.randomCard',
        'chords.view.song.songCard',
        'chords.view.about.aboutCard',
        'chords.view.filter.filterCard'
    ],

    config: {
        cardSwitchAnimation: false,
        tabBarPosition: 'bottom',
        layout: {
            animation: false
        },
        ui: 'chordsTabPanel',
        items: [
            { xtype: 'songcard' },
            { xtype: 'randomcard' },
            { xtype: 'aboutcard' }
        ]
    }

} );
