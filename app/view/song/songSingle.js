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
        config: {

            cls: 'single-song',
            scrollable: 'vertical',
            tpl: new Ext.XTemplate(
                '<h1 class = "song-title">{title}</h1>',
                '<pre class = "cong-chords">',
                '{[this.wrapChords(values.text)]}',
                '<a href="http://{source}">{source}</a>',
                '</pre>',
                {
                    wrapChords: function ( text ) {
                        // We calculate amount of letters per line depending on the screen size
                        return chords.components.chordsManager.wrapChords( text, Math.ceil( window.innerWidth / 16 + 19 ) );
                    }
                }
            )


        }
    }
);

