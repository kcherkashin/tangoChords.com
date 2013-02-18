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

        initialize: function () {
            this.config.tpl.parent = this;
        },
        transpose: function ( steps ) {
            this.fireEvent( "transposeSong", steps, this );
        },


        config: {
            scrollable: 'vertical',
            tpl: new Ext.XTemplate(
                '<pre class = "info song chords">',
                Ext.os.deviceType === "Phone" ? '<h1>{title}</h1>' : '',
                '{[this.wrapChords(values.text)]}',
                '<a href="http://{source}">{source}</a>',
                '</pre>',
                {
                    wrapChords: function ( text ) {
                        return chords.components.chordsManager.wrapChords( text, 50 );
                    }
                }
            )


        }
    }
);

