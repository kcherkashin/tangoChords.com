/**
 * Created with JetBrains PhpStorm.
 * Author: Kirill Cherkashin
 *
 */
//Call Parent
//"use strict";


Ext.define( 'chords.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    id: 'tabPanel',
    requires: [
        'chords.view.random.randomCard',
        'chords.view.song.songCard',
        'chords.view.about.aboutCard',
        'chords.view.filter.filterCard'
    ],

    config: {
        tabBarPosition: 'bottom',
        items: [
            { xtype: 'songcard' },
            { xtype: 'randomcard' },
            { xtype: 'filtercard' },
            { xtype: 'aboutcard' }
        ]
    }

} );
