
/**
 * Created with JetBrains PhpStorm.
 * Author: Kirill Cherkashin
 *
 */

"use strict";


Ext.define( 'chords.view.Main', {
    extend:   'Ext.tab.Panel',
    xtype:    'main',
    requires: [
        'chords.view.random.randomCard',
        'chords.view.song.songCard',
        'chords.view.about.aboutCard'
    ],
    config:   {
        tabBarPosition: 'bottom',

        items: [
            {
                xtype: 'songcard'
            },
            {
                xtype: 'randomcard'
            },
            {
                xtype: 'aboutcard'
            }
        ]
    }
} );
