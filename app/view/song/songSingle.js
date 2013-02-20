/**
 * Created with JetBrains PhpStorm.
 * Author: Kirill Cherkashin
 *
 */

// Sencha thows an error if strict mode is on.
//"use strict";


Ext.define( 'chords.view.song.songSingle', {
        extend: 'Ext.Container',
        xtype: 'songsingle',
        requires: ["chords.components.chordsManager"],

        transpose: function ( steps ) {
            this.fireEvent( "transposeSong", steps, this );
        },
        applyRecord: function ( record ) {

            return record;
        },


        config: {
            scrollable: 'vertical',
            tpl: new Ext.XTemplate(
                '<h1 class = "song-title">{title}</h1>',
                '<pre class = "cong-chords">',
                '{[this.wrapChords(values.text)]}',
                '<a href="http://{source}">{source}</a>',
                '</pre>',
                {
                    wrapChords: function ( text ) {
                        return chords.components.chordsManager.wrapChords( text, 140 );
                    }
                }
            )


        }
    }
);

