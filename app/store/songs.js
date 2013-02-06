/**
 * Created with JetBrains PhpStorm.
 * Author: Kirill Cherkashin
 *
 */

"use strict";

Ext.define( 'chords.store.songs', {
    extend:        'Ext.data.Store',
    shuffledItems: null,
    shuffle:       function () {
        var i;
        var max = this.getCount();
        this.shuffledItems = [];
        for( i = 0; i < max; i++ ) {
            this.shuffledItems.push( i );
        }

        //Shuffles an array using fisher-yates method.
        for( i = this.shuffledItems.length - 1; i > 0; i-- ) {
            var j = Math.floor( Math.random() * (i + 1) );
            var temp = this.shuffledItems[i];
            this.shuffledItems[i] = this.shuffledItems[j];
            this.shuffledItems[j] = temp;
        }
    },
    /**
     *
     */
    getRandomItem: function () {
        if( this.shuffledItems === null ) {
            this.shuffle();
        }
        return this.getAt( this.shuffledItems.pop() );

    },

    refresh: function () {

    },


    config: {

        model:    'chords.model.song',
        proxy:    {
            type:   "ajax",
            url:    "../songs/songs.json",
            reader: {
                type:         "json",
                rootProperty: "users"
            }
        },
        autoLoad: true
    }

} );