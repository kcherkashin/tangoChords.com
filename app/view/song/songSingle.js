/**
 * Created with JetBrains PhpStorm.
 * Author: Kirill Cherkashin
 *
 */

// Sencha thows an error if strict mode is on.
//"use strict";

Ext.define( 'chords.view.song.songSingle', {
        extend: 'Ext.Container',
        xtype:  'songsingle',

        initialize: function () {
            this.callParent( arguments );

        },
        transpose:  function ( steps ) {
            this.fireEvent( "transposeSong", steps, this );
        },


        config: {
            scrollable: 'both',
            tpl:        [
                Ext.os.deviceType == "Phone" ? '<h1>{performer} - {name}</h1>' : "",
                '<pre class = "info song chords">{chords}</pre>',
                '<a href="{source}#">{source}</a>'
            ]
        }
    }
);

